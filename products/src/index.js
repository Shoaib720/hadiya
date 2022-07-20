import express from 'express';
import { Kafka } from 'kafkajs';
import { expressApp } from './express-app.js'
import { PORT, KAFKA_URL, KAFKA_CLIENT_ID } from './config/index.js';
import { sequelize } from './database/index.js'

async function StartServer() {

  const app = express();

  const producer = await createProducer();

  sequelize.sync({
    force: false,
    alter: false
  });

  expressApp(app, producer);

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  })

}

async function createProducer() {
  const kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: [KAFKA_URL]
  });
  console.log(kafka);
  return kafka.producer({
      allowAutoTopicCreation: true
  });
}

await StartServer();