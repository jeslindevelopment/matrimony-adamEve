const config = require('../config')
const Cookie = require('cookie')
const jwt = require('jsonwebtoken')
const User = require('../models/mongodb/users')
const messages = require('../global/messages')


const afterSignupAuth = (req, res, next) => {
  let token = req.headers && req.headers.token ? req.headers && req.headers.token : ''
  console.log(token, "token")
  if (token) {
    jwt.verify(token, config.jwtKey, async (err, decode) => {
      console.log(decode)
      if (err) {
        return res.status(401).json({
          success: false,
          c: messages.INVALID_TOKEN
        })
      } else {

        User.get({ _id: decode.userId }).then((user_result) => {
          if (user_result && user_result.length > 0 && user_result[0]._id) {
            res.locals.auth = {
              id: decode.userId,
              createAuth: true
            }
            req.userId = decode.userId;
            next()
          } else {
            res.status(400).json({
              success: false,
              c: messages.INVALID_TOKEN
            })
          }
        }).catch(err => {
          res.status(400).json({
            success: false,
            c: messages.UNEXPECTED_ERROR
          })
        })
      }
    })
  } else {
    if (!req.headers.cookie) {
      return res.status(400).json({
        success: false,
        c:messages.USER_NOT_FOUND
      })
    }
    var cookie = Cookie.parse(req.headers.cookie)
    var parsed = cookie
    if (cookie.formData == undefined && cookie.user == undefined) {
      return res.status(400).json({
        success: false,
        c: messages.USER_NOT_FOUND
      })
    } else {
      if (!JSON.parse(parsed.user).is_active) {
        return res.status(400).json({
          success: false,
          c: messages.USER_NOT_ACTIVE
        })
      } else {
        if (cookie.user != undefined) {
          res.locals.auth = {
            id: JSON.parse(parsed.user).id,
            createAuth: true
          }
          next()
        } else {
          jwt.verify(JSON.parse(parsed.auth).accessToken, config.jwtKey, (err, decode) => {
            if (err) {
              return res.status(400).json({
                success: false,
                c: messages.INVALID_TOKEN
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


const afterAdminAuth = (req, res, next) => {
  let token = req.headers && req.headers.token ? req.headers && req.headers.token : ''

  if (token) {
    jwt.verify(token, config.jwtKey, async (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          c: messages.INVALID_TOKEN
        })
      } else {
        if(decode.role != "admin"){
          return res.status(401).json({
          success: false,
          c: messages.USER_UNAUTHORIZED
        })
        }else{
          User.get({ _id: decode.userId }).then((user_result) => {
            if (user_result && user_result.length > 0 && user_result[0]._id) {
              res.locals.auth = {
                id: decode.userId,
                createAuth: true
              }
              req.userId = decode.userId;
              next()
            } else {
              res.status(400).json({
                success: false,
                c: messages.USER_UNAUTHORIZED
              })
            }
          }).catch(err => {
            res.status(400).json({
              success: false,
              c: messages.UNEXPECTED_ERROR
            })
          })
        }
      }
    })
  } else {
    if (!req.headers.cookie) {
      return res.status(400).json({
        success: false,
        c: messages.USER_NOT_FOUND
      })
    }
    var cookie = Cookie.parse(req.headers.cookie)
    var parsed = cookie
    if (cookie.formData == undefined && cookie.user == undefined) {
      return res.status(400).json({
        success: false,
        c: messages.USER_NOT_FOUND
      })
    } else {
      if (!JSON.parse(parsed.user).is_active) {
        return res.status(400).json({
          success: false,
          c: messages.USER_NOT_ACTIVE
        })
      } else {
        if (cookie.user != undefined) {
          res.locals.auth = {
            id: JSON.parse(parsed.user).id,
            createAuth: true
          }
          next()
        } else {
          jwt.verify(JSON.parse(parsed.auth).accessToken, config.jwtKey, (err, decode) => {
            if (err) {
              return res.status(400).json({
                success: false,
                c: messages.INVALID_TOKEN
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

module.exports = {
  afterSignupAuth,
  afterAdminAuth
}