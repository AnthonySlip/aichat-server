const Router = require('express').Router
const openaiRouter = new Router()
const openaiController = require('../controller/openai-controller')
const authMiddleware = require('../middlewares/auth-middleware')


openaiRouter.post('/generate/message', authMiddleware, openaiController.generateMessage)
openaiRouter.get('/generate/image', openaiController.generateImage)


module.exports = openaiRouter