import express from 'express';
// import { Kafka } from 'kafkajs';
import { ServiceBusClient } from '@azure/service-bus';
import { expressApp } from './express-app.js'
import { PORT, SERVICE_BUS_CONNECTION_STRING, SERVICE_BUS_QUEUE_NAME } from './config/index.js';
import { sequelize } from './database/index.js'

async function StartServer() {

  const app = express();

  const producer = await createSender();

  sequelize.sync({
    force: false,
    alter: false
  });

  expressApp(app, producer);

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  })

}

async function createSender(){
  const serviceBusClient = new ServiceBusClient(SERVICE_BUS_CONNECTION_STRING);
  return serviceBusClient.createSender(SERVICE_BUS_QUEUE_NAME);
}

await StartServer();