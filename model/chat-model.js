const {Schema, model} = require('mongoose')

const chatSchema = new Schema({
    chatId: {type: String, required: true, unique: true},
    userId: {type: String, required: true},
    title: {type: String, required: true},
    messages: {type: Number, default: 0}
})

module.exports = model('chatModel', chatSchema)