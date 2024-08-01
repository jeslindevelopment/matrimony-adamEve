const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const intrest = require('../controllers/interestController')

// ======= ROUTE FOR /API/AUTH/ ============
router.post('/:id', afterSignupAuth, intrest.sendIntrest)

module.exports = router