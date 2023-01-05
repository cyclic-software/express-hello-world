const { Pool } = require('pg');


// Create a connection pool using the connection information provided on bit.io.
const pool = new Pool({
    user: process.env.USER,
    host: 'db.bit.io',
    database: process.env.DB, // public database 
    password: process.env.PASSWD, // key from bit.io database page connect menu
    port: 5432,
    ssl: true,
});

console.log("Connected to database");
query_string = "SELECT MAX(id) FROM accounts";
pool.query(query_string, (err, res) => {
    // console.log(err)
    console.log(res.rows[0].max); // you could also just console.log, but console.table is neat :)
});

// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'static')));

// app.get('/', function (request, response) {
//     // Render login template
//     response.sendFile(path.join(__dirname + '/login.html'));
// });

// // http://localhost:3000/auth
// app.post('/auth', function (request, response) {
//     // Capture the input fields
//     let username = request.body.username;
//     let password = request.body.password;
//     // Ensure the input fields exists and are not empty
//     if (username && password) {
//         // Execute SQL query that'll select the account from the database based on the specified username and password
//         query_string = "SELECT * FROM accounts WHERE username = '" + username + "' AND password = '" + password + "'";
//         pool.query(
//             query_string,
//             function (error, results, fields) {
//                 // If there is an issue with the query, output the error
//                 if (error) throw error;
//                 // If the account exists
//                 if (results.rows.length > 0) {
//                     // Authenticate the user
//                     request.session.loggedin = true;
//                     request.session.username = username;
//                     // Redirect to home page
//                     response.redirect('/home');
//                 } else {
//                     response.send('Incorrect Username and/or Password!');
//                 }
//                 response.end();
//             });
//     } else {
//         response.send('Please enter Username and Password!');
//         response.end();
//     }
// });

// // http://localhost:3000/home
// app.get('/home', function (request, response) {
//     // If the user is loggedin
//     if (request.session.loggedin) {
//         // Output username
//         response.send('Welcome back, ' + request.session.username + '!');
//     } else {
//         // Not logged in
//         // response.send('Please login to view this page!');
//         response.redirect('/');
//     }
//     response.end();
// });

// app.listen(3000);