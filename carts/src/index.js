import express from 'express';
import { Kafka } from 'kafkajs';
import { expressApp } from './express-api.js'
import { PORT} from './config/index.js';
import { sequelize } from './database/index.js'
import { CartItemService } from './services/cartitem.service.js'
// import { KafkaService } from './services/kafka.service.js';
// import { consumeMessage } from './utils/kafka.js'

async function StartServer(consumer) {

  const app = express();

  const cartItemService = new CartItemService();

  await consumer.connect();

  await consumer.subscribe({
    topic: 'product_cart'
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      cartItemService.SubscribeEvents(JSON.parse(message.value));
    },
  })

  sequelize.sync({
    force: false,
    alter: false
  });
  

  expressApp(app);

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  })

}

async function createConsumer() {
  const kafka = new Kafka({
    clientId: 'cart_consumer',
    brokers: ['kafka:9092']
  });

  return kafka.consumer({
    groupId: 'test'
  });
}

const consumer = await createConsumer();

await StartServer(consumer);