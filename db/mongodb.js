'use strict';

const mongoose = require('mongoose');
const config = require('../config/mongodb.config');

const connect = result => {
    mongoose.connect(config.HOST, config.OPTIONS)
    .then(() => result(null))
    .catch(err => result(err.message))
};

module.exports = connect;