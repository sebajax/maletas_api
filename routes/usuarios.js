'use strict';

const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

/* GET all Usuarios. */
router.get('/getAllUsuarios', usuariosController.getAllUsuarios);

/* GET usuario by user. */
router.get('/getUsuario/:user', usuariosController.getUsuario);

/* POST save Usuario. */
router.post('/saveUsuario', usuariosController.saveUsuario);

/* DELETE usuario by user. */
router.delete('/removeUsuario/:id', usuariosController.removeUsuario);

/* PUT update usuario by user. */
router.put('/updateUsuario/:id', usuariosController.updateUsuario);

module.exports = router;