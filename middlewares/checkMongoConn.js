'use strict';

const mongoose = require('mongoose');
const mongoConnect = require('../db/mongodb');

const checkMongoConn = (req, res, next) => {
    let mongoState = (mongoose.connection.readyState) ? mongoose.connection.readyState : 0;
    console.log("probando conexion", mongoState);
    if(mongoState == 0 )
        //Connect to Mongo DB for user handleing
        mongoConnect(err => {
            if(err) {
                res.status(500).send(`${err} MongoDB connection error`);
                // stop further execution in this callback
                return;
            }
            else {
                console.log("Connected to Mongo DB");
            }
            next();
        });
    else 
        next();            
}

module.exports = checkMongoConn;