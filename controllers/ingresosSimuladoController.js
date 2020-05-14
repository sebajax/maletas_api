'use strict';

const ingresosSimuladoModel = require('../models/ingresosSimuladoModel');
const Message = require('../assets/messages');

// Adding all related functions and procesdures
const IngresosSimuladoController = {};

IngresosSimuladoController.saveIngresoSimulado = async (req, res) => {
    try {
        const newIngresoSimulado = {
            fecha: req.body.data.fecha,
            categoria: req.body.data.categoria,
            monto: req.body.data.monto
        };
        const result = await ingresosSimuladoModel.saveIngresoSimulado(newIngresoSimulado)
        if(result)
            res.status(200).json(result);
        else
            res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400));
    }catch(err) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400, err.errors));
        return;
    };
};

IngresosSimuladoController.getMontoTotalSimulado = async (req, res) => {
    try {
        const result = await ingresosSimuladoModel.getMontoTotalSimulado();
        if(result) 
            res.status(200).json({
                monto: result
            });
        else   
            res.status(200).json({
                monto: 0
            })
    }catch(err) {
        res.status(400).json(Message.handleErrorMessage(Message.type.ERROR_400, err.errors));
        return;
    };
};

module.exports = IngresosSimuladoController;