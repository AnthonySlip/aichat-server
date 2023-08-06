const jwt = require('jsonwebtoken')
const tokenModel = require('../model/token-model')
class tokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '60d'})
        return {accessToken, refreshToken}
    }
    async saveToken(userId, refreshToken) {
        const isToken = await tokenModel.findOne({user: userId})
        if(isToken) {
            isToken.refreshToken = refreshToken
            return isToken.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }
    async removeToken(refreshToken){
        const isToken = await tokenModel.deleteOne({refreshToken: refreshToken})
        return isToken
    }
    validateAccessToken(token) {
        try {
            const isValid = jwt.verify(token, process.env.JWT_ACCESS_KEY)
            return isValid
        } catch (err) {
            return null
        }
    }
    validateRefreshToken(token) {
        try {
            const isValid = jwt.verify(token, process.env.JWT_REFRESH_KEY)
            return isValid
        } catch (err) {
            return null
        }
    }
    async findToken(refreshToken) {
        const isToken = await tokenModel.findOne({refreshToken})
        return isToken
    }
}

module.exports = new tokenService()