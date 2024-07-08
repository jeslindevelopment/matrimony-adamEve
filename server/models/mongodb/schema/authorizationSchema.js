const { Schema, model } = require('mongoose'),
User = model('User', require('./../usersSchema'))
const activity = new Schema({
    user_id:  {type: Schema.Types.ObjectId, ref: 'User'},
    email:  String,
    userAgent: String,
    token: String,
    adminAccess: Boolean,
}, {
    collection: 'authorization',
    timestamps: true
})

activity.index({  user_id: 1, token: 1 }, {unique: true})
module.exports = activity