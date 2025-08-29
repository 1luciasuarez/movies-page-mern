const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
//Configurar CORS
app.use(cors());

//Importar rutas
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const movieRoutes = require('./router/movie');

//Configurar Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configurar Static Folder
app.use(express.static('uploads'));

//Configurar rutas
app.use(`/api/v1`, authRoutes);
app.use(`/api/v1`, userRoutes);
app.use(`/api/v1`, movieRoutes);
module.exports = app;
