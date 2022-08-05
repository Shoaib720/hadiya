import express from 'express';
import { ServiceBusClient } from '@azure/service-bus';
import promclient from 'prom-client';
import { expressApp } from './express-app.js'
import { EnvConfig, Connection } from './config/index.js';
import { ErrorLogger } from './utils/logger.js';

async function StartServer() {

  try{

    const register = new promclient.Registry();
    promclient.collectDefaultMetrics({
      prefix: 'products_',
      gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
      register: register
    });

    const app = express();

    const producer = await createSender();

    await Connection.sequelize.sync({
      force: false,
      alter: false
    });
    const esClient = Connection.esClient
    expressApp({ app, producer, esClient, register });

    app.listen(EnvConfig.PORT, () => {
      console.log(`Server is listening on ${EnvConfig.PORT}`);
    })
  }
  catch(err) {
    const logger = new ErrorLogger();
    logger.error(err);
  }

}

async function createSender(){
  const serviceBusClient = new ServiceBusClient(EnvConfig.SERVICE_BUS_CONNECTION_STRING);
  return serviceBusClient.createSender(EnvConfig.SERVICE_BUS_QUEUE_NAME);
}

await StartServer();