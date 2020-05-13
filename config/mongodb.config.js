'use strict';

require('dotenv').config();

module.exports = {
    HOST: process.env.MONGO_HOST,
    OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
};