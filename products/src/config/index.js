import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'prod'){
  const configFile = `.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: configFile });
}
else {
  dotenv.config();
}

// module.exports = {
//   PORT: process.env.PORT,
//   DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING

// }

const PORT = process.env.PORT;

export {
  PORT
}