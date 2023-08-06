const Router = require('express').Router
const authRouter = new Router()
const authController = require('../controller/auth-controller')
const authMiddleware = require('../middlewares/auth-middleware')

authRouter.post('/registration', authController.registration)
authRouter.post('/signIn', authController.signIn)
authRouter.post('/signOut', authMiddleware, authController.signOut)
authRouter.post('/verify', authMiddleware, authController.verify)
authRouter.post('/user', authMiddleware, authController.getUserData)
authRouter.post('/update/name', authMiddleware, authController.updateName)
authRouter.post('/update/email', authMiddleware, authController.updateEmail)
authRouter.post('/update/password', authMiddleware, authController.updatePassword)


authRouter.get('/refresh', authController.refresh)


module.exports = authRouter