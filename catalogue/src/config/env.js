import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'prod'){
  const configFile = `.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: configFile });
}
else {
  dotenv.config();
}

export const ENV_CONFIG = {
    PORT: process.env.PORT,
    ELASTICSEARCH_URL: process.env.ELASTICSEARCH_URL,
    SERVICE_BUS_CONNECTION_STRING: process.env.SERVICE_BUS_CONNECTION_STRING,
    SERVICE_BUS_QUEUE_NAME: process.env.SERVICE_BUS_QUEUE_NAME
}