'use strict';

const passport = require('passport');
const Usuarios = require('../models/usuariosModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const checkUser = async user => {
    return await Usuarios.findUsuario(user);
};

const strategy = new JwtStrategy(opts,
    async (jwt_payload, done) => {
        try {
            const usuario = await checkUser(jwt_payload.id);
            if(!usuario)
                return done(null, false);
            else if(usuario)
                return done(null, usuario.user);
        }catch(err) {
            return done(err);
        };
    }
);

passport.use(strategy);

module.exports = (req, res, next) => {
    passport.authenticate('jwt', {
        session: false
    })(req, res, next);
};