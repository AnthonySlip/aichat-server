const messageService = require('../service/message-service')
const {json} = require("express");
const apiError = require('../error/apiError')
class messageController {
    async history(req, res, next) {
        try {
            const {userId, chatId} = req.body
            if (!userId) return next(apiError.BadRequest('No such user'))
            const history = await messageService.history(userId, chatId)
            return res.json(history)
        } catch (err) {
            next(err)
        }
    }
    async sendToDB (req, res, next) {
        const {role, text, userId, chatId} = req.body

        if (!role || !text || !userId) return next(apiError.BadRequest('Empty any field'))

        messageService.sendToDB(role, text, userId, chatId)
            .then(info => res.json(info))
            .catch(err => next(err))
    }
    async deleteChat (req, res, next) {
        try {
            const { userId, chatId } = req.body
            if (!userId) return res.json('invalid user id')
            const data = await messageService.deleteChat(userId, chatId)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
    async getChats (req, res, next) {
        try {
            const { userId } = req.body
            const chats = await messageService.getChats(userId)
            return res.json(chats)
        } catch (err) {
            next(err)
        }
    }
    async renameChat (req, res, next) {
        try {
            const {userId, chatId, newName} = req.body
            if (!userId || !newName) return next(apiError.BadRequest('Empty any field'))
            messageService.renameChat(userId, chatId, newName)
                .then(data => res.json(data))
                .catch(err => res.json(err))
        } catch (err) {
            next(err)
        }
    }
}
module.exports = new messageController()