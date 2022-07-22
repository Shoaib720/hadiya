import express from 'express';
import { ServiceBusClient } from '@azure/service-bus';
import { expressApp } from './express-api.js'
import { PORT, SERVICE_BUS_CONNECTION_STRING, SERVICE_BUS_QUEUE_NAME } from './config/index.js';
import { sequelize } from './database/index.js'
import { CartItemService } from './services/cartitem.service.js'
// import { KafkaService } from './services/kafka.service.js';
// import { consumeMessage } from './utils/kafka.js'

async function StartServer(consumer) {

  const app = express();
  

  consumer.subscribe({
		processMessage: serviceBusMessageHandler,
		processError: serviceBusMessageErrorHandler
	});

  sequelize.sync({
    force: false,
    alter: false
  });
  

  expressApp(app);

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  })

}

const serviceBusMessageErrorHandler = async (error) => {
  console.log(error);
};

const serviceBusMessageHandler = async (messageReceived) => {
  console.log(`Received message: ${messageReceived.body}`);
  const cartItemService = new CartItemService();
  await cartItemService.SubscribeEvents(messageReceived.body);
};

async function createConsumer() {
  const serviceBusClient = new ServiceBusClient(SERVICE_BUS_CONNECTION_STRING);
  return serviceBusClient.createReceiver(SERVICE_BUS_QUEUE_NAME);
}

const consumer = await createConsumer();

await StartServer(consumer);