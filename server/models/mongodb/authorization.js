const mongoose = require('./../').getConnection()
const Authorization = mongoose.model('Authorization', require('./schema/authorizationSchema'))

module.exports = {
  get: (params) => {
    return new Promise((resolve, reject) => {
      Authorization.find(params)
        .exec((err, result) => {
          if (err) {

            reject(err)
            return
          }
          resolve(result)
        })
    })
  },
  getCount: (params) => {
    return new Promise((resolve, reject) => {
      Authorization.countDocuments(params.query ? params.query : params)
        .exec((err, result) => {
          if (err) {

            reject(err)
            return
          }
          resolve(result)
        })
    })
  },
  getByUser: (params, sum) => {
    return new Promise((resolve, reject) => {
      Authorization.aggregate([
        {
          "$group": {
            _id: {
              email: '$email',
            },
            "count": { "$sum": sum ? sum : 1 }
          },
        },
        {
          $match: { count: { $gt: 1 } }
        }
      ]).exec((err, result) => {
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
      Authorization.find(params).select(select)
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
      Authorization.find(params).select(select).sort(sort)
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
  //     Authorization.find(params)
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
  add: (params) => {
    return new Promise((resolve, reject) => {
      let modules = new Authorization(params)
      modules.save((err) => {
        if (err) {
          reject(err)
        } else {
          resolve(modules)
        }
      })
    })
  },
  update: (params) => {
    return new Promise((resolve, reject) => {
      Authorization.updateMany(params.selector, { '$set': params.data }, (err, result) => {
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
      Authorization.findByIdAndRemove({ _id: id }, function (err, result) {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deleteManyByParams: (params) => {
    return new Promise((resolve, reject) => {
      Authorization.deleteMany(params, function (err, result) {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}