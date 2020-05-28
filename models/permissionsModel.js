'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    _id: Schema.Types.ObjectId,
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

PermissionsModel.findPermission = async permType => {
    return await Permissions.findOne(permType).exec();
};

PermissionsModel.findPermissionById = async id => {
    return await Permissions.findById(id).exec();
};

PermissionsModel.updatePermiso = async (id, permiso) => {
    return await Permissions.findByIdAndUpdate(id, permiso).exec();
};

PermissionsModel.savePermission = async permission => {
    let newPermission = new Permissions(permission);
    return await newPermission.save();
};

module.exports = {
    PermissionsModel,
    Permissions
}