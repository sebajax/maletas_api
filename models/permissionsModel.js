'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthModulesModel = require('./authModulesModel');
const Usuarios = require('./usuariosModel');

const permissionSchema = new Schema({
    permType: {
        type: String,
        required: [true, 'Debe ingresar tipo de permiso'],
        unique: true
    }
});

const Permissions = mongoose.model('Permissions', permissionSchema);
const PermissionsModel = {};

PermissionsModel.findAllPermissions = async query => {
    return await Permissions.find(query).exec();
};

PermissionsModel.findPermiso = async permType => {
    return await Permissions.findOne(permType).exec();
};

PermissionsModel.findPermissionById = async id => {
    return await Permissions.findById(id).exec();
};

PermissionsModel.updatePermiso = async (id, permiso) => {
    return await Permissions.findByIdAndUpdate(id, permiso).exec();
};

PermissionsModel.savePermiso = async permiso => {
    let newPermiso = new Permissions(permiso);
    return await newPermiso.save();
};

PermissionsModel.removePermiso = async id => {
    try {
        await Usuarios.removeUserPermId(id);
        await AuthModulesModel.removePermId(id);
        return await Permissions.findByIdAndRemove(id).exec();
    }catch(err) {
        return;
    }
}

module.exports = {
    PermissionsModel,
    Permissions
}