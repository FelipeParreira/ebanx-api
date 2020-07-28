import * as httpStatus from 'http-status-codes';
import express from 'express';
import add from '../utils';

export const router = express.Router();

export default (app: express.Router): void => {
  app.use('/example', router);

  router.get('/', (req, res) => {
    res.status(httpStatus.OK);
    res.send(`
      Hello, world!
      1 + 2 = ${add(1, 2)}
    `);
  });
};
