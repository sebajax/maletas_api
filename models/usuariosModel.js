'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    user: String,
    password: String,
    name : String,
    config: {
        permission: String,
        appTheme: Boolean
    },
    lastLogin: Date    
});

const Usuarios = mongoose.model('Usuario', usuariosSchema);

const findAll = result => {
    Usuarios.find({}, (err, docs) => {
        result(err, docs[0]);
    });
}

module.exports = {
    findAll
};