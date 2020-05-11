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
const UsuariosModel = {}

UsuariosModel.findAllUsuarios = async () => {
    return await Usuarios.find({}).exec();
};

UsuariosModel.saveUsuario = async usuario => {
    try {
        let newUsuario = new Usuarios(usuario);
        await newUsuario.validate();
        return await newUsuario.save();
    }catch(err) {
        return err;
    }
}

module.exports = UsuariosModel;