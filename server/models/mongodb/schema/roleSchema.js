const { Schema, model } = require('mongoose')

const role = new Schema({
    name: String,
    rules: Object
}, {
    collection: 'roles',
    timestamps: true
})

module.exports = role