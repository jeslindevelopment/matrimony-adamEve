const Shortlist = require('../models/mongodb/shortlist')

module.exports = {
    doShortlistUser: async (req, res) => {
        try {
            if (!req.params.id || res.locals.auth.id) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing IDs',
                })
            }
            let shortlistUserId = req.params.id
            let shortlists = await Shortlist.get({ userId: res.locals.auth.id, shortlistUserId })
            if (shortlists.length) {
                res.status(400).json({
                    success: false,
                    message: 'Already Shortlisted',
                })
            } else {
                await Shortlist.add({ userId: res.locals.auth.id, shortlistUserId, contacted: false })
                res.status(200).json({
                    success: true,
                    message: 'User shortlisted'
                })
            }
        } catch (error) {
            console.log('error', error)
            res.status(400).json({
                success: false,
                message: 'Error on shortlisting',
                error
            })
        }
    },
    getShortlistedUser: async (req, res) => {
        try {
            let shortlists = await Shortlist.get({ userId: res.locals.auth.id })
            res.status(200).json({
                success: true,
                message: shortlists
            })
        } catch (error) {
            console.log('error', error)
            res.status(400).json({
                success: false,
                message: 'Error on getting list',
                error
            })
        }
    }
}