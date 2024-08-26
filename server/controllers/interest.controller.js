const Intrest = require('../models/mongodb/interest')
const messages = require('../global/messages')
const mongoose = require('mongoose');

module.exports = {
    sendIntrest: async (req, res) => {
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
                console.log({ sendUserId: res.locals.auth.id, receiveUserId, receivedDate: new Date() })
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
        try {
            let params = {
                query: { sendUserId: res.locals.auth.id }
            }
            let interests = await Intrest.getPages(params)
            res.status(200).json({
                success: true,
                data: interests
            })

        } catch (err) {
            console.log(err)
            res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error: err
            })
        }
    },
    withdrawIntrest: async (req, res) => {
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
            console.log(err)
            res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error: err
            })
        }
    }
}