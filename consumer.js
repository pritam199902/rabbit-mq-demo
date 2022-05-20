const amqp = require("amqplib")
const config = require('./config/messageQueueConfig.json')

exports.consumerTaskHandler = async () => {
    try {
        const connection = await amqp.connect(config.publisher_url)
        const channel = await connection.createChannel()
        await channel.assertQueue(config.QUEUE_NAME)
        channel.consume(config.QUEUE_NAME, message => {
            const task_obj = JSON.parse(message.content.toString())
            // console.log(task_obj);
            // accknowledgement

            handler(task_obj)
            channel.ack(message)
        })

    } catch (error) {
        console.log(error.message);
    }
}



const handler = async ({ to, from, message }) => {
    console.log("Processing...");
    setTimeout(() => {
        console.log(`DONE:: email sent to ${to} from ${from} || Message: ${message}`);
    }, 5000);
}