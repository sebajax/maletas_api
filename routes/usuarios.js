'use strict';

const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

/* GET all Usuarios. */
router.get('/getAllUsuarios/:page', usuariosController.getAllUsuarios);

/* GET usuario by user. */
router.get('/getUsuario/:user', usuariosController.getUsuario);

/* GET usuario by _id user. */
router.get('/getUsuarioId/:id', usuariosController.getUsuarioId);

/* POST save Usuario. */
router.post('/saveUsuario', usuariosController.saveUsuario);

/* DELETE usuario by user. */
router.delete('/removeUsuario/:id', usuariosController.removeUsuario);

/* PUT update usuario by user. */
router.put('/updateUsuario/:id', usuariosController.updateUsuario);

/* PUT update theme by user. */
router.put('/updateTheme/:id', usuariosController.updateTheme);

module.exports = router;