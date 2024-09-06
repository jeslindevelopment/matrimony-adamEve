const Intrest = require('../models/mongodb/interest')
const messages = require('../global/messages')
const mongoose = require('mongoose');

module.exports = {
    sendIntrest: async (req, res) => {
        // #swagger.tags = ['Intrest']
        // #swagger.description = 'For sending interest to a person'
        try {
            if (!req.params.id || !res.locals.auth.id) {
                return res.status(400).json({
                    success: false,
                    message: messages.REQUIRED_FIELDS_MISSING,
                })
            }
            let receiveUserId = new mongoose.mongo.ObjectId(req.params.id)
            let interests = await Intrest.get({ sendUserId: res.locals.auth.id, receiveUserId })
            if (interests.length) {
                res.status(400).json({
                    success: false,
                    message: messages.INTEREST_ALREADY_SENT
                })
            } else {
                await Intrest.add({ sendUserId: new mongoose.mongo.ObjectId(res.locals.auth.id), receiveUserId, receivedDate: new Date() })
                res.status(200).json({
                    success: true,
                    message: messages.INTEREST_SENT
                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error
            })
        }
    },
    getMyIntrests: async (req, res) => {
        // #swagger.tags = ['Intrest']
        // #swagger.description = 'For getting list of interest. Incase of sent interest, don't need to send any interestType for recieved, send receievd as interestType in query param'
        try {
            let interestTypeQuery = req.query.interestType ? req.query.interestType == "recieved" ? { receiveUserId: res.locals.auth.id } : { sendUserId: res.locals.auth.id } : { sendUserId: res.locals.auth.id }

            let params = {
                query: interestTypeQuery
            }
            let interests = await Intrest.getPages(params)
            res.status(200).json({
                success: true,
                data: interests
            })

        } catch (err) {
            res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error: err
            })
        }
    },
    withdrawIntrest: async (req, res) => {
        // #swagger.tags = ['Intrest']
        // #swagger.description = 'For withdrawing interest to a person'
        try {
            if (!req.params.id || !res.locals.auth.id) {
                return res.status(400).json({
                    success: false,
                    message: messages.REQUIRED_FIELDS_MISSING,
                })
            }
            let interests = await Intrest.delete(req.params.id)
            if (interests) {
                res.status(200).json({
                    success: true,
                    message: messages.INTEREST_WITHDRAWN
                })
            }
        } catch (err) {
            res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error: err
            })
        }
    },
    updateInterest: async (req, res) => {
        // #swagger.tags = ['Intrest']
        // #swagger.description = 'For updating status interest like accept or reject'
        try {
            if (!req.params.id || !res.locals.auth.id) {
                return res.status(400).json({
                    success: false,
                    message: messages.REQUIRED_FIELDS_MISSING,
                })
            }
            let [interest] = await Intrest.get({ _id: req.params.id })
            if (interest.receiveUserId == res.locals.auth.id) {
                await Intrest.update({
                    selector: { _id: req.params.id },
                    data: { status: req.body.status }
                })

                res.status(200).json({
                    success: true,
                    message: messages[req.body.status.includes("accept") ? INTEREST_ACCEPTED : INTEREST_REJECTED]
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: messages.USER_UNAUTHORIZED,
                })
            }
        } catch (err) {
            res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error: err
            })
        }
    }
}