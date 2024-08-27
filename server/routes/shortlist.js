const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const shortlist = require('../controllers/shortlist.controller')

// ======= ROUTE FOR /API/AUTH/ ============
router.get('/:id', afterSignupAuth, shortlist.doShortlistUser)
router.get('/', afterSignupAuth, shortlist.getShortlistedUser)

module.exports = router