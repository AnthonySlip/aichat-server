const nodemailer = require('nodemailer')
const { google } = require('googleapis')
class verificationService{
    async sendVerificationMail (toEmail, verificationCode){
        const OAuth2 = google.auth.OAuth2
        const OAuth2Client = new OAuth2(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_CLIENT_SECRET)
        OAuth2Client.setCredentials({refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN})
        const accessToken = OAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'anthonywebdevoloper@gmail.com',
                clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
                clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const message = {
            from: 'AiChatVerify <anthonywebdevoloper@gmail.com>',
            to: toEmail,
            subject: 'Verify your account',
            html:
                `
                <div class="content">
                    <div class="header">
                        <h1>AiChat</h1>
                    </div>
                    <div class="main">
                        <h5>It is your verification code:</h5>
                        <h3>${verificationCode}</h3>
                    </div>
                    <div class="footer">
                        <h4>Thank you, have a nice day!</h4>
                    </div>
                </div>
                `
        }
        transport.sendMail(message, (err, info) => {
            if (err) return(err)
            return (info)
        })
    }
}

module.exports = new verificationService()