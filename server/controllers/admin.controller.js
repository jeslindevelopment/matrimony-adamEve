const User = require('../models/mongodb/users');
// const backup = require('mongodb-backup');
const { database } = require("../config");
const { MongoTransferer, MongoDBDuplexConnector, LocalFileSystemDuplexConnector } = require('mongodb-snapshot');

module.exports = {
    updateUser: async (req, res) => {
        try {
            var id = req.body.id
            delete req.body.id;

            console.log(id, req.body)

            await User.update({
                selector: { _id: id },
                data: req.body
            })

            let [user] = await User.get({ _id: id })
            let time2 = new Date().getTime()
            return res.json({
                success: true,
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
    }
}