const mongoose = require('mongoose');
const app = require('./app.js');

require('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const ipServer = process.env.IP_SERVER;
const apiVersion = 'v1';
const port = process.env.PORT || 3977;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/`;
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log('======API uwu========');
      console.log(`http://${ipServer}:${port}/api/${apiVersion}/`);
    });
  } catch (err) {
    console.log('Error al conectar a la Base de datos', err);
  }
};
connectDB();
