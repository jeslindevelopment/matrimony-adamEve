const express = require('express');
const router = express.Router();
const config = require('../config').load();

// middleware
const { checkSession } = require('../middleware/sessionAuth');


const auth = require('./auth');
const user = require('./user');
const address = require('./address');
const order = require('./order');
const admin = require('./admin');
const telegram = require('./telegram');
const domain = require('./domain');
const product = require('./product');
const inventory = require('./inventory');
const form = require('./form');
const mengantar = require('./mengantar');
const payment = require('./payment');
const notification = require('./notification');
const tracking = require('./tracking');
const whatsApp = require('./whatsApp');
const whatsAppRotator = require('./whatsAppRotator');
const chat = require('./chat');
const shift = require('./shift');
const staff = require('./staff');
const timeoff = require('./timeoff');
const balance = require('./balance');
const feedback = require('./feedback');
const affiliate = require('./affiliate');
const privateRoute = require('./private');
const one = require('./one');
const discount = require('./discount');

router.use('/auth', auth);
router.use('/user', user);
router.use('/address', address);
router.use('/order', order);
router.use('/admin', admin);
router.use('/telegram', telegram);
router.use('/domain', domain);
router.use('/product', product);
router.use('/inventory', inventory);
router.use('/mengantar', mengantar);
router.use('/form', form);
router.use('/payment', payment);
router.use('/notification', notification);
router.use('/tracking', tracking);
router.use('/whatsapp', whatsApp);
router.use('/whatsapp-rotator', whatsAppRotator);
router.use("/chat", chat);
router.use("/shift", shift);
router.use("/staff", staff);
router.use("/timeoff", timeoff);
router.use('/balance', balance);
router.use('/feedback', feedback);
router.use('/affiliate', affiliate);
router.use('/private', privateRoute);
router.use('/one', one);
router.use('/discount', discount);

module.exports = router