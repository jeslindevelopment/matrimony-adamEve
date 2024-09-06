const messages = require("../global/messages");
const Message = require("../models/mongodb/message")

module.exports = {
    sendMessage: async (req, res) => {
        // #swagger.tags = ['Message']
        // #swagger.description = 'For sending message us messaes to admin'
        try {
            let params = req.body;
            if (!params.name || !params.email || !params.phone || !params.message) {
                return res.status(400).json({
                    success: false,
                    data: messages.REQUIRED_FIELDS_MISSING
                })
            }
            await Message.add(params)
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
                    sendUserId : res.locals.auth.id
                },
                page: req.query.page || 0,
                size: req.query.size || 10
            }

            const messages = await Message.getPages(params)
            return res.status(200).json({
                success: true,
                data: messages
            })

        } catch (err) {
            return res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error: err
            })
        }
    }
}