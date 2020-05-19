'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoCheck = require('./middlewares/checkMongoConn');
const authJwt = require('./middlewares/authJwt');
const passport = require('passport');
require('dotenv').config();

//Require App routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const usuariosRouter = require('./routes/usuarios');
const permisosRouter = require('./routes/permisos');
const ingresosSimuladoRouter = require('./routes/ingresosSimulado');

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

//Check if mongo connection is up and running
app.use(mongoCheck);

/*
* START DEFINING API ROUTES
*/
//Route to check the status of the API
app.use('/', indexRouter);

//If logged will return a jwt token to use in the rest of the API
app.use('/login', loginRouter);

//Middleware to Check if the token is set to use the app
app.use(authJwt);
//Defining App routes GLOBAL that require JWT auth
app.use('/usuarios', usuariosRouter);
app.use('/permisos', permisosRouter);
app.use('/ingresosSimulado', ingresosSimuladoRouter);
/*
* END DEFINING API ROUTES
*/

//App running on port 5000
app.listen(process.env.PORT, () => {
    console.log("Maletas API running on port 5000");
});

module.exports = app;