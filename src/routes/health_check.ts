import * as httpStatus from 'http-status-codes';
import express from 'express';

export const router = express.Router();

export default (app: express.Router): void => {
  app.use('/health_check', router);

  router.get('/', (req, res) => {
    res.status(httpStatus.OK).send('OK');
  });
};
