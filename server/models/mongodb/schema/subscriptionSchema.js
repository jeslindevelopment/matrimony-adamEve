const { Schema, model } = require('mongoose')
const subscription = new Schema({
    name: String,
    fee: Number,
    validity: String,
    freeContacts: String,
    profileType: String,
    contactAllowed: String,
    photosAllowed: String
}, {
    collection: 'subscription',
    timestamps: true
})

module.exports = subscription