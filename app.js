const express = require('express');
const multer = require('multer');
const { join } = require('path');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const globalErrorHandller = require('./controller/errorController');
const AppError = require('./utils/AppError');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');

const app = express();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.use(cors());

//MIDDLEWARE
app.use(morgan('dev'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'img');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

// PARSER
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

app.get('/', (req, res, next) => {
  res.sendFile(join(__dirname, 'build', 'index.html'));
});
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/category', categoryRoute);

app.use('*', (req, res, next) => {
  res.render('error', { title: 404, message: 'Page Not Found!!' });
});
app.use(globalErrorHandller);

module.exports = app;
