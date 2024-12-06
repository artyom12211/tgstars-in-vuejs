const { Telegraf } = require("telegraf")
require('dotenv').config()


class TgbotService {
    bot=""
    async tgbotInit () {
        this.bot = new Telegraf(process.env.TG_TOKEN);
        this.bot.launch()
        console.log('bot Launched')
    }

    async upgradeToPro() {
        let titleText = "Some Title" 
        let descriptionText = "Some Description" 
        let payload = {userid:12345678}
        let providerToken = "" 
        let currency = "XTR"
        let prices = [{label:"Price Label", amount:1}]
        let obj = {title:titleText, description:descriptionText, payload:payload, provider_token:providerToken, currency:currency, prices:prices }
        let result = await this.bot.telegram.createInvoiceLink(obj)
        // console.log('result: ', result)
        return result
    }
}


module.exports = new TgbotService()