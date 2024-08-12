const express = require('express')
const router = express.Router()
const { afterSignupAuth , afterAdminAuth} = require('../middleware/signupAuthTmp')
const contact = require('../controllers/contact.controller')

router.post('/send', contact.addContactMessage)
router.post('/list', afterAdminAuth, contact.getList )

module.exports = router