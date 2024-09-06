const { Schema, model } = require('mongoose')

const message = new Schema({
    sendUserId: { type: Schema.Types.ObjectId, unique: true, required: true, dropDups: true },
    receiveUserId: { type: Schema.Types.ObjectId, unique: true, required: true, dropDups: true },
    receivedDate: Date,
    message: { type: Schema.Types.String, default: " " },
    status: { type: Schema.Types.String, enum: ["Unread", "Read"], default: "Unread" }
}, {
    collection: 'messages',
    timestamps: true
})

module.exports = message