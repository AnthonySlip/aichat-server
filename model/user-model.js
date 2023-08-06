const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isVerify: {type: Boolean, default: false},
    verificationCode: {type: String},
})

module.exports = model('userModel', userSchema)