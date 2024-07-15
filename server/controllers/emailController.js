const config = require('./../config');
const api_key = config.mailgun.APIKEY;
const DOMAIN = config.mailgun.domain;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });
const defaultFrom = config.mailgun.from;

module.exports = {
    mailgunSendEmail: ({
        email_from = false,
        email_to,
        subject = false,
        template = false,
        templateData = {},
        text = false,
        isHtml = false,
        email_from_name = 'Mengantar Form'
    }) => {
        let from = email_from ? `${email_from_name} <${email_from}>` : `${email_from_name} <${defaultFrom}>`;
        let subjectChg = subject ? subject : `Notification from Mengantar Form`;
        var data = {
            from,
            to: email_to,
            subject: subjectChg
        };
        if (template) {
            data.template = template
            data['h:X-Mailgun-Variables'] = JSON.stringify(templateData)
        }
        if (text) {
            if (isHtml) data.html = text
            else data.text = text
        }

        mailgun.messages().send(data, function (error, body) {
            console.log(body, error);
        });
    }
}