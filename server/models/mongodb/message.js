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
    getPages: (params, id, fields = null) => {
        let size = params.size ? parseInt(params.size) : 10000
        let page = params.page ? parseInt(params.page) : 1
        let query = params.query ? params.query : params
        return new Promise((resolve, reject) => {
            let payloadQuery = [
                query,
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "sendUserId",
                        "foreignField": "_id",
                        "as": "senderDetails"
                    }
                },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "receiveUserId",
                        "foreignField": "_id",
                        "as": "receiverDetails"
                    }
                },
                {
                    "$unwind": "$senderDetails"   // Flatten the sender details array
                },
                {
                    "$unwind": "$receiverDetails"  // Flatten the receiver details array
                },
                {
                    "$addFields": {
                        "messageText": "$message",  // The actual message text
                        "sentBy": {
                            "name": { "$concat": ["$senderDetails.firstname", " ", "$senderDetails.surname"] },
                            "profile": "$senderDetails.profile"
                        },
                        "receiver": {
                            "name": { "$concat": ["$receiverDetails.firstname", " ", "$receiverDetails.surname"] },
                            "profile": "$receiverDetails.profile"
                        },
                        // Create a composite key with the lower of sendUserId or receiveUserId as user1
                        "user1": {
                            "$cond": {
                                "if": { "$lt": ["$sendUserId", "$receiveUserId"] },
                                "then": "$sendUserId",
                                "else": "$receiveUserId"
                            }
                        },
                        "user2": {
                            "$cond": {
                                "if": { "$gt": ["$sendUserId", "$receiveUserId"] },
                                "then": "$sendUserId",
                                "else": "$receiveUserId"
                            }
                        }
                    }
                },
                {
                    "$group": {
                        "_id": { "user1": "$user1", "user2": "$user2" },   // Group by user1 and user2
                        "senderName": { "$first": "$sentBy.name" },         // Group-level sender name
                        "senderProfile": { "$first": "$sentBy.profile" },   // Group-level sender profile
                        "receiverName": { "$first": "$receiver.name" },     // Group-level receiver name
                        "receiverProfile": { "$first": "$receiver.profile" }, // Group-level receiver profile
                        "messages": {
                            "$push": {
                                "messageText": "$messageText",  // Push all messages into an array
                                "sentBy": "$sentBy",
                                "createdAt": "$createdAt"
                            }
                        }
                    }
                },
                {
                    "$sort": { "_id.user1": 1, "_id.user2": 1 }  // Optionally sort by user1 and user2 IDs
                }
              ]
            Message.aggregate(payloadQuery)
            .exec((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });                                 
                       
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
