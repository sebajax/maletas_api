'use strict';

const Usuarios = require('../models/usuariosModel');

// Adding all related functions and procesdures
const UsuariosController = {};

UsuariosController.getAllUsuarios = (req, res) => {
    Usuarios.findAll((err, docs) => {
        if(err) {
            res.status(500).send(`Hubo un error al procesar su solicitud ${err}`);
            return;
        }else
            res.status(200).send(docs);
    });
}

module.exports = UsuariosController;