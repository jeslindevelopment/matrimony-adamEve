const config = require('../config').load()
const Cookie = require('cookie')
const jwt = require('jsonwebtoken')
const User = require('../models/mongodb/users')

export const afterSignupAuth = (req, res, next) => {
  let token = req.headers && req.headers.token ? req.headers && req.headers.token : ''

  if (token) {
    jwt.verify(token, config.jwtKey, async (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          c: 'invalid token 1'
        })
      } else {

        User.get({ _id: decode.userId }).then((user_result) => {
          if (user_result && user_result.length > 0 && user_result[0]._id) {
            res.locals.auth = {
              id: decode.userId,
              parentId: user_result.parentId,
              createAuth: true
            }
            req.userId = decode.userId;
            next()
          } else {
            res.status(400).json({
              success: false,
              c: 'user not allowed to access this function'
            })
          }
        }).catch(err => {
          res.status(400).json({
            success: false,
            c: 'An error occured'
          })
        })
      }
    })
  } else {
    if (!req.headers.cookie) {
      return res.status(400).json({
        success: false,
        c: 'user data not found'
      })
    }
    var cookie = Cookie.parse(req.headers.cookie)
    var parsed = cookie
    if (cookie.formData == undefined && cookie.user == undefined) {
      return res.status(400).json({
        success: false,
        c: 'user data not found 1'
      })
    } else {
      if (!JSON.parse(parsed.user).is_active) {
        return res.status(400).json({
          success: false,
          c: 'user is inactive'
        })
      } else {
        if (cookie.user != undefined) {
          res.locals.auth = {
            id: JSON.parse(parsed.user).id,
            parentId: JSON.parse(parsed.user).parentId,
            createAuth: true
          }
          next()
        } else {
          jwt.verify(JSON.parse(parsed.auth).accessToken, config.jwtKey, (err, decode) => {
            if (err) {
              return res.status(400).json({
                success: false,
                c: 'invalid token'
              })
            } else {
              res.locals.auth = {
                id: decode.userId,
                createAuth: false
              }
              next()
            }
          })
        }
      }
    }
  }
}