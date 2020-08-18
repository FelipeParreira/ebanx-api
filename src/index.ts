import winston from 'winston';
import dotenv from 'dotenv';
import app from './app';

// load env vars
dotenv.config();

const { NODE_ENV, PORT = 3000 } = process.env;

const server = app.listen(PORT, () => {
  const loggingConsole = new winston.transports.Console();
  winston.add(loggingConsole);
  winston.info(`NODE_ENV: ${NODE_ENV}`);
  winston.info(`API listening on port ${PORT}...`);
});

export default server;
