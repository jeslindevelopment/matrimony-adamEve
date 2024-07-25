const { Schema, model } = require('mongoose'),
    User = model('User', require('./../usersSchema'))
const subscription = new Schema({
    name: String,
    fee: Number,
    validity: String,
    freeContacts: String,
    profileType: String,
    contactAllowed: Number,
    photosAllowed: Number
}, {
    collection: 'subscription',
    timestamps: true
})

subscription.index({ user_id: 1, token: 1 }, { unique: true })
module.exports = subscription