'use strict';

const { Sequelize, sequelize } = require('../db/mysqldb');

const TABLE = 'gastos';

const GastosModel = {};

const Model = Sequelize.Model;
class Gastos extends Model {} 
Gastos.init({
    id_gasto: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    id_tipo_gasto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar un tipo de gasto"
            },
            isNumeric: {
                msg: "Debe ingresar un tipo de gasto"
            }
        }
    },
    fecha: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar una categoria"
            },
            isDate: {
                msg: "Seleccione una fecha valida"
            }
        }
    },
    comentario: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar un monto"
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
    },
    usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Usuario no puede ser vacio"
            }
        }
    }, 

}, {sequelize, tableName: TABLE, freezeTableName: true, timestamps: false,});

GastosModel.getGastosSaldo = async () => {
    try {
        return await Gastos.sum('monto');
    }catch(err) {
        console.log(err);
    }
};

module.exports = GastosModel;