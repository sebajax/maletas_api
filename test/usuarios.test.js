const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const config = require('../config/mongodb.config');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/usuariosModel');
require('dotenv').config();

chai.use(chaiHttp);
chai.should();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

// token to call the api
const token = jwt.sign({id: process.env.TEST_USER}, process.env.JWT_SECRET, {expiresIn: '10h'});

// memory mongo server
let mongoServer;

// Mocks
let usuarioReqMock = require('../mocks/usuarios/request/saveUsuario.json');
let usuario = null;

describe('UsuariosController API', () => {

    before(async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, config.OPTIONS);
        usuarioReqMock.password = await bcrypt.hash(process.env.TEST_PASS, SALT_ROUNDS);
        usuario = await Usuarios.saveUsuario(usuarioReqMock);
        console.log(usuario);
    });
      
    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    /*
    before(done => {
        // runs once before the first test in this block - sets the token
        chai
        .request(app)
        .get('/login')
        .auth(process.env.TEST_USER, process.env.TEST_PASS)
        .end((err, res) => {
            console.log(res.body);
            token = res.body.token;
            res.should.have.status(200);
            done();
        })
    });
    */

    // TEST #getAllUsuarios()
    describe('GET /getAllUsuarios/:page #getAllUsuarios()', () => {
        it('It should return an object with all the users for a selected page and status 200', done => {
            chai
                .request(app)
                .get('/usuarios/getAllUsuarios/1')
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    (err === null).should.be.true;
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('docs');
                    done();
                })
        });
    });

    // TEST #getUsuario()
    describe('GET /getUsuario #getUsuario()', () => {

        describe('GET /getUsuario/:user #getUsuario()', () => {
            it('It should return an object with the selected user and status 200', done => {
                chai
                    .request(app)
                    .get('/usuarios/getUsuario/'+usuario.user)
                    .set({ Authorization: `Bearer ${token}` })
                    .end((err, res) => {
                        (err === null).should.be.true;
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('user', usuario.user);
                        done();
                    })
            });
        });

        describe('GET /getUsuario #getUsuario() without user', () => {
            it('It should return a empty object and status 404', done => {
                chai
                    .request(app)
                    .get('/usuarios/getUsuario/')
                    .set({ Authorization: `Bearer ${token}` })
                    .end((err, res) => {
                        (err === null).should.be.true;
                        res.should.have.status(404);
                        done();
                    })
            });
        });

        describe('GET /getUsuario/:user #getUsuario() without token', () => {
            it('It should return status 401 Unauthorized', done => {
                chai
                    .request(app)
                    .get('/usuarios/getUsuario/'+usuario.user)
                    .end((err, res) => {
                        (err === null).should.be.true;
                        res.text.should.have.string('Unauthorized');
                        res.should.have.status(401);
                        done();
                    })
            });
        });

    });

    // TEST #getUsuarioId()
    describe('GET /getUsuarioId #getUsuarioId()', () => {

        describe('GET /getUsuarioId/:_id #getUsuarioId()', () => {
            it('It should return an object with the selected userId and status 200', done => {
                chai
                    .request(app)
                    .get('/usuarios/getUsuarioId/'+usuario._id)
                    .set({ Authorization: `Bearer ${token}` })
                    .end((err, res) => {
                        (err === null).should.be.true;
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('user', usuario.user);
                        done();
                    })
            });
        });

        describe('GET /getUsuarioId #getUsuarioId() without id', () => {
            it('It should return a empty object and status 404', done => {
                chai
                    .request(app)
                    .get('/usuarios/getUsuarioId/')
                    .set({ Authorization: `Bearer ${token}` })
                    .end((err, res) => {
                        (err === null).should.be.true;
                        res.should.have.status(404);
                        done();
                    })
            });
        });   

    });

    // TEST #saveUsuario()
    describe('POST /saveUsuario #saveUsuario()', () => {

        describe('POST /saveUsuario #saveUsuario()', () => {
            it('It should save the object to mongoDB using the selected mock and return status 200', done => {
                const usuarioTestMock = require('../mocks/usuarios/request/saveUsuarioTest.json');
                chai
                    .request(app)
                    .post('/usuarios/saveUsuario/')
                    .set({ Authorization: `Bearer ${token}` })
                    .send(usuarioTestMock)
                    .end((err, res) => {
                        (err === null).should.be.true;
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('user', usuarioTestMock.user);
                        done();
                    })
            });
        }); 

        describe('POST /saveUsuario #saveUsuario()', () => {
            it('It should give an Error because not sending the user in mock data and return status 400', done => {
                let usuarioTestMock = require('../mocks/usuarios/request/saveUsuarioTest.json');
                usuarioTestMock.user = null;
                chai
                    .request(app)
                    .post('/usuarios/saveUsuario/')
                    .set({ Authorization: `Bearer ${token}` })
                    .send(usuarioTestMock)
                    .end((err, res) => {
                        (err === null).should.be.true;
                        res.should.have.status(400);
                        done();
                    })
            });
        }); 

    });

    // TEST #updateUsuario()
    describe('PUT /updateUsuario #updateUsuario()', () => {

        describe('PUT /updateUsuario #updateUsuario()', () => {
            it('It should update the object in mongoDB using the created id and return status 200', done => {
                usuario.user = 'Test Update';
                chai
                    .request(app)
                    .put('/usuarios/updateUsuario/'+usuario._id)
                    .set({ Authorization: `Bearer ${token}` })
                    .send(usuario)
                    .end((err, res) => {
                        console.log(res.body);
                        (err === null).should.be.true;
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    })
            });
        });      

    });

    // TEST #updateTheme()
    describe('POST /updateTheme #updateTheme()', () => {

        describe('PUT /updateTheme #updateTheme()', () => {
            it('It should update the theme in mongoDB for the selected user id and return status 200', done => {
                chai
                    .request(app)
                    .put('/usuarios/updateTheme/'+usuario._id)
                    .set({ Authorization: `Bearer ${token}` })
                    .send({
                        data: {
                            appTheme: false
                        }
                    })
                    .end((err, res) => {
                        (err === null).should.be.true;
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    })
            });
        });       
    
    });

    // TEST #removeUsuario()
    describe('DELETE /removeUsuario #removeUsuario()', () => {

        describe('DELETE /removeUsuario #removeUsuario()', () => {
            it('It should remove the user from mongoDB return status 200', done => {
                chai
                    .request(app)
                    .delete('/usuarios/removeUsuario/'+usuario._id)
                    .set({ Authorization: `Bearer ${token}` })
                    .end((err, res) => {
                        console.log(res.body);
                        (err === null).should.be.true;
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    })
            });
        });    
    
    });
    
});
