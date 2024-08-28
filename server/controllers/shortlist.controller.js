const messages = require('../global/messages')
const Shortlist = require('../models/mongodb/shortlist')

module.exports = {
    doShortlistUser: async (req, res) => {
        // #swagger.tags = ['Shortlist']
        // #swagger.description = 'For Shortlisting user based on id sent in paramter'
        try {
            if (!req.params.id || !res.locals.auth.id) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing IDs',
                })
            }
            let shortlistUserId = req.params.id
            let shortlists = await Shortlist.get({ userId: res.locals.auth.id, shortlistUserId })
            if (shortlists.length) {
                await Shortlist.delete(shortlists[0]._id)
                res.status(200).json({
                    success: true,
                    message: messages.SHORTLIST_REMOVED
                })
            } else {
                await Shortlist.add({ userId: res.locals.auth.id, shortlistUserId, contacted: false })
                res.status(200).json({
                    success: true,
                    message: messages.SHORTLIST_SUCCESS
                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error: error.message || error
            })
        }
    },
    getShortlistedUser: async (req, res) => {
        // #swagger.tags = ['Shortlist']
        // #swagger.description = 'For getting list of shortlisted user'
        try {
            let shortlists = await Shortlist.getPages({ userId: res.locals.auth.id })
            res.status(200).json({
                success: true,
                message: shortlists
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error on getting list',
                error
            })
        }
    }
}