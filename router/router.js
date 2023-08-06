const Router = require('express')
const router = new Router()
const authRouter = require('./auth-router')
const messageRouter = require('./message-router')
const openaiRouter = require('./openai-router')

router.use('/openai', openaiRouter)
router.use('/auth', authRouter)
router.use('/message', messageRouter)

module.exports = router

