'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoCheck = require('./middlewares/checkMongoConn');
const auth = require('./middlewares/auth');
const passport = require('passport');

//Require App routes
const indexRouter = require('./routes/index');
const usuariosRouter = require('./routes/usuarios');

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
//Check if it has the correct credentials
app.use(auth);

//Defining App routes
app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);

//App running on port 5000
app.set('port', process.env.PORT || 5000);

app.listen(5000, () => {
    console.log("Maletas API running on port 5000");
});

module.exports = app;