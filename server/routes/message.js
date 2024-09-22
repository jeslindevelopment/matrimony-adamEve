const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const message = require('../controllers/message.controller')

router.post('/send', afterSignupAuth, message.sendMessage)
router.get('/list', afterSignupAuth, message.getList )

module.exports = router