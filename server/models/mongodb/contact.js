const mongoose = require('./').getConnection()
const Contact = mongoose.model('Contacts', require('./schema/contactUsSchema'));

module.exports = {
    /** Return plain Contact object to get default values */
    Contact: () => {
        return new Contact({ email: 'Contact@example.com' });
    },

    get: (params, fields = null, removeFields = null) => {
        let ContactResp = [];
        let Contactkeys = Object.keys(Contact.schema.paths)
        return new Promise((resolve, reject) => {
            Contact.find(params, fields).sort({ 'createdAt': -1 })
                .exec(async (err, result) => {
                    if (fields && fields != null) {
                        Contactkeys = Object.keys(fields)
                    }

                    if (err) {
                        reject(err)
                        return
                    }
                    if (result.length) {
                        await Promise.all(result.map(async (val, index) => {
                            let ContactResults = {}
                            let Contact = result[index].toJSON();
                            await Promise.all(Contactkeys.map(w => {
                                if (removeFields && removeFields.includes(w)) {
                                } else {
                                    ContactResults[w] = Contact[w];
                                }
                            }))
                            ContactResp.push(ContactResults);
                        }))
                        resolve(ContactResp)
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
            Contact.find(params, fields).populate('role_id').sort({ 'createdAt': -1 })
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
            Contact.find(query, fields).sort(params && params.sort ? params.sort : { 'createdAt': -1 })
                .limit(size)
                .skip(size * (page - 1))
                .exec((err, result) => {
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
            Contact.find({
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
            Contact.find({
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
            Contact.countDocuments(params.query ? params.query : params)
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
            Contact.find(params).select(select)
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
            Contact.find(params).select(select).sort(sort)
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
    //     Contact.find(params)
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
            Contact.populate(params, path, (err, result) => {
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
            let modules = new Contact(params)
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
            Contact.updateOne(params.selector, { '$push': params.data }, (err, result) => {
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
            Contact.updateOne(params.selector, { '$set': params.data }, (err, result) => {
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
            Contact.findByIdAndRemove({ _id: id }, function (err, result) {
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
            Contact.updateMany(params.selector, { '$set': params.data }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
}
