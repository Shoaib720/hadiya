import express from 'express';
import cartItemApi from './api/cartitem.api.js';

export function expressApp(app) {
  
  app.use(express.json());

  app.get('/health', (_req, res, _next) => {
    res.status(200).send({
      message: 'Carts service is up and running'
    });
  });

  cartItemApi(app);

}