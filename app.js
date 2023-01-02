const express = require('express')
const path = require("path");
const sqlite = require("better-sqlite3");
const request = require('request');
const browser = require('browser-detect');
const NodeCache = require('node-cache');


const app = express()
const cache = new NodeCache({ stdTTL: 120 });
const clientId = process.env.CLIENT_ID;


// ################################ DateBase #######################################
/* fetch_folder_DB
	Fetches the folder DB and returns the rows

	- path: path to the DB
	- returns: rows from the DB
*/
function fetch_folder_DB(path) {
	var db = new sqlite(path);
	var rows = db.prepare('SELECT * FROM folders').all();
	// console.log(rows[0]);
	db.close();
	return rows;

}

/* process_DB
	Processes the rows from the DB and returns a JSON object

	- rows: rows from the DB
	- returns: JSON object
*/
function process_DB(rows) {
	let data = {};
	rows.forEach((row) => {
		data[row.folder_name] = {
			display_name: row.display_name,
			description: row.description,
			imgur_album_id: row.imgur_album_id
		};
	});
	return data;
}
// ################################ App Setup #######################################

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('views', __dirname);
app.set('view engine', 'ejs');

// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
	index: ['index.html'],
	maxAge: '1m',
	redirect: false,
	folder: '/public'
}
app.use(express.static('public', options))

// This setup caches for the browser
app.use((req, res, next) => { // Cache the responses
	const cachedBody = cache.get(req.url);
	if (cachedBody) {
		res.send(cachedBody);
		return;
	} else {
		res.sendResponse = res.send;
		res.send = body => {
			cache.set(req.url, body);
			res.sendResponse(body);
		}
		next();
	}
});


// ############################ Routing Helpers ####################################
/* getImageAlbum
	- Gets all images in a imgur album by id

	- param: albumId - the id of the album
	- return: image_list - the list of images in the album
*/
function getImageAlbum(albumId) {
	const options = {
		url: `https://api.imgur.com/3/album/${albumId}`,
		headers: {
			'Authorization': `Client-ID ${clientId}`
		}
	};
	let image_list = [];
	return new Promise((resolve, reject) => {
		request(options, (error, response, body) => {
			if (error) {
				console.error(error);
			} else {
				try {
					const data = JSON.parse(body);
					for (const image of data.data.images) {
						image_list.push(image.link);
					}
					resolve(image_list);
				} catch (e) {
					// console.error(e);
					console.error("Data: " + body);
				}
			}
		});

	});
}
// ################################ Routing ########################################
let folder_data = process_DB(fetch_folder_DB(__dirname + '/database/db.sqlite3'));

app.get('/home', function (req, res) {
	res.render(__dirname + 'pages/home.html')
})

/* Index page
	- Waits for data from db to be loaded in, then renders the index.html
*/
app.get('/folders', function (req, res) {
	res.render('pages/folders.ejs', {
		folders: Object.keys(folder_data)
	});
});

/* Folder page
	- Waits for data from db to be loaded in, then gets the image list from imgur
*/
for (const folder of Object.keys(folder_data)) {
	const imgPath = '/' + folder;
	getImageAlbum(folder_data[folder]['imgur_album_id'])
		.then((image_list) => {
			app.get(imgPath, function (req, res) {
				var title = folder_data[folder]['display_name'];
				var description = folder_data[folder]['description'];
				// res.render(__dirname + '/public/html/template_grid.ejs', {
				// 	image_links: image_list,
				// 	title: title,
				// 	description: description
				// });
				const isMobile = browser(req.headers['user-agent']).mobile;
				res.render(isMobile ? "pages/template_grid_mobile.ejs" : "pages/template_grid.ejs", {
					image_links: image_list,
					title: title,
					description: description
				});
			})

		});
}

// ################################# Export #################################
module.exports = app
