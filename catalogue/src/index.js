import express from 'express';
import { ServiceBusClient } from '@azure/service-bus';
import { ENV_CONFIG } from './config/index.js';
 
async function StartServer(consumer) {

    const app = express();
    
  
    consumer.subscribe({
        processMessage: serviceBusMessageHandler,
        processError: serviceBusMessageErrorHandler
    });
  
    expressApp(app);
  
    app.listen(PORT, () => {
        console.log(`Server is listening on ${ENV_CONFIG.PORT}`);
    })
  
}

const serviceBusMessageErrorHandler = async (error) => {
    console.log(error);
};
  
const serviceBusMessageHandler = async (messageReceived) => {
    console.log(`Received message: ${messageReceived.body}`);
    // const cartItemService = new CartItemService();
    // await cartItemService.SubscribeEvents(messageReceived.body);
};

async function createConsumer() {
    const serviceBusClient = new ServiceBusClient(ENV_CONFIG.SERVICE_BUS_CONNECTION_STRING);
    return serviceBusClient.createReceiver(ENV_CONFIG.SERVICE_BUS_QUEUE_NAME);
}

const consumer = await createConsumer();

await StartServer();