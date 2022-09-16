const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log(`uncaughtException!! Shutting Down...`);

  process.exit(1);
});

const app = require('./app');
console.log(process.env.NODE_ENV);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const port = process.env.PORT || 8989;
const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

//Handling UNHANDLED REJECTION for Asynchronous
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log(`UNHANDLED REJECTION!! Shutting Down...`);
  server.close(() => {
    process.exit(1);
  });
});
