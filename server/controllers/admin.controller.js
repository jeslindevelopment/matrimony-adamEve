const User = require('../models/mongodb/users');
const Subscription = require('../models/mongodb/subscription');
// const backup = require('mongodb-backup');
const mongoose = require('mongoose');
const { database } = require("../config");
const { MongoTransferer, MongoDBDuplexConnector, LocalFileSystemDuplexConnector } = require('mongodb-snapshot');

module.exports = {
    updateUser: async (req, res) => {
        // #swagger.tags = ['Admin']
        // #swagger.description = 'Update a user'
        try {
            var id = req.body.id
            delete req.body.id;
            await User.update({
                selector: { _id: id },
                data: req.body
            })

            let [user] = await User.get({ _id: id })
            let time2 = new Date().getTime()
            return res.json({
                success: true,
                message: USER_UPDATE_SUCCESS,
                data: user
            })

        } catch (error) {
            console.log('error', error)
            res.status(400).json({
                success: false,
                message: 'Error on update user',
                error
            })
        }
    },
    backupDatabase: async (req, res) => {
        // #swagger.tags = ['Admin']
        // #swagger.description = 'Database backup'
        try {
            console.log(database["mongodb"][0].url)
            const mongo_connector = new MongoDBDuplexConnector({
                connection: {
                    uri: `mongodb://127.0.0.1:27017`,
                    dbname: 'matrimony',
                },
            });

            const localfile_connector = new LocalFileSystemDuplexConnector({
                connection: {
                    path: './backup.tar',
                },
            });

            const transferer = new MongoTransferer({
                source: mongo_connector,
                targets: [localfile_connector],
            });

            for await (const { total, write } of transferer) {
                console.log(`remaining bytes to write: ${total - write}`);
            }
        } catch (err) {
            console.log(err)
        }
    },
    getSubscriptionPlan: async (req, res) => {
        // #swagger.tags = ['Admin']
        // #swagger.description = 'Get subscription plan detail based on id'
        try {
            let [subscriptionData] = await Subscription.get({ _id: new mongoose.mongo.ObjectId(req.params.id) })
            res.status(200).json({
                success: true,
                data: subscriptionData,
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            })
        }
    },
    updateSubscriptionPlan: async (req, res) => {
        // #swagger.tags = ['Admin']
        // #swagger.description = 'Update subscription plan'
        try {
            let id = req.body.id
            const reg = new RegExp('^[0-9]+$');
            let checkKeys = ["freeContacts", "photosAllowed", "contactAllowed", "validity"]
            let updateData = {}
            Object.keys(formData).forEach(keys => {
                if (checkKeys.includes(keys)) {
                    if ((reg.test(formData[keys]) || formData[keys] === "unlimited")) {
                        updateData[keys] = formData[keys]
                    } else {
                        res.status(400).json({
                            success: true,
                            error: SUBSCRIPTION_UPDATE_FAILED,
                        })
                    }
                }
            })

            await Subscription.update({
                selector: { _id: id },
                data: updateData
            })

            let [subscriptionData] = await Subscription.get({ _id: id })
            let time2 = new Date().getTime()
            return res.json({
                success: true,
                message: SUBSCRIPTION_UPDATE_SUCCESS,
                data: subscriptionData
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            })
        }
    },
    getSubscriptionPlanList: async (req, res) => {
        // #swagger.tags = ['Admin']
        // #swagger.description = 'Get subscription plan'
        try {
            let plans = await Subscription.getPages({});
            res.status(200).json({
                success: true,
                data: plans,
            })
        } catch (error) {
            console.log(error, "error")
            return res.json({
                success: false,
                data: error
            })
        }
    }
}