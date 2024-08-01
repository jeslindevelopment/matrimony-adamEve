const Intrest = require('../models/mongodb/interest')

module.exports = {
    sendIntrest: async (req, res) => {
        try {
            if (!req.params.id || res.locals.auth.id) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing IDs',
                    error
                })
            }
            let receiveUserId = req.params.id
            let interests = await Intrest.get({ sendUserId: res.locals.auth.id, receiveUserId }, fields)
            if (interests.length) {
                res.status(400).json({
                    success: false,
                    message: 'Intrest already sent',
                    error
                })
            } else {
                await Intrest.add({ sendUserId: res.locals.auth.id, receiveUserId, receivedDate: new Date() })
                res.status(200).json({
                    success: true,
                    message: 'Intreset sent successfully'
                })
            }
        } catch (error) {
            console.log('error', error)
            res.status(400).json({
                success: false,
                message: 'Error on send Intrest',
                error
            })
        }
    }
}