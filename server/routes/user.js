const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const user = require('../controllers/user.controller')

// ======= ROUTE FOR /API/USER/ ============
router.get('/list', user.getUsers)

//for logged in user details
router.get('/one', afterSignupAuth, user.getUserDetail)
router.post('/update', afterSignupAuth, user.updateUser)


module.exports = router