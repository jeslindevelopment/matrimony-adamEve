const mongoose = require('./').getConnection()
const User = mongoose.model('Users', require('./schema/usersSchema'));

module.exports = {
    /** Return plain user object to get default values */
    user: () => {
        return new User({ email: 'user@example.com' });
    },

    get: (params, fields = null, removeFields = null) => {
        let userResp = [];
        let userkeys = Object.keys(User.schema.paths)
        return new Promise((resolve, reject) => {
            User.find(params, fields).sort({ 'createdAt': -1 })
                .exec(async (err, result) => {
                    if (fields && fields != null) {
                        userkeys = Object.keys(fields)
                    }

                    if (err) {
                        reject(err)
                        return
                    }
                    if (result.length) {
                        await Promise.all(result.map(async (val, index) => {
                            let userResults = {}
                            let user = result[index].toJSON();
                            await Promise.all(userkeys.map(w => {
                                if (removeFields && removeFields.includes(w)) {
                                } else {
                                    userResults[w] = user[w];
                                }
                            }))
                            userResp.push(userResults);
                        }))
                        resolve(userResp)
                    } else {
                        if (removeFields && removeFields != null) {
                            await Promise.all(removeFields.map(e => {
                                delete result[0][e]
                            }))
                        }
                        resolve(result)
                    }
                })
        })
    },
    get_w_role: (params, fields = null) => {
        return new Promise((resolve, reject) => {
            User.find(params, fields).populate('role_id').sort({ 'createdAt': -1 })
                .exec((err, result) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(result)
                })
        })
    },
    getPages: (params, fields = null) => {
        let size = params.size ? parseInt(params.size) : 10000
        let page = params.page ? parseInt(params.page) : 1
        let query = params.query ? params.query : {}
        console.log(size, page, query)
        return new Promise((resolve, reject) => {
            User.aggregate([
                {
                    $lookup: {
                        from: "shortlists",
                        localField: "_id",
                        foreignField: "shortlistUserId",
                        as: "shortlisted_info"
                    }
                },
                {
                    $addFields: {
                        isShortlisted: {
                            $cond: {
                                if: { $gt: [{ $size: "$shortlisted_info" }, 0] },
                                then: true,
                                else: false
                            }
                        }
                    }
                },
                {
                    $project: {
                        firstname: 1,
                        surname: 1,
                        phone: 1,
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
                        language: 1, // Include fields you want to show
                        isShortlisted: 1 // Add the `isShortlisted` field
                    }
                },
                { "$skip": size * (page - 1) },
                { "$limit": size }
            ]).exec((err, result) => {
                console.log(err, result)
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    },

    getFollowup: (params) => {
        return new Promise((resolve, reject) => {
            let _id = params._id
            let type = params.type
            User.find({
                _id: _id
            },
                {
                    "followUpTemplates": {
                        "$elemMatch": {
                            "type": { $in: type }
                        }
                    }
                }
                , (err, result) => {
                    err ? reject(err) : resolve(result)
                });
        })
    },
    getWhatsAppGlobalTemplates: (params) => {
        return new Promise((resolve, reject) => {
            let _id = params._id
            let type = params.type
            User.find({
                _id: _id
            },
                {
                    "whatsAppGlobalTemplates": {
                        "$elemMatch": {
                            "type": { $in: type }
                        }
                    }
                }
                , (err, result) => {
                    err ? reject(err) : resolve(result)
                });
        })
    },
    getCount: (params) => {
        return new Promise((resolve, reject) => {
            User.countDocuments(params.query ? params.query : params)
                .exec((err, result) => {
                    if (err) {

                        reject(err)
                        return
                    }
                    resolve(result)
                })
        })
    },
    get_w_select: (params, select) => {

        return new Promise((resolve, reject) => {
            User.find(params).select(select)
                .exec((err, result) => {
                    if (err) {

                        reject(err)
                        return
                    }
                    resolve(result)
                })
        })
    },
    get_w_sort: (params, select, sort) => {
        return new Promise((resolve, reject) => {
            User.find(params).select(select).sort(sort)
                .exec((err, result) => {
                    if (err) {

                        reject(err)
                        return
                    }
                    resolve(result)
                })
        })
    },
    // get_w_password: (params) => {
    //   return new Promise((resolve, reject) => {            
    //     User.find(params)
    //     .select("+password")
    //     .exec((err, result) => {
    //       if (err) {
    //           
    //           reject(err)
    //           return
    //       }
    //       resolve(result)
    //     })
    //   })
    // },
    populate: (params, path) => {
        return new Promise((resolve, reject) => {
            User.populate(params, path, (err, result) => {
                if (err) {

                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    },
    add: (params) => {
        return new Promise((resolve, reject) => {
            let modules = new User(params)
            modules.save((err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(modules)
                }
            })
        })
    },
    push: (params) => {
        return new Promise((resolve, reject) => {
            User.updateOne(params.selector, { '$push': params.data }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    update: (params) => {
        return new Promise((resolve, reject) => {
            User.updateOne(params.selector, { '$set': params.data }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            User.findByIdAndRemove({ _id: id }, function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    updateMany: (params) => {
        return new Promise((resolve, reject) => {
            User.updateMany(params.selector, { '$set': params.data }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
}
