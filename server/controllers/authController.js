const User = require('../models/mongodb/users')
const Role = require('../models/mongodb/role')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Authorization = require('../models/mongodb/authorization')
const config = require('../config')
const { check, validationResult } = require('express-validator')
const md5 = require('md5')
const qs = require('qs')
const axios = require('axios');
const mongoose = require('mongoose');
const EmailModule = require('./emailController');

module.exports = {
    validate: () => {
        return [
            check('name', 'Name is required').not().isEmpty(),
            // check('email', 'Email is required').not().isEmpty().isEmail(),
            check('password', 'State name is required').not().isEmpty(),
            check('phone', 'Phone is required').not().isEmpty()
        ]
    },
    logout: async (req, res) => {
        let userId = res.locals.auth.parentId ? res.locals.auth.parentId : res.locals.auth.id
        var cookie = Cookie.parse(req.headers.cookie)
        module.exports.removeAuthorization(userId, JSON.parse(cookie.user).token)

        return res.json({
            success: true
        })
    },
    removeAuthorization(user_id, token) {
        Authorization.deleteManyByParams({ user_id: user_id, token: token })
    },
    addAuthorization(user_id, email, req, token) {
        Authorization.deleteManyByParams({ user_id: user_id, token: token })
        Authorization.add({
            user_id: user_id,
            email: email,
            userAgent: req.headers['user-agent'],
            token: token,
        })
    },
    signin: (req, res) => {
        if (req.body.phone == '' || req.body.password == '') {
            return res.status(500).json({
                success: false,
                message: 'Phone No. or Password is not correct. Please try again'
            })
        }
        User.get({ phone: new RegExp(["^", req.body.phone, "$"].join(""), "i") }, {
            'name': 1,
            'parentId': 1,
            'username': 1,
            '_id': 1,
            'formPermissions': 1,
            'permissions': 1,
            'phone': 1,
            'formulirNumber': 1,
            'profile_picture': 1,
            'email': 1,
            'language': 1,
            'theme': 1,
            'is_active': 1,
            'defaultCommission': 1,
            'commissionType': 1,
            'balance': 1,
            'role': 1,
            'clickableNumbers': 1,
            'showMyAddress': 1,
            'isReservedBalance': 1,
            'isTagged': 1,
            'isVerifiedEmail': 1,
            'isVerifiedPhone': 1,
            'documentStatus': 1,
            'canDrop': 1,
            'lastmileRole': 1,
            "password": 1,
            "role_id": 1,
            "subuserRole": 1
        }).then(result => {
            if (!result) {
                res.status(400).json({
                    success: false,
                    message: 'User not found. Please try again',
                    err
                })
            }
            if (result && result[0] && result[0].password === undefined) {
                res.status(500).json({
                    success: false,
                    message: 'You haven\'t confirmed your account, please check your email',
                    err
                })
            }
            bcrypt.compare(req.body.password, result[0].password).then(bcryptRes => {
                if (bcryptRes) {
                    User.get({ _id: result[0]._id, is_active: true }).then(async active_user => {
                        if (active_user.length > 0) {
                            var token = jwt.sign({
                                userId: result[0]._id,
                                email: result[0].email,
                                role: result[0].role,
                                subuserRole: result[0].subuserRole,
                            }, config.jwtKey, { expiresIn: expiresIn })
                            var params = {
                                selector: { email: new RegExp(["^", req.body.email, "$"].join(""), "i") },
                                data: { last_login: Date.now() }
                            }

                            if ((result[0].username == undefined || result[0].username == '') && req.body.username != undefined && req.body.username != '') {
                                params.data.username = req.body.username
                                params.data.emails = [{ name: result[0].name, email: result[0].email, isActive: true, status: "Main_User" }]
                            }
                            let rules = {}
                            if (result[0].role_id) {
                                let [role] = await Role.get({ _id: new mongoose.mongo.ObjectId(result[0].role_id) })
                                if (role) {
                                    rules = role.rules
                                }
                            }
                            if (result[0].parentId) {
                                let parentData = []
                                parentData = await User.get({ _id: result[0].parentId, is_active: true })
                                // result[0].bankTransferDefault = []
                                result[0].username = parentData[0].username
                                // params.data.username = parentData[0].username
                            }
                            if (!result[0].isFormulirUser) {
                                params.data.isFormulirUser = true;
                            }
                            User.update(params).then(async login_saved => {
                                console.log(login_saved);
                                module.exports.addAuthorization(result[0]._id, result[0].email, req, token)
                                if (result[0].lastmileRole == 'account') {
                                    let params = {
                                        user_id: result[0]._id,
                                        title: 'Login',
                                        start: new Date(),
                                        type: 'login',
                                        branch: result[0].branch,
                                    }
                                }

                                let [aff] = await AffiliateMember.get({ user_id: result[0]._id });
                                let formPermissions = result[0].formPermissions;

                                if (aff && formPermissions) {
                                    formPermissions["showAffiliateMenu"] = true
                                }

                                if (result[0].role == "admin") {
                                    formPermissions = undefined
                                }

                                // let baseUrl = (req.headers.origin && req.headers.origin.includes("dev-form-front.mengantar.com")) || (req.headers.host && req.headers.host.includes("dev-form-front.mengantar.com"))  ? ('https://dev-form-front-id.mengantar.com/').replace('https://', '').replace('http://', ''): config.baseURL.replace('https://', '').replace('http://', '')
                                //Added check for designer urls to respond with its checkout url
                                res.json({
                                    id: result[0]._id,
                                    name: result[0].name,
                                    config: { baseUrl: config.baseURL.replace('https://', '').replace('http://', '') },
                                    username: result[0].username,
                                    email: result[0].email,
                                    role_id: result[0].role_id,
                                    parentId: result[0].parentId,
                                    access: rules,
                                    discount: result[0].discount + result[0].discountRate,
                                    phone: result[0].phone,
                                    language: result[0].language ? result[0].language : 'en',
                                    theme: result[0].theme ? result[0].theme : 'light',
                                    role: result[0].role,
                                    canDrop: result[0].canDrop,
                                    formPermissions: formPermissions,
                                    is_active: result[0].is_active,
                                    balance: result[0].balance,
                                    subuserRole: result[0].subuserRole,
                                    lastmileRole: result[0].lastmileRole,
                                    branch: result[0].branch,
                                    region: result[0].region,
                                    whenPickup: result[0].whenPickup,
                                    emails: result[0].emails,
                                    telegramIds: result[0].telegramIds,
                                    whenDelivered: result[0].whenDelivered,
                                    whenAttention: result[0].whenAttention,
                                    whenAction: result[0].whenAction,
                                    telegramId: result[0].telegramId,
                                    telegramNotification: result[0].telegramNotification,
                                    bankTransferDefault: result[0].bankTransferDefault,
                                    autoWithdraw: result[0].autoWithdraw,
                                    autoWithdrawData: result[0].autoWithdrawData,
                                    autoWithdrawAdminDisabled: result[0].autoWithdrawAdminDisabled ? result[0].autoWithdrawAdminDisabled : 0,
                                    documentStatus: result[0].documentStatus,
                                    isReservedBalance: result[0].isReservedBalance,
                                    isTagged: result[0].isTagged,
                                    defaultCommission: result[0].defaultCommission,
                                    commissionType: result[0].commissionType,
                                    token,
                                    success: true
                                })
                            }).catch(err => {
                                console.log('err', err)
                                res.status(500).json({
                                    success: false,
                                    message: 'something is wrong',
                                    err
                                })
                            })
                        } else {
                            res.status(400).json({
                                success: false,
                                message: 'Account is inactive'
                            })
                        }
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Email or Password is not correct. Please try again'
                    })
                }
            })
        }).catch(err => {
            console.log('error', err)
            res.status(400).json({
                success: false,
                message: 'Email or Password is not correct. Please try again',
                err
            })
        })
    },
    signinAsUser: async (req, res) => {
        let [currentUser] = await User.get({ _id: res.locals.auth.id })
        if (currentUser.role.includes('admin')) {
            let [user] = await User.get({ _id: req.body.id }, {
                'name': 1,
                'parentId': 1,
                'username': 1,
                '_id': 1,
                'formPermissions': 1,
                'permissions': 1,
                'phone': 1,
                'formulirNumber': 1,
                'profile_picture': 1,
                'email': 1,
                'language': 1,
                'theme': 1,
                'is_active': 1,
                'defaultCommission': 1,
                'commissionType': 1,
                'balance': 1,
                'role': 1,
                'clickableNumbers': 1,
                'showMyAddress': 1,
                'isReservedBalance': 1,
                'isTagged': 1,
                'isVerifiedEmail': 1,
                'isVerifiedPhone': 1,
                'documentStatus': 1,
                'canDrop': 1,
                'lastmileRole': 1,
                "password": 1,
                "role_id": 1,
                "subuserRole": 1
            })
            var token = jwt.sign({
                userId: user._id,
                email: user.email,
                role: user.role
            }, config.jwtKey, { expiresIn: 60 * 60 * 24 * 7 });
            if (user) {
                await module.exports.addAuthorization(user._id, user.email, req, token)
                let [aff] = await AffiliateMember.get({ user_id: user._id });
                let formPermissions = user.formPermissions;
                if (aff && formPermissions) {
                    formPermissions["showAffiliateMenu"] = true
                }

                if (user.role == "admin") {
                    formPermissions = undefined
                }

                res.json({
                    id: user._id,
                    name: user.name,
                    config: { baseUrl: config.baseURL.replace('https://', '').replace('http://', '') },
                    username: user.username,
                    email: user.email,
                    role_id: user.role_id,
                    parentId: user.parentId,
                    discount: user.discount + user.discountRate,
                    phone: user.phone,
                    language: user.language ? user.language : 'en',
                    theme: user.theme ? user.theme : 'light',
                    role: user.role,
                    canDrop: user.canDrop,
                    formPermissions: formPermissions,
                    is_active: user.is_active,
                    balance: user.balance,
                    lastmileRole: user.lastmileRole,
                    branch: user.branch,
                    region: user.region,
                    whenPickup: user.whenPickup,
                    emails: user.emails,
                    telegramIds: user.telegramIds,
                    whenDelivered: user.whenDelivered,
                    whenAttention: user.whenAttention,
                    whenAction: user.whenAction,
                    telegramId: user.telegramId,
                    telegramNotification: user.telegramNotification,
                    bankTransferDefault: user.bankTransferDefault,
                    autoWithdraw: user.autoWithdraw,
                    autoWithdrawData: user.autoWithdrawData,
                    autoWithdrawAdminDisabled: user.autoWithdrawAdminDisabled ? user.autoWithdrawAdminDisabled : 0,
                    documentStatus: user.documentStatus,
                    isReservedBalance: user.isReservedBalance,
                    isTagged: user.isTagged,
                    defaultCommission: user.defaultCommission,
                    commissionType: user.commissionType,
                    token,
                    success: true
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'user not found',
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'this available only for admin',
            })
        }
    },
    checkEmail: (req, res) => {
        User.get({ email: req.params.email }).then(res_valid => {
            if (res_valid.length != 0) {
                return res.json({
                    success: true,
                    message: "Email exists"
                })
            } else {
                return res.json({
                    success: false,
                    message: "Email not Found"
                })
            }
        })
    },
    checkUsername: (req, res) => {
        User.get({ username: req.params.username }).then(res_valid => {
            if (res_valid.length != 0) {
                return res.json({
                    success: true
                })
            } else {
                return res.json({
                    success: false
                })
            }
        })
    },
    signup: async (req, res) => {
        try {
            var password = bcrypt.hashSync(req.body.password, 10)
            var params = {
                password,
                firstname: req.body.firstname,
                surname: req.body.surname,
                dob: req.body.dob,
                gender: req.body.gender,
                maritalStatus: req.body.maritalStatus,
                unmarriedReason: req.body.unmarriedReason,
                phone: req.body.phone,
                otp: req.body.otp,
                status: req.body.status,
                denomination: req.body.denomination,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                pincode: req.body.pincode,
                height: req.body.height,
                weight: req.body.weight,
                bodyType: req.body.bodyType,
                complexion: req.body.complexion,
                eatingHabits: req.body.eatingHabits,
                drink: req.body.drink,
                smoke: req.body.smoke,
                education: req.body.education,
                specialization: req.body.specialization,
                bloodGroup: req.body.bloodGroup,
                jobLocation: req.body.jobLocation,
                annualIncome: req.body.annualIncome,
                designation: req.body.designation,
                motherTongue: req.body.motherTongue,
                language: req.body.language,
                disability: req.body.disability,
                preferredProfilesState: req.body.preferredProfilesState,

                fatherName: req.body.fatherName,
                fatherOccupation: req.body.fatherOccupation,
                motherName: req.body.motherName,
                motherOccupation: req.body.motherOccupation,
                numberOfBrother: req.body.numberOfBrother,
                numberOfSister: req.body.numberOfSister,
                parentContact: req.body.parentContact,

                churchName: req.body.churchName,
                churchPriest: req.body.churchPriest,
                pastorsContact: req.body.pastorsContact,
                churchAddress: req.body.churchAddress,
                yearOfBaptism: req.body.yearOfBaptism,
                ministry: req.body.ministry,

                selfDescription: req.body.selfDescription,
                partnersExpectations: req.body.partnersExpectations
            }
            const errors = validationResult(req).array({ onlyFirstError: true })
            if (errors.length != 0) {
                return res.status(400).json({
                    success: false,
                    errors
                })
            }
            User.get({ phone: req.body.phone }).then(res_valid => {
                if (res_valid.length != 0) {
                    return res.status(400).json({
                        success: false,
                        errors: [{
                            "msg": "Number already exist",
                            "param": "Number"
                        }]
                    })
                }
            })
            User.add(params).then(async (result) => {
                var token = jwt.sign({
                    userId: result._id,
                    phone: result.phone,
                    role: result.role
                }, config.jwtKey)

                EmailModule.mailgunSendEmail({
                    email_to: result.email,
                    text: `Halo,

Terima kasih telah mendaftar dan ingin mencoba Mengantar.com,
kamu bisa langsung login ke app.mengantar.com dan mulai melakukan pengiriman.

Jika ada kendala, jangan sungkan untuk langsung menghubungi kita.
Kamu bisa chat dengan kita setelah login ke dashboard.

Tim support kita tersedia pada pukul 8:00 - 20:00 WIB, di hari Senin - Sabtu.

Selamat bergabung dengan Mengantar!`,
                    subject: 'Selamat Datang di Mengantar'
                })

                //server side tracking
                let domain = req.body.domain ? req.body.domain : undefined;
                if (domain) {
                    if (domain && domain.includes(req.headers.host)) {
                        domain = req.headers.host;
                    }
                    let trackingData = await Tracking.get({ domain });
                    trackingData.forEach(async elem => {
                        if (elem && elem.triggerCondition == "CompleteRegistration") {
                            let { accessToken, pixelId, eventName, eventValue, type, testEventCode } = elem
                            track[type + 'AddEvent'](accessToken, pixelId, eventName, eventValue, domain, result, testEventCode)
                        }
                    })
                }

                //tracking for formulir
                let ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.socket.localAddress ? req.socket.localAddress :
                    req.socket.remoteAddress;
                let agent = req.headers['user-agent'];
                track['FacebookAddEvent'](config.pixeltoken, config.pixelid, "CompleteRegistration", undefined, domain, {
                    customerEmail: result.email,
                    customerPhone: result.phone, metadata: { ip, 'user-agent': agent }
                });

                return res.json({
                    success: true,
                    token,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    c: 'user registered successfully'
                })

            })
        } catch (error) {
            console.log('error', error)
        }
    },
    sendRecoveryEmail: async (req, res) => {
        let email = req.body.email;
        let THIRDTEEN_MINUTES = new Date().getTime() + 1800000;
        try {
            let [getUser] = await User.get({ email: new RegExp(["^", email, "$"].join(""), "i") })
            if (!getUser) {
                throw 'user with that email is not found'
            }
            let generate = md5(THIRDTEEN_MINUTES)
            User.update({
                selector: { _id: getUser._id },
                data: {
                    forgot_password: {
                        code: generate,
                        expiredAt: new Date(THIRDTEEN_MINUTES)
                    }
                }
            });
            let pwResetLink = `http://${req.headers.host}/reset-password/${generate}`
            EmailModule.mailgunSendEmail({
                email_to: email,
                text: `<div><p>Dear ${email},</p><p>A Reset password request has been received from this email id on Formulir. If you did not make any change-password request, please ignore this mail, and make sure you secure your account by changing your password any time soon.</p><p>To reset you Password, please click on the link below...</p><p>${pwResetLink}</p><p>Best Wishes,<br>Formulir</p></div>`,
                subject: 'Reset Password request for Formulir',
                isHtml: true,
            })
            res.status(200).json({
                success: true,
                data: 'Recovery email sent'
            })
        } catch (error) {
            console.log('eerr', error)
            res.status(500).json({
                success: false,
                error
            })
        }
    },
    checkRecoveryCode: async (req, res) => {
        let code = req.body.code;
        try {
            let [getUser] = await User.get({ 'forgot_password.code': code });
            if (!getUser) {
                throw 'Recovery code not found'
            }
            if (new Date().getTime() > new Date(getUser.forgot_password.expiredAt).getTime()) {
                throw 'Recovery code has been expired'
            }
            res.status(200).json({
                success: true,
                data: 'Code is OK'
            })
        } catch (error) {
            console.log('eerr', error)
            res.status(500).json({
                success: false,
                error
            })
        }
    },
    changePassword: async (req, res) => {
        try {
            let [getUser] = await User.get({ 'forgot_password.code': req.body.code });
            if (!getUser) {
                throw 'Recovery code not found'
            }
            if (new Date().getTime() > new Date(getUser.forgot_password.expiredAt).getTime()) {
                throw 'Recovery code has been expired'
            }
            var password = bcrypt.hashSync(req.body.password, 10)
            await User.update({
                selector: { 'forgot_password.code': req.body.code },
                data: {
                    'forgot_password.code': null,
                    password: password
                }
            });
            res.status(200).json({
                success: true,
                data: 'Password successfully changed'
            })
        } catch (error) {
            console.log('eerr', error)
            res.status(500).json({
                success: false,
                error
            })
        }
    },
    generateCodeForRegister: async (req, res) => {
        try {

            const name = req.body.name;
            const verificationType = req.body.verificationType;
            const language = req.body.language;
            const newCode = req.body.newCode;
            const email = req.body.email;
            const userPhone = req.body.phone;
            const previousRegisterId = req.body.registerId;

            const min = Math.ceil(100000);
            const max = Math.floor(999999);
            const code = Math.floor(Math.random() * (max - min + 1)) + min;

            const sentTo = verificationType == 'email' ? email : userPhone

            let registerId = null;
            let hash;

            if (verificationType == 'email') {
                hash = email

            }
            else {
                hash = userPhone
            }

            registerId = md5(hash + Date.now());
            const [oldRequest] = await ConfirmRequests.get({
                sentTo,
                verificationType,
                isClosed: false,
                isExpired: false,
            })
            if (oldRequest && (new Date(oldRequest.createdAt).getTime() + 60 * 1000 > Date.now())) {
                return res.json({
                    success: false,
                    message: 'You`ve already requested new code some time ago, please wait.'
                })
            }
            if (newCode) {
                ConfirmRequests.update({
                    selector: {
                        verificationType,
                        sentTo,
                        isClosed: false,
                        isExpired: false,
                    },
                    data: {
                        isExpired: true,
                    }
                })
            }

            if (verificationType == 'email') {
                EmailModule.mailgunSendEmail({
                    email_to: email,
                    text: `<div style="display: flex; flex-direction: row; align-items: center;">
                    <div style="color: black !important;display: flex; height: 100%; align-items: center !important;">
                    Hello, ${name} , here is your verification code:</div> 
                    <div style="font-weight: 600; margin-left: 5px; font-size: 16px"> ${code} </div>
                    </div>`,
                    subject: 'Mengantar Account Verification',
                    isHtml: true,
                })
            }
            else {
                let phone;
                if (userPhone.includes('+380')) {
                    phone = userPhone
                }
                else {
                    phone = convertPhone(userPhone);
                }
                await QontakController.sendOTPCode(phone, name, code, 'en')
            }

            await ConfirmRequests.add({
                registerId,
                verificationType,
                sentTo,
                code
            })

            return res.status(200).json({
                success: true,
                data: {
                    registerId,
                }
            })
        }
        catch (e) {
            console.log('Send code on register Error', e.response)
            const dataMessages = e && e.response && e.response.data && e.response.data.error ? e.response.data.error.messages : "";
            return res.json({
                success: false,
                data: {
                    isNotValidNumber: !!dataMessages.find(message => message.includes('Not valid to_number')),
                    registerId: null,
                }
            })
        }
    },
    verifyAccountRegister: async (req, res) => {
        const params = {
            code: req.body.code,
            registerId: req.body.registerId,
            verificationType: req.body.verificationType,
            isClosed: false,
            isExpired: false,
        }
        const [verifyRequest] = await ConfirmRequests.get(params)
        if (verifyRequest) {
            await ConfirmRequests.update({ selector: { _id: verifyRequest._id }, data: { isClosed: true } });

            return res.status(200).json({
                success: true,
                data: {
                    isVerified: true,
                }
            })
        }
        else {
            return res.status(200).json({
                success: true,
                data: {
                    isVerified: false,
                }
            })
        }
    },
    verifyGoogleCaptcha: async (req, res) => {
        try {

            const sceretKey = config.googleCaptchaSecret
            var params = {
                secret: sceretKey,
                response: req.body.response
            }
            var configParams = {
                method: 'post',
                url: `https://hcaptcha.com/siteverify`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify(params)
            };

            let result = await axios(configParams)
            return res.status(200).json({
                success: true,
                data: result.data
            })
        }
        catch (e) {
            return res.json({
                success: false,
                data: 'captcha verification error'
            })
        }
    },
    trackFacebook: async (req, res) => {
        try {
            let { eventName, userdata, fbp, fbc } = req.body;
            let domain = req.headers.referer ? req.headers.referer : req.headers.host;
            let ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.socket.localAddress ? req.socket.localAddress :
                req.socket.remoteAddress;
            let agent = req.headers['user-agent'];
            track['FacebookAddEvent'](config.pixeltoken, config.pixelid, eventName, undefined, domain, { metadata: { ip, 'user-agent': agent }, data: userdata, fbp, fbc });
            return res.status(200).json({
                success: true
            })
        } catch (err) {
            console.log(error, "error");
        }
    }
}