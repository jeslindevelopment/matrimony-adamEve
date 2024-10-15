const User = require('../models/mongodb/users');
const Subscription = require('../models/mongodb/subscription');
// const backup = require('mongodb-backup');
const messages= require('../global/messages');
const mongoose = require('mongoose');
const { database } = require("../config");
const { MongoTransferer, MongoDBDuplexConnector, LocalFileSystemDuplexConnector } = require('mongodb-snapshot');
const fs = require('fs');
const path = require('path');

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
                message: messages.USER_UPDATE_SUCCESS,
                data: user
            })

        } catch (error) {
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
            console.log(database["mongodb"][0].url);

            // Generate a unique filename using a timestamp
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Replaces colon and dot with dash
            const backupFilePath = `./backup-${timestamp}.tar`;

            const mongo_connector = new MongoDBDuplexConnector({
                connection: {
                    uri: `mongodb://127.0.0.1:27017`,
                    dbname: 'matrimony',
                },
            });

            const localfile_connector = new LocalFileSystemDuplexConnector({
                connection: {
                    path: backupFilePath,
                },
            });

            const transferer = new MongoTransferer({
                source: mongo_connector,
                targets: [localfile_connector],
            });

            for await (const { total, write } of transferer) {
                console.log(`remaining bytes to write: ${total - write}`);
            }

            // Send the file to the user after backup is done
            res.download(backupFilePath, `backup-${timestamp}.tar`, (err) => {
                if (err) {
                    console.error("Error sending the file:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Failed to send the backup file.",
                    });
                }

                // After the file is sent, delete the file
                fs.unlink(backupFilePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error("Failed to delete backup file:", unlinkErr);
                    } else {
                        console.log("Backup file deleted successfully.");
                    }
                });
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message || err,
            });
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
                error: error.message || error
            })
        }
    },
    updateSubscriptionPlan: async (req, res) => {
        // #swagger.tags = ['Admin']
        // #swagger.description = 'Update subscription plan'
        try {
            let id = req.body.id
            let formData = req.body
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
                            error: messages.SUBSCRIPTION_UPDATE_FAILED,
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
                message: messages.SUBSCRIPTION_UPDATE_SUCCESS,
                data: subscriptionData
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message || error
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
            return res.json({
                success: false,
                data: error.message || error
            })
        }
    },
    dashboardData: async (req, res) => {
        // #swagger.tags = ['Admin']
        // #swagger.description = 'Get dashboard data'
        try {
            let userCount = await User.count({});
            let messageCount = await Message.count({});
            let dashboardData = {
                userCount,
                messageCount
            }
            res.status(200).json({
                success: true,
                data: dashboardData
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message || error
            })
        }
    }
}