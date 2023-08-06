const Router = require('express').Router
const messageRouter = new Router()
const messageController = require('../controller/message-controller')
const authMiddleware = require('../middlewares/auth-middleware')


messageRouter.post('/history', authMiddleware, messageController.history)
messageRouter.post('/sendToDB', authMiddleware, messageController.sendToDB)
messageRouter.post('/deleteChat', authMiddleware, messageController.deleteChat)
messageRouter.post('/chats', authMiddleware, messageController.getChats)
messageRouter.post('/renameChat', authMiddleware, messageController.renameChat)

module.exports = messageRouter