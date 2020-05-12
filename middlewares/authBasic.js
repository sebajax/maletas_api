'use strict';

const passport = require('passport');
const bcrypt = require('bcrypt');
const Usuarios = require('../models/usuariosModel');
const Strategy = require('passport-http').BasicStrategy;

const checkUser = async (user, password) => {
    try {
        const usuario = await Usuarios.findUsuario(user);
        return await bcrypt.compare(password, usuario.password);
    }catch(err) {
        return err;
    };
};

const strategy = new Strategy(
    async (user, password, done) => {
        try {
            let match = await checkUser(user, password);
            if(!match) 
                return done(null, false);
            else if(match)
                return done(null, user);
        }catch(err) {
            return done(err);
        };
    }
);

passport.use(strategy);

module.exports = (req, res, next) => {
    passport.authenticate('basic', {
        session: false
    })(req, res, next);
};