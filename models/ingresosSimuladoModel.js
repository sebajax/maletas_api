'use strict';

const { Sequelize, sequelize } = require('../db/mysqldb');

const TABLE = 'ingresos_simulado';

const IngresosSimuladoModel = {};

const Model = Sequelize.Model;
class IngresosSimulado extends Model {} 
IngresosSimulado.init({
    id_ingreso_simulado: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    fecha: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar una fecha"
            },
            isDate: {
                msg: "Seleccione una fecha valida"
            }
        }
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar una categoria"
            }
        }
    },
    monto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar un monto"
            },
            isNumeric: {
                msg: "Monto debe ser numerico"
            }
        }
    }
}, {sequelize, tableName: TABLE, freezeTableName: true, timestamps: false,});

IngresosSimuladoModel.getMontoTotalSimulado = async () => {
    try {
        return await IngresosSimulado.sum('monto');
    }catch(err) {
        console.log(err);
    }
};

IngresosSimuladoModel.saveIngresoSimulado = async newIngresoSimulado => {
    try {
        return await IngresosSimulado.create(newIngresoSimulado);
    }catch(err) {
        console.log(err);
    }
}


module.exports = IngresosSimuladoModel;