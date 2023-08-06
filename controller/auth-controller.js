const authService = require('../service/auth-service')
class authController {
    async registration (req, res, next) {
        try {
            const {name, email, password} = req.body
            const data = await authService.registration(name, email, password)
            res.cookie('refreshToken', data.refreshToken, {maxAge: 60*24*60*60*1000, httpOnly: true})
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
    async signIn (req, res, next) {
        try {
            const {email, password} = req.body
            const data = await authService.signIn(email, password)
            res.cookie('refreshToken', data.refreshToken, {maxAge: 60*24*60*60*1000, httpOnly: true})
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
    async signOut (req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await authService.signOut(refreshToken)
            res.clearCookie('refreshToken')
            return res.json('signOut')
        } catch (err) {
            next(err)
        }
    }
    async verify (req, res, next) {
        const {email, verificationCode} = req.body
        authService.verify(email, verificationCode)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }
    async refresh (req, res, next) {
        try {
            const { refreshToken } = req.cookies
            authService.refresh(refreshToken)
                .then(tokens => {
                    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 60*24*60*60*1000, httpOnly: true})
                    return res.json(tokens)
                })
                .catch(err => res.json(err))
        } catch (err) {
            next(err)
        }
    }
    async getUserData (req, res, next) {
        try {
            const {email} = req.body
            const userData = await authService.getUserData(email)
            if(!userData) return 'No such user'
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    async updateName (req, res, next) {
        try {
            const { newName, id } = req.body
            const data = await authService.updateName(newName, id)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
    async updateEmail (req, res, next) {
        try {
            const {newEmail, id} = req.body
            const data = await authService.updateEmail(newEmail, id)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
    async updatePassword (req, res, next) {
        try {
            const {oldPassword, newPassword, id} = req.body
            const data = await authService.updatePassword(oldPassword, newPassword, id)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new authController()