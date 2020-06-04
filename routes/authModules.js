'use strict';

const express = require('express');
const router = express.Router();
const authModulesController  = require('../controllers/authModulesController');

/* GET AuthModules. */
router.get('/getAuthModules', authModulesController.getAuthModules);

/* GET AuthModules. */
router.get('/getAuthModule/:module', authModulesController.getAuthModule);

/* POST save AuthModules. */
router.post('/saveAuthModule/:module', authModulesController.saveAuthModule);

/* GET isAuth */
router.get('/isAuth/:permId/:module', authModulesController.isAuth);

module.exports = router;