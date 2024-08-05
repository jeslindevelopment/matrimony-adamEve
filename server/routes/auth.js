const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const auth = require('../controllers/authController')

// ======= ROUTE FOR /API/AUTH/ ============
router.post('/login', auth.signin)
router.post('/logout', afterSignupAuth, auth.logout)
router.post('/signup', auth.validate(), auth.signup)

router.post('/contact', auth.addContactMessage)

module.exports = router