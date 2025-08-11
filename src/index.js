const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes'); // By default index.js in required.

const mailSender = require('./config/email-config');
const serverConfig = require('./config/server-config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.text());

app.get('/', (req, res) => {
    res.send("service is up");
});

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server running on http://localhost:${ServerConfig.PORT}`);
    try {
        const response = await mailSender.sendMail({
            from: serverConfig.GMAIL_EMAIL,
            to: 'vivektarun1234@gmail.com',
            subject: 'Is the Service working now as well',
            text: "yes it is working"
        })
    
        console.log(response);
    } catch (error) {
        console.log(error);
    }
})