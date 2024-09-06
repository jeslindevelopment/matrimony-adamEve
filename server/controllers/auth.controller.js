const User = require('../models/mongodb/users')
const Role = require('../models/mongodb/role')
const Subscription = require('../models/mongodb/subscription')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Authorization = require('../models/mongodb/authorization')
const config = require('../config')
const { check, validationResult } = require('express-validator')
const md5 = require('md5')
const qs = require('qs')
const axios = require('axios');
const mongoose = require('mongoose');
const EmailModule = require('./email.controller');
const contact = require('../models/mongodb/contact')
const messages = require('../global/messages')
const subscription = require('../models/mongodb/subscription')

module.exports = {
    validate: () => {
        return [
            check('firstname', 'Firstname is required').not().isEmpty(),
            check('surname', 'Surname is required').not().isEmpty(),
            check('dob', 'Date of birth is required').not().isEmpty(),
            check('gender', 'Gender is required').not().isEmpty(),
            check('password', 'password name is required').not().isEmpty(),
            check('phone', 'Phone is required').not().isEmpty(),
            check('denomination', 'Denomination is required').not().isEmpty()
        ]
    },
    logout: async (req, res) => {
        // #swagger.tags = ['Auth']
        // #swagger.description = 'Logout a user'
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
        // #swagger.tags = ['Auth']
        // #swagger.description = 'Sign in a user'
        if (req.body.phone == '' || req.body.password == '') {
            return res.status(500).json({
                success: false,
                message: messages.PHONE_PASSWORD_INCORRECT
            })
        }

        User.get({ phone: { "$regex": req.body.phone, "$options": "i" } }, {
            _id: 1,
            password: 1,
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
            partnersExpectations: 1,
            role: 1,
            
            subscriptionID: 1,
            subscriptionPlan: 1,
            subscriptionDate: 1
        }).then(result => {
            if (!result) {
                res.status(400).json({
                    success: false,
                    message: messages.USER_NOT_FOUND,
                    err
                })
            }

            bcrypt.compare(req.body.password, result[0].password).then(bcryptRes => {
                if (bcryptRes) {
                    User.get({ _id: result[0]._id }).then(async active_user => {
                        // User.get({ _id: result[0]._id, staus: "Pending" }).then(async active_user => {
                        if (active_user.length > 0) {
                            var token = jwt.sign({
                                userId: result[0]._id,
                                email: result[0].email,
                                role: result[0].role || 'user',
                                subuserRole: result[0].subuserRole,
                            }, config.jwtKey, { expiresIn: 60 * 60 * 24 * 7 })
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
                                module.exports.addAuthorization(result[0]._id, result[0].email, req, token)

                                let subscription = await Subscription.get({ _id: result[0].subscriptionID })

                                res.json({
                                    id: result[0]._id,
                                    role: result[0].role,
                                    firstname: result[0]?.firstname,
                                    surname: result[0]?.surname,
                                    dob: result[0]?.dob,
                                    gender: result[0]?.gender,
                                    maritalStatus: result[0]?.maritalStatus,
                                    unmarriedReason: result[0]?.unmarriedReason,
                                    phone: result[0]?.phone,
                                    otp: result[0]?.otp,
                                    status: result[0]?.status,
                                    denomination: result[0]?.denomination,
                                    city: result[0]?.city,
                                    state: result[0]?.state,
                                    country: result[0]?.country,
                                    pincode: result[0]?.pincode,
                                    height: result[0]?.height,
                                    weight: result[0]?.weight,
                                    bodyType: result[0]?.bodyType,
                                    complexion: result[0]?.complexion,
                                    eatingHabits: result[0]?.eatingHabits,
                                    drink: result[0]?.drink,
                                    smoke: result[0]?.smoke,
                                    education: result[0]?.education,
                                    specialization: result[0]?.specialization,
                                    bloodGroup: result[0]?.bloodGroup,
                                    jobLocation: result[0]?.jobLocation,
                                    annualIncome: result[0]?.annualIncome,
                                    designation: result[0]?.designation,
                                    motherTongue: result[0]?.motherTongue,
                                    language: result[0]?.language,
                                    disability: result[0]?.disability,
                                    preferredProfilesState: result[0]?.preferredProfilesState,

                                    fatherName: result[0]?.fatherName,
                                    fatherOccupation: result[0]?.fatherOccupation,
                                    motherName: result[0]?.motherName,
                                    motherOccupation: result[0]?.motherOccupation,
                                    numberOfBrother: result[0]?.numberOfBrother,
                                    numberOfSister: result[0]?.numberOfSister,
                                    parentContact: result[0]?.parentContact,

                                    churchName: result[0]?.churchName,
                                    churchPriest: result[0]?.churchPriest,
                                    pastorsContact: result[0]?.pastorsContact,
                                    churchAddress: result[0]?.churchAddress,
                                    yearOfBaptism: result[0]?.yearOfBaptism,
                                    ministry: result[0]?.ministry,

                                    selfDescription: result[0]?.selfDescription,
                                    partnersExpectations: result[0]?.partnersExpectations,

                                    subscriptionID: result[0]?.subscriptionID,
                                    subscriptionPlan: result[0]?.subscriptionPlan,
                                    subscriptionDate: result[0]?.subscriptionDate,

                                    subscription,
                                    token,
                                    success: true
                                })
                            }).catch(err => {
                                res.status(500).json({
                                    success: false,
                                    message: messages.UNEXPECTED_ERROR,
                                    err
                                })
                            })
                        } else {
                            res.status(400).json({
                                success: false,
                                message: messages.USER_NOT_ACTIVE
                            })
                        }
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: messages.PHONE_PASSWORD_INCORRECT
                    })
                }
            })
        }).catch(err => {
            res.status(400).json({
                success: false,
                message: messages.PHONE_PASSWORD_INCORRECT,
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
                    message: messages.USER_NOT_FOUND,
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: messages.USER_UNAUTHORIZED,
            })
        }
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
        // #swagger.tags = ['Auth']
        // #swagger.description = 'Register a user'
        try {
            if (!req.body.firstname || !req.body.surname || !req.body.dob || !req.body.gender || !req.body.maritalStatus || !req.body.phone || !req.body.denomination) {
                return res.status(400).json({
                    success: false,
                    message: messages.REQUIRED_FIELDS_MISSING
                })
            }
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
                            "msg": messages.NUMBER_EXIST,
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

                return res.json({
                    success: true,
                    token,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    message: messages.USER_REGISTERED
                })
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error on signup',
                error
            })
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
    getSubscriptionPlan: async (req, res) => {
        // #swagger.tags = ['Subscription']
        // #swagger.description = 'Get subscription plan'
        try {
            let plans = await Subscription.getPages({ name: { $ne: "Free" } });
            res.status(200).json({
                success: true,
                data: plans,
            })
        } catch (error) {
            return res.json({
                success: false,
                data: error
            })
        }
    }
}