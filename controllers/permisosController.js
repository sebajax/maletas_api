'use strict';

const { PermissionsModel } = require('../models/permissionsModel');
const Message = require('../assets/messages');
const validate = require('validate.js');

// Adding all related functions and procesdures
const PermisosController = {};

PermisosController.getPermisos = async (req, res) => {
    let query = {};
    //Solo puede recibir (permId)
    if(validate.isDefined(req.query.q)) {
        try {
            let auxQuery = JSON.parse(req.query.q);
            if(validate.isDefined(auxQuery.permId)) 
                Object.assign(query, { '_id' : auxQuery.permId });
        }catch(err) {
            res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
            return;           
        }
    }

    try {
        let docs = await PermissionsModel.findAllPermissions(query);
        res.status(200).json(docs);
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;           
    }
};

PermisosController.getPermisoById = async (req, res) => {
    if(!req.params.id) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    };

    try {
        let docs = await PermissionsModel.findPermissionById(req.params.id);
        if(docs !== null)
            res.status(200).json(docs);
        else 
            res.status(404).json(Message.handleErrorMessage(Message.type.ERROR_404));
            return;
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;
    };   
};

PermisosController.updatePermiso = async (req, res) => {
    if(!req.params.id) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    };    

    try {
        let permiso = await PermissionsModel.findPermissionById(req.params.id);
        if(permiso) {
            if(permiso.permType !== "admin") {
                let updatedPermiso = await PermissionsModel.updatePermiso(req.params.id, req.body);
                if(updatedPermiso)
                    res.status(200).json({message: `Permiso tipo (${permiso.permType}) modificado con exito`});
                else
                    res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
                    return;    
            }else {
                res.status(400).json({message: `${permiso.permType} esta prohibido modificar`});
                return;
            }           
        }else {
            res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
            return;            
        };
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;         
    };    
};

PermisosController.removePermiso = async (req, res) => {
    if(!req.params.id) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    };

    try {
        let permiso = await PermissionsModel.findPermissionById(req.params.id);
        if(permiso) {
            if(permiso.permType !== "admin") {
                let removedPermiso = await PermissionsModel.removePermiso(req.params.id);
                if(removedPermiso)
                    res.status(200).json({message: `${permiso.permType} eliminado con exito`});
                else
                    res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
                    return;    
            }else {
                res.status(400).json({message: `${permiso.permType} esta prohibido eliminar`});
                return;
            }             
        }else {
            res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
            return;            
        };
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;         
    };
};

PermisosController.savePermiso = async (req, res) => {
    if(!req.body.permType) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    };

    try{
        let docs = await PermissionsModel.findPermiso(req.body);
        if(docs === null) {
            let permiso = await PermissionsModel.savePermiso(req.body)
            res.status(200).json(permiso);
        }else {
            res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400_KEY));
            return;
        };
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;  
    };
};

module.exports = PermisosController;