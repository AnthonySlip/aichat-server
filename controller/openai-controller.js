const openaiService = require('../service/openai-service')
const messageService = require('../service/message-service')
class openaiController {
    async generateMessage(req, res, next) {
        try {
            const {message, userId, chatId} = req.body
            if (!message || !userId) return res.json('invalid request')
            return openaiService.generateMessage(message)
                .then(data => {
                    messageService.sendToDB('assistant', data, userId, chatId)
                        .then(() => res.json(data))
                        .catch(err => res.json(err))
                })
                .catch(err => res.json(err))
        } catch (err) {
            next(err)
        }
    }
    async generateImage (req, res, next) {
        try {
            const data = await openaiService.generateImage()
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
}
module.exports = new openaiController()