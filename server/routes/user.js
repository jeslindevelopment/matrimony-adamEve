const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const user = require('../controllers/user.controller')
const { checkUserPlan } = require('../middleware/checkUserPlan')

// ======= ROUTE FOR /API/USER/ ============
router.get('/list', afterSignupAuth, user.getUsers)

//for logged in user details
router.get('/one', afterSignupAuth, user.getUserDetail)
router.get('/:id', afterSignupAuth, user.getOtherUserDetail)
router.post('/update', afterSignupAuth, checkUserPlan, user.updateUser)
router.post('/buy-subscription/:id', afterSignupAuth, user.buySubscription)


module.exports = router