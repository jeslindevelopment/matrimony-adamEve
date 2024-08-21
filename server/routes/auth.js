const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const auth = require('../controllers/auth.controller')

// ======= ROUTE FOR /API/AUTH/ ============
router.post('/login', auth.signin);
router.post('/logout', afterSignupAuth, auth.logout)
router.post('/signup', auth.validate(), auth.signup)


module.exports = router