'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.status(200).json({
        status: "API status ok"
    });
});

module.exports = router;