'use strict';

const gastosModel = require('../models/gastosModel');
const Message = require('../assets/messages');

// Adding all related functions and procesdures
const GastosController = {};

GastosController.getGastosSaldo = async (req, res) => {
    try {
        const result = await gastosModel.getGastosSaldo();
        let saldo = (result) ? result : 0;
        res.status(200).json({
            saldoGastos: saldo
        });
        return;
    }catch(err) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400, err.errors));
        return;        
    }
};

module.exports = GastosController;