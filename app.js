const express = require('express')
const sync_fetch = require('sync-fetch')
const browser = require('browser-detect');
const NodeCache = require('node-cache');
const fetch = require('sync-fetch')


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
	let ts = Date.now();
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
	console.log(`get_csv_db took ${Date.now() - ts} ms`);
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


// ############################ Routing Helpers ####################################
/* getImageAlbum
	- Gets all images in a imgur album by id

	- param: albumId - the id of the album
	- return: image_list - the list of images in the album
*/
function sync_get_images(albumId) {
	let image_list = [];
	const metadata = fetch(`https://api.imgur.com/3/album/${albumId}`, {
		headers: {
			'Authorization': `Client-ID ${clientId}`
		}
	}).text();

	const data = JSON.parse(metadata);
	for (const image of data.data.images) {
		image_list.push(image.link);
	};
	return image_list;
}

// ################################ Routing ########################################
// let folder_data = process_DB(fetch_folder_DB(__dirname + '/database/db.sqlite3'));
let folder_data = get_csv_db(db_url);

app.get('/home', function (req, res) {
	res.render(__dirname + 'pages/home.html')
})

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
let ts = Date.now();
for (const folder of Object.keys(folder_data)) {
	const imgPath = '/' + folder;
	let image_list = sync_get_images(folder_data[folder]['imgur_album_id'])
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
}
console.log(`Sync took ${Date.now() - ts} ms`);

// ################################# Export #################################
module.exports = app
