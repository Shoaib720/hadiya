import express from 'express';
import requestId from 'express-request-id';
import { ProductAPI } from './api/index.js'
import { LogHandler, ErrorHandler } from './middlewares/index.js';

export function expressApp({ app, producer, esClient, register }) {

  app.use(requestId());
  
  app.use(express.json());

  app.get('/', (_req, res, _next) => {
    res.status(200).send({
      message: 'Products service is up and running'
    });
  });

  app.get('/metrics', async (req, res, next) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
  })

  ProductAPI(app, producer, esClient);

  app.use(LogHandler);
  app.use(ErrorHandler);

}