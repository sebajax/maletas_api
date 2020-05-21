'use strict';

const Usuarios = require('../models/usuariosModel');
const Message = require('../assets/messages');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Adding all related functions and procesdures
const UsuariosController = {};
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

UsuariosController.getAllUsuarios = async (req, res) => {
    try {
        let docs = await Usuarios.findAllUsuarios(req.params.page, JSON.parse(req.query.q));
        res.status(200).json(docs);
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;   
    };
};

UsuariosController.getUsuario = async (req, res) => {
    if(!req.params.user) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    };

    try {
        let docs = await Usuarios.findUsuario(req.params.user);
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

UsuariosController.getUsuarioId = async (req, res) => {
    if(!req.params.id) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    };

    try {
        let docs = await Usuarios.findUsuarioId(req.params.id);
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

UsuariosController.updateUsuario = async (req, res) => {
    if(!req.params.id) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    };

    try {
        let usuario = await Usuarios.findUsuarioId(req.params.id);
        if(usuario) {
            let updatedUsuario = await Usuarios.updateUsuario(req.params.id, req.body.data);
            if(updatedUsuario)
                res.status(200).json({message: `${usuario.user} modificado con exito`});
            else
                res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
                return;                 
        }else {
            res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
            return;            
        };
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;         
    };
};

UsuariosController.updateTheme = async (req, res) => {
    if(!req.params.id) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    };

    try {
        let usuario = await Usuarios.findUsuarioId(req.params.id);
        if(usuario) {
            usuario.config.appTheme = req.body.data.appTheme;
            let updatedUsuario = await Usuarios.updateUsuario(req.params.id, usuario);
            if(updatedUsuario)
                res.status(200).json({message: `${usuario.user} modificado con exito`});
            else
                res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
                return;                 
        }else {
            res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
            return;            
        };
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;         
    };
};

UsuariosController.removeUsuario = async (req, res) => {
    if(!req.params.id) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    };

    try {
        let usuario = await Usuarios.findUsuarioId(req.params.id);
        if(usuario) {
            let removedUsuario = await Usuarios.removeUsuario(req.params.id);
            if(removedUsuario)
                res.status(200).json({message: `${usuario.user} eliminado con exito`});
            else
                res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
                return;                 
        }else {
            res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
            return;            
        };
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;         
    };
};

UsuariosController.saveUsuario = async (req, res) => {
    if(!req.body.user || !req.body.password) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
        return;
    };

    try{
        req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        
        let docs = await Usuarios.findUsuario(req.body.user);
        if(docs === null) {
            let usuario = await Usuarios.saveUsuario(req.body)
            res.status(200).json(usuario);
        }else {
            res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400_KEY));
            return;
        };
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;  
    };
};

module.exports = UsuariosController;