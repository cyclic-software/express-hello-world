const express = require('express');
const sync_fetch = require('sync-fetch');
const browser = require('browser-detect');
const NodeCache = require('node-cache');
const request = require('request');
const { Pool } = require('pg');
const session = require('express-session');
const path = require('path');


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

const pool = new Pool({
	user: process.env.USER,
	host: 'db.bit.io',
	database: process.env.DB, // public database 
	password: process.env.PASSWD, // key from bit.io database page connect menu
	port: 5432,
	ssl: true,
});

// ################################ App Setup #######################################
app.set('view engine', 'ejs');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
	// console.log("Getting album: " + albumId);
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
				console.error("GetImage: " + error);
			} else {
				try {
					const data = JSON.parse(body);
					for (const image of data.data.images) {
						image_list.push(image.link);
					}
					// image_list = image_list.split(',');
					resolve(image_list);
				} catch (e) {
					// console.error(e);
					console.error("ERROR ALBUM: " + e);
					throw new Error('Throw makes it go boom!')
				}
			}
		});

	});
}

// Gets the folder list from the csv
let folder_data = get_csv_db(db_url);
// ################################ Routing ########################################
// - Everything below this is for router
// - /login - login page
// - /auth - authenticates the user
// - /logout - logs the user out ***
// - / - home page
// - /folder - Displays all folders
// - /{folder_name} - Displays all image in the "folder"

// ################################ Auth Routing ########################################

/* Login Page
	- Renders the login page / login users in
	- Reset the error message session variable, after sending it to the template
	- https://codeshack.io/basic-login-system-nodejs-express-mysql/
*/
app.get('/login', function (request, response) {
	// Render login template
	let msg = request.session.err_msg;
	request.session.err_msg = null;
	response.render('pages/login.ejs', {
		err_msg: msg
	});

});

// auth
//	- Authenticates the user
//	- Sets the session variables username and logged_in
app.post('/auth', function (request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		query_string = "SELECT * FROM accounts WHERE username = '" + username + "' AND password = '" + password + "'";
		pool.query(
			query_string,
			function (error, results, fields) {
				// If there is an issue with the query, output the error
				if (error) throw error;
				// If the account exists
				if (results.rows.length > 0) {
					// Authenticate the user
					request.session.loggedin = true;
					request.session.username = username;
					// Redirect to home page
					response.redirect('/folders');
				} else {
					// response.send('Incorrect Username and/or Password!');
					request.session.err_msg = "Incorrect Username and/or Password!";
					response.redirect('/login');

				}
				response.end();
			});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

/* Add user Page
	- Renders the add user page

*/
app.get('/add_user', function (request, response) {
	// Render login template
	if (request.session.loggedin) {
		response.render('pages/add_user.ejs');
	} else {
		request.redirect('/login');
	}
});
//Add new user
app.post('/send_user', function (request, response) {
	if (request.session.loggedin) {
		// Capture the input fields
		let username = request.body.username;
		let password = request.body.password;
		let email = request.body.email;
		// Ensure the input fields exists and are not empty
		if (username && password) {
			// Execute SQL query that'll select the account from the database based on the specified username and password
			query_string = "SELECT MAX(id) FROM accounts";
			pool.query(query_string, (err, res) => {
				query_string = "INSERT INTO accounts  (id, username, password, email) VALUES ('" + res.rows[0].max + "', '" + username + "', '" + password + "', '" + email + "')";
				pool.query(
					query_string,
					function (error, results, fields) {
						// If there is an issue with the query, output the error
						if (error) throw error;
						// If the account exists
						console.log(results);
						response.end();
					});
			});
		} else {
			response.send('Please enter Username and Password!');
			response.end();
		}
	} else {
		request.redirect('/login');
	}
});

app.get('/logout', function (request, response) {
	request.session.loggedin = false;
	request.session.username = null;
	response.redirect('/login');
});

// ################################ Main Routing ########################################
/* Folder page
	- Waits for data from db to be loaded in, then renders the index.html
*/
app.get('/folders', function (req, res) {
	if (req.session.loggedin) {
		folder_data = get_csv_db(db_url);
		res.render('pages/folders.ejs', {
			folders: Object.keys(folder_data)
		});
	} else {
		res.redirect('/login');
	}
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
				if (req.session.loggedin) {
					var title = folder_data[folder]['display_name'];
					var description = folder_data[folder]['description'];
					const isMobile = browser(req.headers['user-agent']).mobile;
					res.render(isMobile ? "pages/template_grid_mobile.ejs" : "pages/template_grid.ejs", {
						image_links: image_list,
						title: title,
						description: description
					});
				} else {
					res.redirect('/login');
				}
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
