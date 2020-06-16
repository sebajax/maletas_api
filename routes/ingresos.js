'use strict';

const express = require('express');
const router = express.Router();

const ingresosController = require('../controllers/ingresosController');

/* GET Monto Total Simulado. */
router.get('/getIngresosSaldo', ingresosController.getIngresosSaldo);

module.exports = router;