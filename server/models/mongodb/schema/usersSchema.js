const { Schema, isObjectIdOrHexString } = require('mongoose');

const User = new Schema({
    role: { type: String, default: "user" },
    password: String,
    firstname: String,
    surname: String,
    dob: Date,
    gender: String,
    maritalStatus: String,
    unmarriedReason: String,
    subscriptionID: { type: Schema.Types.ObjectId, ref: 'Subscription' },
    subscriptionPlan: { type: String },
    subscriptionDate: { type: String },
    subscriptionEndDate: { type: String },
    phone: { type: String, unique: true, required: true, dropDups: true },
    otp: String,
    status: { type: String },
    denomination: String,
    city: String,
    occupation: String,
    state: String,
    country: String,
    pincode: Number,
    height: Number,
    weight: Number,
    bodyType: String,
    complexion: String,
    eatingHabits: String,
    drink: String,
    smoke: Boolean,
    education: String,
    specialization: String,
    bloodGroup: String,
    jobLocation: String,
    annualIncome: String,
    designation: String,
    motherTongue: String,
    language: String,
    disability: String,
    preferredProfilesState: String,
    profileImages: [String],

    fatherName: String,
    fatherOccupation: String,
    motherName: String,
    motherOccupation: String,
    numberOfBrother: Number,
    numberOfSister: Number,
    parentContact: Number,

    churchName: String,
    churchPriest: String,
    pastorsContact: Number,
    churchAddress: String,
    yearOfBaptism: String,
    ministry: String,

    selfDescription: String,
    partnersExpectations: String,

    freeContactsCount: Number,
    contactCount: Number,
    photosCount: Number,
}, {
    collection: 'users',
    timestamps: true
})


User.index({ username: 1, })
User.index({ role: 1, })

module.exports = User
