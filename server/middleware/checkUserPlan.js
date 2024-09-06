const User = require('../models/mongodb/users')
const Subscription = require('../models/mongodb/subscription')
const messages = require('../global/messages')
const common = require('../helpers/common')
const mongoose = require('mongoose')

const checkUserPlan = (req, res, next) => {
    User.get({ _id: req.userId }).then(async (result) => {
        let user_result = result[0];
        if (user_result  && user_result._id) {
            if (user_result.subscriptionPlan == "Free") {
                next()
            } else {
                let [subscription] = await Subscription.get({ _id: new mongoose.mongo.ObjectId(user_result.subscriptionID) })
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
                            if (subscription.freeContacts > user_result.freeContactsCount) {
                                res.status(400).json({
                                    success: false,
                                    c: messages.UPGRADE_SUBSCRIPTION
                                })
                            }
                        } else if (urlPath.includes("/user/update")) {
                            if (subscription.contactAllowed > user_result.contactCount) {
                                res.status(400).json({
                                    success: false,
                                    c: messages.UPGRADE_SUBSCRIPTION
                                })
                            }
                        } else {
                            next()
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
        console.log(err)
        res.status(400).json({
            success: false,
            c: messages.UNEXPECTED_ERROR
        })
    })
}


module.exports = {
    checkUserPlan
}