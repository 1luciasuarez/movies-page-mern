const express = require('express');
const UserController = require('../controllers/user');
const md_auth = require('../middlewares/authentacted');

const api = express.Router();

api.get('/user/me', [md_auth.mdAuth], UserController.getMe);

module.exports = api;
