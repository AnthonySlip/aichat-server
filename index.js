require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middlewares/errorHandler-middleware')
const router = require('./router/router')
const rateLimit = require('express-rate-limit')

const PORT = process.env.PORT || 5000
const app = express()

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 15, //  15 requests per
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 429
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'https://anthonyslip.github.io'
}))

app.use('/api', apiLimiter)
app.use('/api', router)
app.use(errorHandler)

try {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology:true})
        .then(() => console.log('DB connected'))
        .catch(err => console.log(err))
    app.listen(PORT, () => console.log(`Srv on ${PORT} port`))
} catch (err) {
    console.log(err)
}