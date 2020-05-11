'use strict';

const Usuarios = require('../models/usuariosModel');

// Adding all related functions and procesdures
const UsuariosController = {};

UsuariosController.getAllUsuarios = async (req, res) => {
    try {
        let docs = await Usuarios.findAllUsuarios();
        res.status(200).json(docs);
    }catch(err) {
        res.status(500).json(`Hubo un error al procesar su solicitud ${err}`);
        return;   
    }
};

UsuariosController.saveUsuario = async (req, res) => {
    try{
        let usuario = await Usuarios.saveUsuario(req.body)
        res.status(200).json(usuario);
    }catch(err) {
        res.status(500).json(`Hubo un error al procesar su solicitud ${err}`);
        return;  
    }
}

module.exports = UsuariosController;