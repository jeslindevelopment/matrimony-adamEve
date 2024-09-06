const express = require('express')
const router = express.Router()
const { afterSignupAuth , afterAdminAuth} = require('../middleware/signupAuthTmp')
const message = require('../controllers/message.controller')

router.post('/send', afterSignupAuth, message.sendMessage)
router.post('/list', afterAdminAuth, message.getList )

module.exports = router