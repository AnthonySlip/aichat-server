const {Schema, model} = require('mongoose')

const messageSchema = new Schema({
    userId: {type: String, required: true},
    role: {type: String, required: true},
    text: {type: String, required: true},
    chatId: {type: String, required: true}
})

module.exports = model('messageModel', messageSchema)