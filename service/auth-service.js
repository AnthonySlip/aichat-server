const userModel = require('../model/user-model')
const {v4} = require('uuid')
const sha256 = require('crypto-js/sha256')
const tokenService = require('./token-service')
const verificationService = require('./verification-service')
const apiError = require('../error/apiError')

class authService {
    async registration (name, email, password) {
        try {
            const candidate = await userModel.findOne({email})
            if (candidate) throw apiError.BadRequest('already exist')
            const verificationLink = process.env.API_URL + '/auth/verify/' + v4()

            const verificationCode = v4().substring(0, 5)
            const hashVerificationCode = await sha256(verificationCode).toString()
            const hashPassword = await sha256(password).toString()

            const user = await userModel.create({name, email, password: hashPassword, verificationCode: hashVerificationCode})

            const data = verificationService.sendVerificationMail(email, verificationCode)

            const payload = {
                "userId": user._id,
                "email": user.email,
                "isVerify": user.isVerify,
            }

            const tokens = tokenService.generateTokens(payload)
            await tokenService.saveToken(user._id, tokens.refreshToken)

            return {...tokens, data}
        } catch (err) {
            return err
        }
    }
    async verify (email, verificationCode) {
        try {
            const hashVerificationCode = await sha256(verificationCode).toString()
            const isUser = await userModel.findOne({email: email})
            if(isUser) {
                if (isUser.verificationCode === hashVerificationCode) {
                    isUser.isVerify = true
                    return isUser.save()
                }
                return 'A wrong code'
            }
            return `${email} doesn't exist`
        } catch (err) {
            return err
        }
    }
    async signIn (email, password) {
        try {
            const user = await userModel.findOne({email: email})
            if (!user) return `${email} doesn't exist`
            const hashPassword = await sha256(password).toString()

            if (user.password!==hashPassword) throw apiError.BadRequest('invalid login/password')

            const payload = {
                "userId": user._id,
                "email": user.email,
                "isVerify": user.isVerify,
            }
            const tokens = tokenService.generateTokens(payload)
            return tokenService.saveToken(user._id, tokens.refreshToken)
                .then(() => tokens)
        } catch (err) {
            return err
        }
    }
    async signOut (refreshToken) {
        try {
            const token = await tokenService.removeToken(refreshToken)
            return token
        } catch (err) {
            return err
        }
    }
    async refresh (refreshToken) {
        if (!refreshToken) throw apiError.Unauthorized('Invalid refresh token')
        const isValid = tokenService.validateRefreshToken(refreshToken)
        const isTokenFromDB = await tokenService.findToken(refreshToken)
        if (!isValid || !isTokenFromDB) throw apiError.Unauthorized('Invalid refresh token')

        const user = await userModel.findById(isValid.userId)
        if (!user) throw apiError.NotFound('Not found user')
        const payload = {
            "userId": user._id,
            "email": user.email,
            "isVerify": user.isVerify,
        }

        const tokens = tokenService.generateTokens(payload)
        if (!tokens) throw apiError.BadRequest('No tokens')
        await tokenService.saveToken(user._id, tokens?.refreshToken)
        return {...tokens}
    }
    async getUserData(email) {
        const user = await userModel.findOne({email: email})
        if (!user) throw apiError.NotFound('No such user')
        return user
    }
    async updateName (name, id) {
        const user = await userModel.findById(id)
        if (!user) throw apiError.NotFound('No such user')
        user.name = name
        return user.save()
    }
    async updateEmail (email, id) {
        const user = await userModel.findById(id)
        if (!user) throw apiError.NotFound('No such user')
        user.email = email
        return user.save()
    }
    async updatePassword (oldPassword, newPassword, id) {
        const user = await userModel.findById(id)
        if (!user) throw apiError.NotFound('No such user')

        const hashOldPassword = await sha256(oldPassword).toString()
        if (user.password!==hashOldPassword) return apiError.BadRequest('Invalid old password')

        const hashNewPassword = await sha256(newPassword).toString()
        user.password = hashNewPassword
        return user.save()
    }
}
module.exports = new authService()
