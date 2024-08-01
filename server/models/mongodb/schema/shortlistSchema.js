const { Schema, model } = require('mongoose')

const shortlist = new Schema({
    userId: { type: Schema.Types.ObjectId, unique: true, required: true, dropDups: true },
    shortlistUserId: { type: Schema.Types.ObjectId, unique: true, required: true, dropDups: true },
    contacted: Boolean,
}, {
    collection: 'shortlists',
    timestamps: true
})

module.exports = shortlist