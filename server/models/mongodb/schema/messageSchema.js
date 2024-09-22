const { Schema, model } = require('mongoose')

const message = new Schema({
    sendUserId: { type: Schema.Types.ObjectId, required: true },
    receiveUserId: { type: Schema.Types.ObjectId, required: true },
    receivedDate: Date,
    message: { type: Schema.Types.String, default: " " },
    status: { type: Schema.Types.String, enum: ["Unread", "Read"], default: "Unread" }
}, {
    collection: 'messages',
    timestamps: true
})

module.exports = message