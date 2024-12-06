const tgBotService = require('../../service/tgbot.service')


class TgController {

    async getInvoiceLink(req, res) {
        let result = await tgBotService.upgradeToPro()
        if (result) {
            res.json({success:true, data:result})
        }
        else {
            res.json({success:false, message: `Can't get invoice link: ${result}`})
        }
    }

}

module.exports = new TgController()