const messages = require("../global/messages");
const Message = require("../models/mongodb/message")

const mongoose = require('mongoose');

module.exports = {
    sendMessage: async (req, res) => {
        // #swagger.tags = ['Message']
        // #swagger.description = 'For sending message us messaes to admin'
        try {
            let params = req.body;
            if (!params.receiveUserId || !params.message || !res.locals.auth.id) {
                return res.status(400).json({
                    success: false,
                    data: messages.REQUIRED_FIELDS_MISSING
                })
            }
            let payload = {
                receiveUserId: params.receiveUserId,
                message: params.message,
                sendUserId: res.locals.auth.id,
                receivedDate: new Date()
            }
            await Message.add(payload)
            return res.status(200).json({
                success: true,
                message: messages.MESSAGE_RECIEVED
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error: err.message || err
            })
        }
    },
    getList: async (req, res) => {
        // #swagger.tags = ['Message']
        // #swagger.description = 'Listing for message us message'
        try {
            let params = {
                query: {
                    "$match": {
                        "$or": [
                            { "sendUserId": new mongoose.mongo.ObjectId(res.locals.auth.id) },  // Messages sent by userA
                            { "receiveUserId": new mongoose.mongo.ObjectId(res.locals.auth.id) } // Messages received by userA
                        ]
                    }
                },
                page: req.query.page || 0,
                size: req.query.size || 10
            }

            const messages = await Message.getPages(params, res.locals.auth.id)
            return res.status(200).json({
                success: true,
                data: messages
            })

        } catch (err) {
            console.log(err)
            return res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error: err
            })
        }
    }
}