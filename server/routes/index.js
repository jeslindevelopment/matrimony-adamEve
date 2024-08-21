const express = require('express');
const router = express.Router();
const config = require('../config');

const auth = require('./auth');
const user = require('./user');
const interest = require('./interest');
const shortlist = require('./shortlist');
const contact = require('./contact');
const admin = require('./admin');

router.use('/auth', auth);
router.use('/user', user);
router.use('/interest', interest);
router.use('/shortlist', shortlist);
router.use('/contact', contact);
router.use('/admin', admin);

module.exports = router