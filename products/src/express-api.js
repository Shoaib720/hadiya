import express from 'express';
import product from './api/product.api.js'

export function expressApp(app) {
  
  app.use(express.json());

  app.get('/', (_req, res, _next) => {
    res.status(200).send({
      message: 'Products service is up and running'
    });
  });

  product(app);

}