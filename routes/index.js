'use strict';

const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

/* GET home page. */
router.get('/', (req, res) => {
    res.send("Hola Mundo");
});

module.exports = router;