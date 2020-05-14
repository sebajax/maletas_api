'use strict';

const express = require('express');
const router = express.Router();

const ingresosSimuladoController = require('../controllers/ingresosSimuladoController');

/* GET Monto Total Simulado. */
router.get('/getMontoTotalSimulado', ingresosSimuladoController.getMontoTotalSimulado);

/* POST save Ingreso Simulado. */
router.post('/saveIngresoSimulado', ingresosSimuladoController.saveIngresoSimulado);

module.exports = router;