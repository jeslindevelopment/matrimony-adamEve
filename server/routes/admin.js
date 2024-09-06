const express = require('express')
const router = express.Router()
const { afterAdminAuth } = require('../middleware/signupAuthTmp')
const admin = require('../controllers/admin.controller')

// ======= ROUTE FOR /API/AUTH/ ============
router.post('/user-update', afterAdminAuth, admin.updateUser)
router.get('/subscription-detail/:id', afterAdminAuth, admin.getSubscriptionPlan)
router.get('/subscription-list', afterAdminAuth, admin.getSubscriptionPlanList)
router.post('/subscription-update', afterAdminAuth, admin.updateSubscriptionPlan)
router.get('/backup', admin.backupDatabase)

module.exports = router