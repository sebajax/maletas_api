'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    user: {
        type: String, 
        required: [true, 'Debe ingresar usuario'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Debe ingresar clave'],
    },
    name : {
        type: String, 
        required: [true, 'Debe ingresar nombre'],
    },
    config: {
        permType: {
            type: Schema.Types.ObjectId,
            ref: 'Permissions',
            required: [true, 'Debe seleccionar tipo de permiso'],
        },
        appTheme: {
            type: Boolean,
            default: false
        }
    },
    lastLogin: {
        type: Date, 
        default: Date.now
    }
});

const Usuarios = mongoose.model('Usuario', usuariosSchema);
const UsuariosModel = {};

UsuariosModel.findUsuarioId = async id => {
    return await Usuarios.findById(id).exec();
}

UsuariosModel.findAllUsuarios = async () => {
    return await Usuarios.find({}).exec();
};

UsuariosModel.findUsuario = async user => {
    return await Usuarios.findOne({user}).exec();
};

UsuariosModel.updateUsuario = async (id, user) => {
    return await Usuarios.findByIdAndUpdate(id, user).exec();
}

UsuariosModel.removeUsuario = async id => {
    return await Usuarios.findByIdAndRemove(id).exec();
}

UsuariosModel.saveUsuario = async user => {
    let newUser = new Usuarios(user);
    return await newUser.save();
};

module.exports = UsuariosModel;