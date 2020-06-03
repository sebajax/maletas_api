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

module.exports = router;