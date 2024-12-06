const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const tgbotService = require('./service/tgbot.service')
const tgRouter = require('./routes/tg.router')

app.use(express.json());
app.use(cors())

let start = async() => {
    await tgbotService.tgbotInit()

    app.listen(port, () => {
        console.log('server has been launched')
    })

    app.use('/tg', tgRouter)

}

start()