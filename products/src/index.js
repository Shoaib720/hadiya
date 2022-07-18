import express from 'express';
import { expressApp } from './express-api.js'
import { PORT} from './config/index.js';

function StartServer() {

  const app = express();

  expressApp(app);

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  })

}

StartServer();