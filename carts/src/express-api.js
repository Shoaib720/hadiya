import express from 'express';
// import cart from './api/cart.api.js'

export function expressApp(app) {
  
  app.use(express.json());

  app.get('/', (_req, res, _next) => {
    res.status(200).send({
      message: 'Carts service is up and running'
    });
  });

  // cart(app);

}