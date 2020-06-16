'use strict';

const express = require('express');
const router = express.Router();

const gastosController = require('../controllers/gastosController');

/* GET Monto Total Simulado. */
router.get('/getGastosSaldo', gastosController.getGastosSaldo);

module.exports = router;