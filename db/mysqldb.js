'use strict';

const Sequelize = require('sequelize');
require('dotenv').config();

// Create a connection to the database

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql'
    }
);

async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(err) {
        console.error('Unable to connect to the database:', err);
    }
} 

module.exports = {
    Sequelize,
    sequelize
}