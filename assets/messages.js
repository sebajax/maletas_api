'use strict';

const type = {
    ERROR_500: "ERROR: Hubo un error al procesar su solicitud",
    ERROR_400: "Informacion a procesar es incorrecta, verifique",
    ERROR_400_KEY: "El dato que desea ingresar ya se encuentra en la BD",
    ERROR_404: "No se encontraron datos"
}

const handleErrorMessage = (message=this.ERROR_500, error="") => {
    return {
        message: `${message} ${error}`
    };
};

module.exports = {
    type, 
    handleErrorMessage
}