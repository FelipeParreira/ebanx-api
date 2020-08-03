import * as httpStatus from 'http-status-codes';
import express from 'express';
import add from '../utils';

const router = express.Router();

export default (app: express.Router): void => {
  app.use('/example', router);

  router.get('/', (_, res) => {
    res.status(httpStatus.OK);
    res.send(`1 + 2 = ${add(1, 2)}`);
  });
};
