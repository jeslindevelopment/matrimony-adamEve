const express = require('express')
const router = express.Router()
const { afterSignupAuth } = require('../middleware/signupAuthTmp')
const user = require('../controllers/user.controller')
const { checkUserPlan } = require('../middleware/checkUserPlan')
const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
        console.log(file, req);
        
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

// ======= ROUTE FOR /API/USER/ ============
router.get('/list', afterSignupAuth, user.getUsers)
router.post('/profile-upload-multiple',afterSignupAuth, checkUserPlan, upload.array('profile-files', 12), user.uploadImages);

//for logged in user details
router.get('/one', afterSignupAuth, user.getUserDetail)
router.get('/:id', afterSignupAuth, user.getOtherUserDetail)
router.post('/update', afterSignupAuth, checkUserPlan, user.updateUser)
router.post('/buy-subscription/:id', afterSignupAuth, user.buySubscription)


module.exports = router