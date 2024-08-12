const express = require('express');
const router = express.Router();
const config = require('../config');

// middleware
// const { checkSession } = require('../middleware/sessionAuth');


const auth = require('./auth');
const user = require('./user');
const interest = require('./interest');
const shortlist = require('./shortlist');
const contact = require('./contact');

router.use('/auth', auth);
router.use('/user', user);
router.use('/interest', interest);
router.use('/shortlist', shortlist);
router.use('/contact', contact);

module.exports = router