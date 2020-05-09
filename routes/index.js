'use strict';

const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

/* GET home page. */
router.get('/', usuariosController.getAllUsuarios);

module.exports = router;