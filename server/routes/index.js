const express = require('express');
const router = express.Router();
const config = require('../config').load();

// middleware
const { checkSession } = require('../middleware/sessionAuth');


const auth = require('./auth');
const user = require('./user');

router.use('/auth', auth);
router.use('/user', user);

module.exports = router