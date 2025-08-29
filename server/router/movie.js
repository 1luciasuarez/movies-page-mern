const express = require('express');
const api = express.Router();
const MovieController = require('../controllers/movie');

const multiparty = require('connect-multiparty');
const md_upload = multiparty({ uploadDir: './uploads/movie' });

api.post('/movie', [md_upload], MovieController.createMovie);
api.get('/movies', MovieController.getMovies);
api.put('/movie/:id', [md_upload], MovieController.updateMovie);
api.delete('/movie/:id', MovieController.deleteMovie);
api.get('/movie/:id', MovieController.getMovie);
module.exports = api;
