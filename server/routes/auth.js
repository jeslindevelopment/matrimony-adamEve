const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const auth = require('../controllers/auth.controller')

// ======= ROUTE FOR /API/AUTH/ ============
router.post('/login', auth.signin);
router.post('/logout', afterSignupAuth, auth.logout)
router.post('/signup', auth.validate(), auth.signup)
router.post('/generate-hash', auth.generateHash)
router.get('/subscription', auth.getSubscriptionPlan)

module.exports = router