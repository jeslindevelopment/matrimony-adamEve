const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const shortlist = require('../controllers/shortlistController')

// ======= ROUTE FOR /API/AUTH/ ============
router.post('/:id', afterSignupAuth, shortlist.doShortlistUser)

module.exports = router