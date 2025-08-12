const {TicketRepository} = require('../repositories');
const { MAILER } = require('../config');

const ticketRepo = new TicketRepository();

async function sendEmail(mailFrom, mailTo, subject, text) {
    try {
        const response = await MAILER.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    sendEmail,
}