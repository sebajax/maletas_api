'use strict';

const express = require('express');
const router = express.Router();
const permisosController  = require('../controllers/permisosController');

/* GET all Permisos. */
router.get('/getPermisos', permisosController.getPermisos);

module.exports = router;