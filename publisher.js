const amqp = require("amqplib")
const config = require('./config/messageQueueConfig.json')

const pushNewTask = async ({ TASK }) => {
    try {
        // create a channel connection
        const connection = await amqp.connect(config.publisher_url)
        const channel = await connection.createChannel()
        await channel.assertQueue(config.QUEUE_NAME)

        // send data to queue in Buffer
        const is_ok = channel.sendToQueue(config.QUEUE_NAME, Buffer.from(JSON.stringify(TASK)))

        console.log(`Task Queued::status: `, is_ok);

        setTimeout(() => {
            connection.close()
            return is_ok
        }, 500);

    } catch (error) {
        console.log(error);
        return false
    }
}





// push new task
pushNewTask({
    TASK: { to: "a@a", from: "b@b", message: "Message to be send" }
})


exports.pushNewTask = pushNewTask

