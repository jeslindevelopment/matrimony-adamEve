const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const auth = require('../controllers/authController')

// ======= ROUTE FOR /API/AUTH/ ============
router.post('/login', auth.signin)
router.post('/logout', afterSignupAuth, auth.logout)
router.post('/loginAsUser', afterSignupAuth, auth.signinAsUser)
router.post('/signup', auth.validate(), auth.signup)
router.get('/:email', auth.checkEmail)
router.get('/checkusername/:username', auth.checkUsername)
router.post('/forgotpassword', checkValidHost, auth.sendRecoveryEmail)
router.post('/forgotpassword/change', auth.changePassword)
router.post('/forgotpassword/check', auth.checkRecoveryCode)
// router.post('/config', auth.config)
router.post('/sendConfirmationRegister', auth.generateCodeForRegister)
router.post('/verifyAccountRegister', auth.verifyAccountRegister)
router.post('/verifyGoogleCaptcha', auth.verifyGoogleCaptcha)

module.exports = router