import * as httpStatus from 'http-status-codes';
import express from 'express';

const router = express.Router();

router.get('/health_check', (_, res) => {
  res.status(httpStatus.OK).send('OK');
});

export default router;
