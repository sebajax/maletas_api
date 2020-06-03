'use strict';

const AuthModulesModel = require('../models/authModulesModel');
const { PermissionsModel } = require('../models/permissionsModel');
const Message = require('../assets/messages');
const Validate = require('validate.js');

// Adding all related functions and procesdures
const AuthModulesController = {};

AuthModulesController.getAuthModules = async (req, res) => {
    try {
        let docs = await AuthModulesModel.findAuthModules();
        res.status(200).json(docs);
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;           
    }
};

AuthModulesController.getAuthModule = async (req, res) => {
    if(!req.params.module) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    }

    let module = {
        module: req.params.module
    };

    try {
        let docs = await AuthModulesModel.findAuthPermType(module);
        res.status(200).json(docs);
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;
    };    
};

AuthModulesController.saveAuthModule = async (req, res) => {
    if(!req.body) {     
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    }
    if(!req.params.module) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;        
    }
    if(!Validate.isArray(req.body)) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;            
    }

    // Check if selected perms exist
    for(let permId of req.body) {
        try {
            if(permId) {
                let doc = await PermissionsModel.findPermissionById(permId);
                if(doc === null) {
                    res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
                    return;                      
                }
            }else {
                res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
                return;                 
            }
        }catch(err) {
            res.status(500).json(Message.handleErrorMessage(err));
            return;             
        }   
    };

    let module = {
        module: req.params.module
    };

    try {
        let authModule = await AuthModulesModel.findAuthPermType(module);
        if(authModule) {
            let updateAuthPerm = {
                permId: req.body
            };
            await AuthModulesModel.updateAuthPerm(authModule._id, updateAuthPerm);
        }else {
            let newAuthPerm = {
                module: req.params.module,
                permId: req.body
            };
            await AuthModulesModel.saveAuthPerm(newAuthPerm);
        }
        let docs = await AuthModulesModel.findAuthModules();
        if(docs)
            res.status(200).json(docs);
        else
            res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;        
    }
}

module.exports = AuthModulesController;