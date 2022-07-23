import express from 'express';
import { ProductAPI } from './api/index.js'
import { LogHandler, ErrorHandler } from './middlewares/index.js';

export function expressApp(app, producer) {
  
  app.use(express.json());

  app.get('/', (_req, res, _next) => {
    res.status(200).send({
      message: 'Products service is up and running'
    });
  });

  ProductAPI(app, producer);

  app.use(LogHandler);
  app.use(ErrorHandler);

}