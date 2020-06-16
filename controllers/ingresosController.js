'use strict';

const ingresosModel = require('../models/ingresosModel');
const Message = require('../assets/messages');

// Adding all related functions and procesdures
const IngresosController = {};

IngresosController.getIngresosSaldo = async (req, res) => {
    try {
        const result = await ingresosModel.getIngresosSaldo();
        let saldo = (result) ? result : 0;
        res.status(200).json({
            "saldoIngresos": saldo
        });
    }catch(err) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400, err.errors));
        return;
    }
};

module.exports = IngresosController;