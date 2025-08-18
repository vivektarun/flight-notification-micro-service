const express = require('express');
const amqplib = require('amqplib');

async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertQueue('noti-queue');
        
        channel.consume("noti-queue", (data) => {
            console.log(`${Buffer.from(data.content)}`);
            channel.ack(data);
        })

    } catch (error) {
        console.log(error);
    }
}

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes'); // By default index.js in required.

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
    await connectQueue();
})