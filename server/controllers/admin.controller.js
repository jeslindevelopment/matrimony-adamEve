const User = require('../models/mongodb/users');
const backup = require('mongodb-backup');
const { database } = require("../config");

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
            const xx = backup({
                uri: database["mongodb"][0].url, // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
                root: "backup",
                callback: function (err) {

                    if (err) {
                        console.error(err);
                    } else {
                        console.log('finish');
                    }
                },
                tar: 'dump.tar',
            });
            console.log(xx, "------xx")
        } catch (err) {
            console.log(err)
        }
    }
}