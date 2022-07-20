import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'prod'){
  const configFile = `.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: configFile });
}
else {
  dotenv.config();
}

export const PORT = process.env.PORT;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
export const KAFKA_URL = process.env.KAFKA_URL;
export const KAFKA_CART_TOPIC_NAME = process.env.KAFKA_CART_TOPIC_NAME