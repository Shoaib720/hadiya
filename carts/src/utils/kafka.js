import { KafkaClient, Consumer } from 'kafka-node';
import { KAFKA_URL, KAFKA_CART_TOPIC_NAME } from '../config/index.js';
export async function consumeMessage(){
    const client = new KafkaClient({ kafkaHost: KAFKA_URL });
    const topics = [
        {
            topic: KAFKA_CART_TOPIC_NAME,
            partitions: 1,
            replicationFactor: 1
        }
    ]
    await client.createTopics(topics);
    const consumer = new Consumer(client, topics,
    {
        autoCommit: false,
        groupId: 'testgroup'
    });
    consumer.on('message', (message) => {
        console.log(message);
    })
}