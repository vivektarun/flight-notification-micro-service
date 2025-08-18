const { EmailService } = require('../services');

async function create(req, res) {
    try {
        const { subject, content, recepientEmail } = req.body;
        const response = await EmailService.createTicket({subject, content, recepientEmail});
        return res.status(201).json(response);
    } catch(error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    create
}