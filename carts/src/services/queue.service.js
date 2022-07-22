// import { KAFKA_URL, KAFKA_CART_TOPIC_NAME } from '../config/index.js';

export class QueueService{

    constructor() {
        this.client = new KafkaClient({
            kafkaHost: KAFKA_URL
        });
    }

    async CreateTopic() {
        try{
            const topics = [
                {
                    topic: KAFKA_CART_TOPIC_NAME,
                    partitions: 1,
                    replicationFactor: 1
                }
            ]
            await client.createTopics(topics);
            return client;
        }
        catch(err) {
            throw err;
        }
    }

    async CreateConsumer(topic) {
        return consumer = new Consumer(this.client, [ topic ]);
    }

    async ConsumeMessage() {
        const consumer = new Consumer(this.client,[]);
        consumer.on('message', (message) => {
            console.log(message);
        })
    }
}