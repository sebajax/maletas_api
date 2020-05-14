'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authBasic');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', auth, (req, res) => {
    const token = jwt.sign({id: req.user}, process.env.JWT_SECRET, {expiresIn: '10h'});
    res.status(200).send({
        auth: true,
        token,
        message: 'Usuario valido'
    });
});

module.exports = router;
