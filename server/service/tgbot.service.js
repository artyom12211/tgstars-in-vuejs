const { Telegraf } = require("telegraf")
const axios = require('axios');
require('dotenv').config()


class TgbotService {
    bot=""
    async tgbotInit () {
        this.bot = new Telegraf(process.env.TG_TOKEN);

        this.bot.on('pre_checkout_query', async ctx => {
            const query = ctx.update.pre_checkout_query;
            console.log('pre_checkout_query: ', query)

            const payload = JSON.parse(query.invoice_payload)
            
            const { subscription_period } = payload
            console.log('subscription_period: ', subscription_period)

            if (subscription_period) {
                switch(subscription_period) {
                    case 'yearly':
                        // Database actions
                        // userModel.activateSubscription(userid, subscription_period, DB)
                        await ctx.answerPreCheckoutQuery(true)
                        break
                    case 'monthly':
                        // Database actions
                        // userModel.activateSubscription(userid, subscription_period, DB)
                        await ctx.answerPreCheckoutQuery(true)
                        break
                }
            }
            else {
                await ctx.answerPreCheckoutQuery(false, 'Выбран несуществующий период подписки')
            }
        })

        this.bot.on('successful_payment', async ctx => {
            ctx.reply('Вы получили Pro версию')
            const userID = ctx.update.message.from.id
            const paymentChargeID = ctx.update.message?.successful_payment.telegram_payment_charge_id
            console.log('successful_payment: ', ctx.update.message?.successful_payment)
            console.log('payment_charge_id: ', paymentChargeID)
            try {
                const isRefunded = await this.refundStarPayment(userID, paymentChargeID)
                console.log('is_refunded: ', isRefunded)
            }
            catch(err) {
                console.error("Can't refund on successful_payment: ", err)
            }
        })

        this.bot.launch()
        console.log('bot Launched')
    }

    async upgradeToPro() {
        let titleText = "Some Title" 
        let descriptionText = "Some Description" 
        let payload = {
            userid: 12345678,
            subscription_period: 'monthly' 
        }
        let providerToken = "" 
        let currency = "XTR"
        let prices = [{label:"Price Label", amount:1}]
        let obj = {title:titleText, description:descriptionText, payload:payload, provider_token:providerToken, currency:currency, prices:prices }
        let result = await this.bot.telegram.createInvoiceLink(obj)
        // console.log('result: ', result)
        return result
    }

    // Метод для вызова refundStarPayment
    async refundStarPayment(userId, telegramPaymentChargeId) {
        try {
            const response = await axios.post(
                `https://api.telegram.org/bot${process.env.TG_TOKEN}/refundStarPayment`,
                {
                    user_id: userId,
                    telegram_payment_charge_id: telegramPaymentChargeId,
                }
            );

            if (response.data.ok) {
                return response.data.result; // Возврат успешен
            } else {
                throw new Error(response.data.description); // Ошибка Telegram API
            }
        } catch (error) {
            console.error('Ошибка при возврате платежа:', error.message);
            throw error;
        }
    }
}


module.exports = new TgbotService()