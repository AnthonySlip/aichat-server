const { Configuration, OpenAIApi } = require("openai");
class openaiService {
    async generateMessage(message) {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        })
        const openai = new OpenAIApi(configuration)
        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: message}],
        });
        return res?.data?.choices[0]?.message.content
        // return fetch('https://api.openai.com/v1/chat/completions', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         model: "gpt-3.5-turbo",
        //         messages: [{role: 'user', content: message}],
        //     })
        // })
        //     .then(res => res.json())
        //     .then(data => data.choices[0].message.content)
        //     .catch(err => err)
    }
    async generateImage () {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        })
        const openai = new OpenAIApi(configuration);
        const response = await openai.createImage({
            prompt: "Random",
            n: 2,
            size: "1024x1024",
        })
        return response.data.data[0].url
    }
}
module.exports = new openaiService()