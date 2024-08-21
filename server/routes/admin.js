const express = require('express')
const router = express.Router()
const { afterAdminAuth } = require('../middleware/signupAuthTmp')
const admin = require('../controllers/admin.controller')

// ======= ROUTE FOR /API/AUTH/ ============
router.post('/user-update', afterAdminAuth, admin.updateUser)

module.exports = router