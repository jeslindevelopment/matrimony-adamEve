const { Schema, model } = require('mongoose')

const interest = new Schema({
    sendUserId: { type: Schema.Types.ObjectId, unique: true, required: true, dropDups: true },
    receiveUserId: { type: Schema.Types.ObjectId, unique: true, required: true, dropDups: true },
    receivedDate: Date,
}, {
    collection: 'interests',
    timestamps: true
})

module.exports = interest