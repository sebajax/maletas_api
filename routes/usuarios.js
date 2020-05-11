'use strict';

const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

/* GET all Usuarios. */
router.get('/getAllUsuarios', usuariosController.getAllUsuarios);

/* POST save Usuario. */
router.post('/saveUsuario', usuariosController.saveUsuario);

module.exports = router;