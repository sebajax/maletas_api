'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authBasic');
const authJwt = require('../middlewares/authJwt');
const loginController = require('../controllers/loginController');

router.get('/', auth, loginController.login);

router.get('/checkToken', authJwt, loginController.checkToken);

module.exports = router;