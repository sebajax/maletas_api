'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const { Permissions } = require('./permissionsModel');

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
        permId: {
            type: Schema.Types.ObjectId,
            ref: 'Permissions',
            required: [true, 'Debe seleccionar tipo de permiso'],
        },
        appTheme: {
            type: Boolean,
            default: false
        }
    }
});

usuariosSchema.plugin(mongoosePaginate);
const Usuarios = mongoose.model('Usuario', usuariosSchema);
const UsuariosModel = {};

UsuariosModel.findUsuarioId = async id => {
    return await Usuarios.findById(id).populate({
        path: 'config.permId',
        model: Permissions
    }).exec();
}

UsuariosModel.findAllUsuarios = async (page, query) => {
    let options = {
        page,
        sort: { user: 1 },
        populate: "config.permId",
        limit: 30
    };
    return await Usuarios.paginate(query, options);
};

UsuariosModel.findUsuario = async user => {
    return Usuarios.findOne({user}).populate({
            path: 'config.permId',
            model: Permissions
    }).exec();
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