const userModel = require('../model/user-model')
const messageModel = require('../model/message-model')
const chatModel = require('../model/chat-model')
const apiError = require('../error/apiError')
class messageService {
    async history(userId, chatId) {
        try {
            const isId = await userModel.findById(userId)
            if (!isId) throw apiError.NotFound('No such user')
            const history = await messageModel.find({userId: userId, chatId: chatId})
            return history
        } catch (err) {
            return err
        }
    }

    async sendToDB (role, text, userId, chatId) {
        if (!role || !text || !userId) throw apiError.BadRequest()
        return messageModel.create({
            userId: userId,
            role: role,
            text: text,
            chatId: chatId
        })
            .then(() => {
                this.updateChat(chatId, userId, text)
                    .then(data => data)
            })
            .catch(err => err)
    }
    async deleter (arrayId) {
        let counter = 0
        arrayId.forEach(id => {
            messageModel.deleteMany({_id: id})
                .catch(err => err)
            counter = counter + 1
        })
        return counter
    }
    async deleteChat (userId, chatId) {
        const isId = await userModel.findById(userId)
        if (!isId) throw apiError.NotFound('No such user')
        const messages = await messageModel.find({userId: userId, chatId: chatId})
        await chatModel.deleteOne({chatId: chatId})
        if (!messages) throw apiError.NotFound('No such chat')
        const messagesId = []
        messages.forEach(item => messagesId.push(item._id))
        return this.deleter(messagesId)
            .then(data => {
                if (data===0) return 'chat already deleted'
                return `${data} deleted`
            })
            .catch(err => err)
    }
    async createChat (chatId, userId, text) {
        const title = text?.toString() || 'New Chat'
        return chatModel.create({
            chatId: chatId,
            userId: userId,
            title: title.length > 11? title.substring(0, 10)+'...' : title,
            messages: 1
        })
            .then(data => data)
            .catch(err => err)
    }
    async updateChat (chatId, userId, text) {
        const isChat = await chatModel.findOne({chatId: chatId, userId: userId})
        if (!isChat) return this.createChat(chatId, userId, text)
        return chatModel.findOneAndUpdate({chatId: chatId, userId: userId}, {$set:{messages: isChat.messages+1}})
            .then(data => data)
            .catch(err => err)
    }
    async getChats (userId) {
        const isUserId = await userModel.findById(userId)
        if (!isUserId) throw apiError.NotFound('No such user')
        const chat = await chatModel.find({userId: userId})
        if (!chat.length) throw apiError.NotFound('No such chat')
        return chat
    }
    async renameChat (userId, chatId, newName) {
        const isUserId = await userModel.findById(userId)
        if (!isUserId) throw apiError.NotFound('No such user')
        return chatModel.findOneAndUpdate({chatId: chatId, userId: userId}, {$set:{title: newName}})
            .then(data => data)
            .catch(err => err)
    }
}
module.exports = new messageService()