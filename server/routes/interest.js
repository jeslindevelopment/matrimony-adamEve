const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const { checkUserPlan } = require('../middleware/checkUserPlan')
const intrest = require('../controllers/interest.controller')

// ======= ROUTE FOR /API/AUTH/ ============
router.get('/:id', afterSignupAuth, checkUserPlan, intrest.sendIntrest)
router.get('/withdraw/:id', afterSignupAuth, intrest.withdrawIntrest)
router.get('/', afterSignupAuth, intrest.getMyIntrests)
router.post('/update', afterSignupAuth, intrest.updateInterest)

module.exports = router