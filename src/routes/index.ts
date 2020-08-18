/* eslint-disable @typescript-eslint/no-unused-vars */
import * as httpStatus from 'http-status-codes';
import express from 'express';

import { clearStorage, getBalance, handleEvent } from '../service';

const router = express.Router();

router.get('/health_check', (_, res) => {
  res.status(httpStatus.OK).send('OK');
});

router.get('/balance', (req, res) => {
  const { account_id: accountID } = req.query;
  const balance = getBalance(String(accountID));

  return res.status(httpStatus.OK).send(balance.toString());
});

router.post('/event', (req, res) => {
  const { body } = req;
  const result = handleEvent(body);
  return res.status(httpStatus.CREATED).json(result);
});

router.post('/reset', (_, res) => {
  clearStorage();
  res.status(httpStatus.OK).send('OK');
});

router.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    // eslint-disable-next-line no-unused-vars
    _next: express.Handler,
  ) => {
    if (err.message.includes('No account with ID')) {
      return res.status(httpStatus.NOT_FOUND).send('0');
    }
    if (err.message.includes('Insufficient balance')) {
      return res.status(httpStatus.BAD_REQUEST).send(err.message);
    }
    return res.status(500).send(`Internal Server Error: ${err.message}`);
  },
);

export default router;
