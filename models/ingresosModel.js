'use strict';

const { Sequelize, sequelize } = require('../db/mysqldb');

const TABLE = 'transacciones_bdo_cerradas';

const IngresosModel = {};

const Model = Sequelize.Model;
class Ingresos extends Model {} 
Ingresos.init({
    id_transaccion: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    numero_bdo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar numero de bdo"
            }
        }
    },
    id_aerolinea: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar aerolinea"
            },
            isNumeric: {
                msg: "Debe ingresar aerolinea"
            }
        }
    },
    nombre_pasajero: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar nombre de pasajero"
            }
        }
    },
    fecha_llegada: {
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
    domicilio_direccion: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar un domicilio valido"
            }
        }
    }, 
    grupo_sector: {
        type: Sequelize.TINYINT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Seleccione grupo sector valido"
            },
            isNumeric: {
                msg: "Seleccione grupo sector valido"
            }
        }
    }, 
    lugar: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Seleccione lugar valido"
            }
        }
    }, 
    valor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar un valor"
            },
            isNumeric: {
                msg: "Valor debe ser numerico"
            }
        }
    },
    fecha_transaccion: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Seleccione fecha de transaccion valida"
            },
            isDate: {
                msg: "Seleccione fecha de transaccion valida"
            }
        }
    },

}, {sequelize, tableName: TABLE, freezeTableName: true, timestamps: false,});

IngresosModel.getIngresosSaldo = async () => {
    try {
        return await Ingresos.sum('valor');
    }catch(err) {
        console.log(err);
    }
};

module.exports = IngresosModel;