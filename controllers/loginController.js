'use strict';

const Message = require('../assets/messages');
const Usuarios = require('../models/usuariosModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const LoginController = {};

LoginController.login = async (req, res) => {
    try {
        const token = jwt.sign({id: req.user}, process.env.JWT_SECRET, {expiresIn: '10h'});
        const docs = await Usuarios.findUsuario(req.user);
        if(docs) {
            res.status(200).json({
                auth: true,
                token: token,
                userId: docs._id,
                user: docs.user,
                permId: docs.config.permId._id,
                permType: docs.config.permId.permType,
                appTheme: docs.config.appTheme,
                message: 'Usuario valido'
            });  
        }else {
            res.status(404).json(Message.handleErrorMessage(Message.type.ERROR_404));
            return;
        }
    }catch(err) {
        res.status(500).json(Message.handleErrorMessage(err));
        return;
    };
};

LoginController.checkToken = (req, res) => {
    res.status(200).json({auth: true});
};

module.exports = LoginController;