const { Schema } = require('mongoose');

const users = new Schema({
    name: String,
    username: String,
    phone: String,
    role_id: { type: Schema.Types.ObjectId, ref: 'Role' },
    profile_picture: String,
    email: { type: String, unique: true, required: true, dropDups: true },
    password: { type: String, select: false },
    status: String
}, {
    collection: 'users',
    timestamps: true
})


users.index({ username: 1, })
users.index({ role: 1, })

module.exports = users
