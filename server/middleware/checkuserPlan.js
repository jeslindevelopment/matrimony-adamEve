const config = require('../config')
const Cookie = require('cookie')
const jwt = require('jsonwebtoken')
const User = require('../models/mongodb/users')
const Subscription = require('../models/mongodb/subscription')
const messages = require('../global/messages')
const common = require('../helpers/common')

const checkUserPlan = (req, res, next) => {
    User.get({ _id: req.userId }).then((user_result) => {
        if (user_result && user_result.length > 0 && user_result[0]._id) {
            if (user_result.subscriptionPlan == "Free") {
                next()
            } else {
                let [subscription] = Subscription.get({ _id: user_result.subscriptionID })
                if (subscription) {
                    let monthsSincePlan = common.monthDiff(new Date, user_result.subscriptionDate)
                    if (+monthsSincePlan > +subscription.validity) {
                        res.status(400).json({
                            success: false,
                            c: messages.SUBSCRIPTION_EXPIRED
                        })
                    } else {
                        let urlPath = req.originalUrl.replace(/\?.*$/, '')
                        if (urlPath.includes("upload-photo")) {
                            if (subscription.photosAllowed > user_result.photosCount) {
                                res.status(400).json({
                                    success: false,
                                    c: messages.UPGRADE_SUBSCRIPTION
                                })
                            }
                        } else if (urlPath.includes("interest")) {
                            if (subscription.contactAllowed > user_result.contactCount) {
                                res.status(400).json({
                                    success: false,
                                    c: messages.UPGRADE_SUBSCRIPTION
                                })
                            }
                        }
                    }
                    next()
                } else {
                    res.status(400).json({
                        success: false,
                        c: messages.NO_SUBSCRIPTION
                    })
                }
            }
        } else {
            res.status(400).json({
                success: false,
                c: messages.INVALID_TOKEN
            })
        }
    }).catch(err => {
        res.status(400).json({
            success: false,
            c: messages.UNEXPECTED_ERROR
        })
    })
}


module.exports = {
    checkUserPlan
}