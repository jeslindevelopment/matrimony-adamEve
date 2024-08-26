const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const intrest = require('../controllers/interest.controller')

// ======= ROUTE FOR /API/AUTH/ ============
router.get('/:id', afterSignupAuth, intrest.sendIntrest)
router.get('/withdraw/:id', afterSignupAuth, intrest.withdrawIntrest)
router.get('/', afterSignupAuth, intrest.getMyIntrests)

module.exports = router