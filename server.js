const { urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const port = process.env.PORT || 8000;
const db = require('./config/mongoose');
const flash = require('connect-flash');
const cMare = require('./config/middleware');

const app = express();

//-------------------------middlewares
app.use(urlencoded());
app.use(cookieParser());

//-------------------------sessions
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
//-------------------------sessions


//-------------------------mongoStore
const MongoStore = require('connect-mongo')(session);
//-------------------------mongoStore


//-------------------------views
//use assests
app.use(express.static('assests'));
app.use('/uploads', express.static(__dirname + '/uploads'))

//setting views
app.set('view engine','ejs');
app.set('views','./views');
//-------------------------views

//-------------------------express-ejs-layouts
//Using express-layouts and setting styles and scripts
app.use(expressEjsLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
//-------------------------express-ejs-layouts


//-------------------------sessions
app.use(session({
    name: 'todoAt',
    secret: 'idontknowrightnowbutchangethisone',
    saveUninitialized : false,
    resave : false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled',
    },(err) => {
        err?console.log("Error:",err):console.log("Connected to MongoStore");
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);
//-------------------------sessions

//-------------------------flash
app.use(flash());
//-------------------------flash
//-------------------------custome Middleware
app.use(cMare.setFlash);
//-------------------------custome Middleware











//----------------------------------------------------------------
//-------------------------routes
app.use('/', require('./routes/router'));
//-------------------------routes

//-------------------------listen
app.listen(port, (err) => {
    err ? console.log('Error',err) : console.log(`Server is up on port http://localhost:${port}/`);
});
//-------------------------listen