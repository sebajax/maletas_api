'use strict';

const express = require('express');
const router = express.Router();
const permisosController  = require('../controllers/permisosController');

/* GET all Permisos. */
router.get('/getPermisos', permisosController.getPermisos);

/* GET Permiso by Id. */
router.get('/getPermisoById/:id', permisosController.getPermisoById);

/* PUT update permiso by id. */
router.put('/updatePermiso/:id', permisosController.updatePermiso);

module.exports = router;