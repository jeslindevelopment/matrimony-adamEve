@ -1, 155 + 0, 0 @@

const User = require('../models/mongodb/users')

module.exports = {
    getUsers: async (req, res) => {
        try {
            let params = {
                size: req.query.size ? req.query.size : 1000,
                page: req.query.page ? req.query.page : 1,
            }

            params["query"] = {
                $and: [
                    { gender: req.query.gender },
                    { status: "active" }
                ]
            }

            params.query.$and.push({
                firstname: new RegExp("^" + req.query.search, "i"),
                surname: new RegExp("^" + req.query.search, "i"),
                denomination: new RegExp("^" + req.query.search, "i"),
                city: new RegExp("^" + req.query.search, "i"),
                state: new RegExp("^" + req.query.search, "i"),
                country: new RegExp("^" + req.query.search, "i")
            })

            const fields = {
                firstname: 1,
                surname: 1,
                dob: 1,
                maritalStatus: 1,
                denomination: 1,
                city: 1,
                state: 1,
                country: 1,
                pincode: 1,
                height: 1,
                weight: 1,
                education: 1,
                specialization: 1,
                annualIncome: 1,
                language: 1,
            }

            let users = await User.getPages(params, fields);
            let count = await User.getCount({ parentId: res.locals.auth.id });
            res.status(200).json({
                success: true,
                data: users,
                count
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error
            })
        }
    },
    getUserDetail: async (req, res) => {
        try {
            const fields = {
                role: 1,
                firstname: 1,
                surname: 1,
                dob: 1,
                gender: 1,
                maritalStatus: 1,
                unmarriedReason: 1,
                phone: 1,
                otp: 1,
                status: 1,
                denomination: 1,
                city: 1,
                state: 1,
                country: 1,
                pincode: 1,
                height: 1,
                weight: 1,
                bodyType: 1,
                complexion: 1,
                eatingHabits: 1,
                drink: 1,
                smoke: 1,
                education: 1,
                specialization: 1,
                bloodGroup: 1,
                jobLocation: 1,
                annualIncome: 1,
                designation: 1,
                motherTongue: 1,
                language: 1,
                disability: 1,
                preferredProfilesState: 1,

                fatherName: 1,
                fatherOccupation: 1,
                motherName: 1,
                motherOccupation: 1,
                numberOfBrother: 1,
                numberOfSister: 1,
                parentContact: 1,

                churchName: 1,
                churchPriest: 1,
                pastorsContact: 1,
                churchAddress: 1,
                yearOfBaptism: 1,
                ministry: 1,

                selfDescription: 1,
                partnersExpectations: 1
            }
            let user = await User.get({ _id: res.locals.auth.id }, fields)
            return res.json({
                success: true,
                data: user
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error on get user',
                error
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            var params = { ...req.body }
            delete params.role;
            delete params.otp;

            await User.update({
                selector: { _id: res.locals.auth.id },
                data: params
            })

            let [user] = await User.get({ _id: res.locals.auth.id })
            user = user.toJSON()
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
}