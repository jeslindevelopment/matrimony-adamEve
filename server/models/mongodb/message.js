const mongoose = require('./').getConnection()
const Message = mongoose.model('Messages', require('./schema/messageSchema'));

module.exports = {
    /** Return plain Message object to get default values */
    get: (params, fields = null, removeFields = null) => {
        let MessageResp = [];
        let Messagekeys = Object.keys(Message.schema.paths)
        return new Promise((resolve, reject) => {
            Message.find(params, fields).sort({ 'createdAt': -1 })
                .exec(async (err, result) => {
                    if (fields && fields != null) {
                        Messagekeys = Object.keys(fields)
                    }

                    if (err) {
                        reject(err)
                        return
                    }
                    if (result.length) {
                        await Promise.all(result.map(async (val, index) => {
                            let MessageResults = {}
                            let Message = result[index].toJSON();
                            await Promise.all(Messagekeys.map(w => {
                                if (removeFields && removeFields.includes(w)) {
                                } else {
                                    MessageResults[w] = Message[w];
                                }
                            }))
                            MessageResp.push(MessageResults);
                        }))
                        resolve(MessageResp)
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
            Message.find(params, fields).populate('role_id').sort({ 'createdAt': -1 })
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
        let query = params.query ? params.query : params
        return new Promise((resolve, reject) => {
            Message.aggregate([
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "receiveUserId",
                        "foreignField": "_id",
                        "as": "userDetail"
                    }
                },
                {
                    "$project": {
                        "_id": 1,
                        "receiveUserId": 1,
                        "sendUserId": 1,
                        "messages":1,
                        "userDetail._id": 1,
                        "userDetail.firstname": 1,
                        "userDetail.surname": 1,
                        "userDetail.maritalStatus": 1,
                        "userDetail.denomination": 1,
                        "userDetail.status": 1
                    }
                },
                { "group": { "_id": "$receiveUserId", "total": { "$sum": 1 } } },
                { "$skip": size * (page - 1) },
                { "$limit": size }
            ]).exec((err, result) => {
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
            Message.find({
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
            Message.find({
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
            Message.countDocuments(params.query ? params.query : params)
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
            Message.find(params).select(select)
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
            Message.find(params).select(select).sort(sort)
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
    //     Message.find(params)
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
            Message.populate(params, path, (err, result) => {
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
            let modules = new Message(params)
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
            Message.updateOne(params.selector, { '$push': params.data }, (err, result) => {
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
            Message.updateOne(params.selector, { '$set': params.data }, (err, result) => {
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
            Message.findByIdAndRemove({ _id: id }, function (err, result) {
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
            Message.updateMany(params.selector, { '$set': params.data }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
}
