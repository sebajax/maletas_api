'use strict';

const { PermissionsModel } = require('../models/permissionsModel');
const Message = require('../assets/messages');

// Adding all related functions and procesdures
const PermisosController = {};

PermisosController.getPermisos = async (req, res) => {
    try {
        let docs = await PermissionsModel.findAllPermissions();
        res.status(200).json(docs);
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;           
    }
};

module.exports = PermisosController;