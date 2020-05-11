'use strict';

const mongoose = require('mongoose');
const config = require('../config/mongodb.config');

const connect = async () => {
    return await mongoose.connect(config.HOST, config.OPTIONS);
};

module.exports = connect;