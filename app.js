const express = require('express')
const sync_fetch = require('sync-fetch')
const browser = require('browser-detect');
const NodeCache = require('node-cache');
const request = require('request');


const app = express()
const cache = new NodeCache({ stdTTL: 120 });
const clientId = process.env.CLIENT_ID;
const db_url = process.env.DB_URL;


// ################################ DateBase #######################################
/* fetch_folder_DB
	Fetches the folder DB and returns the rows

	- path: path to the DB
	- returns: rows from the DB
*/
function get_csv_db(url) {
	const metadata = sync_fetch(url).text()
	const split_metadata = metadata.split('\n')

	let data = {};
	for (let i in split_metadata) {
		row = split_metadata[i].replace(/['"]+/g, '').split(',')
		if (row[0] == 'folder_name') {
			continue;
		}
		data[row[0]] = {
			display_name: row[1],
			description: row[2],
			imgur_album_id: row[3]
		};
	}
	return data;
}

// ################################ App Setup #######################################
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

// ############################ Get Images ####################################
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
// let folder_data = process_DB(fetch_folder_DB(__dirname + '/database/db.sqlite3'));
let folder_data = get_csv_db(db_url);

/* Index page
	- Waits for data from db to be loaded in, then renders the index.html
*/
app.get('/folders', function (req, res) {
	folder_data = get_csv_db(db_url);
	res.render('pages/folders.ejs', {
		folders: Object.keys(folder_data)
	});
});

/* Folder page
	- Waits for data from db to be loaded in, then gets the image list from imgur
*/
for (const folder of Object.keys(folder_data)) {
	if (folder == 'dick-den-2d') {
		continue;
	}
	const imgPath = '/' + folder;
	getImageAlbum(folder_data[folder]['imgur_album_id'])
		.then((image_list) => {
			app.get(imgPath, function (req, res) {
				var title = folder_data[folder]['display_name'];
				var description = folder_data[folder]['description'];
				const isMobile = browser(req.headers['user-agent']).mobile;
				res.render(isMobile ? "pages/template_grid_mobile.ejs" : "pages/template_grid.ejs", {
					image_links: image_list,
					title: title,
					description: description
				});
			})
		});
}

/* Image Page
*/
app.get('/image', function (req, res) {
	res.render('pages/template_image.ejs', {
		disp_link: req.query.img
	});
})


// ################################# Export #################################
module.exports = app
