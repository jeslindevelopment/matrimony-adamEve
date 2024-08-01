const { Schema, model } = require('mongoose'),
    User = model('User', require('./usersSchema'))

const contact = new Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    status: { type: String, default: "Unread" },
}, {
    collection: 'contact',
    timestamps: true
})

module.exports = contact