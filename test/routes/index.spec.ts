import * as httpStatus from 'http-status-codes';
import request from 'supertest';

import app from '../../src/app';

describe('GET /health_check', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/health_check');
    expect(res.status).toBe(httpStatus.OK);
    expect(res.text).toBe('OK');
  });
});

describe('POST /reset', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).post('/reset');
    expect(res.status).toBe(httpStatus.OK);
    expect(res.text).toBe('OK');
  });

  it('should reset all account data', async () => {
    const agent = request(app);
    await agent
      .post('/event')
      .send({ type: 'deposit', destination: '100', amount: 10 });

    await agent.post('/reset');

    const res = await agent.get('/balance?account_id=100');
    expect(res.status).toBe(httpStatus.NOT_FOUND);
    expect(res.text).toBe('0');
  });
});

describe('POST /event', () => {
  beforeAll(() => request(app).post('/reset'));

  it('should create an account with an initial balance', async () => {
    const res = await request(app)
      .post('/event')
      .send({ type: 'deposit', destination: '100', amount: 10 });

    expect(res.status).toBe(httpStatus.CREATED);
    expect(res.body).toEqual({ destination: { id: '100', balance: 10 } });
  });

  it('should deposit into an existing account', async () => {
    const res = await request(app)
      .post('/event')
      .send({ type: 'deposit', destination: '100', amount: 10 });

    expect(res.status).toBe(httpStatus.CREATED);
    expect(res.body).toEqual({ destination: { id: '100', balance: 20 } });
  });

  it('should not withdraw from a non-existing account', async () => {
    const res = await request(app)
      .post('/event')
      .send({ type: 'withdraw', origin: '200', amount: 10 });

    expect(res.status).toBe(httpStatus.NOT_FOUND);
    expect(res.text).toBe('0');
  });

  it('should withdraw from an existing account', async () => {
    const res = await request(app)
      .post('/event')
      .send({ type: 'withdraw', origin: '100', amount: 5 });

    expect(res.status).toBe(httpStatus.CREATED);
    expect(res.body).toEqual({ origin: { id: '100', balance: 15 } });
  });

  it('should transfer from an existing account', async () => {
    const res = await request(app).post('/event').send({
      type: 'transfer',
      origin: '100',
      amount: 15,
      destination: '300',
    });

    expect(res.status).toBe(httpStatus.CREATED);
    expect(res.body).toEqual({
      origin: { id: '100', balance: 0 },
      destination: { id: '300', balance: 15 },
    });
  });

  it('should not transfer from a non-existing account', async () => {
    const res = await request(app).post('/event').send({
      type: 'transfer',
      origin: '200',
      amount: 15,
      destination: '300',
    });

    expect(res.status).toBe(httpStatus.NOT_FOUND);
    expect(res.text).toBe('0');
  });
});

describe('GET /balance?account_id', () => {
  beforeEach(() => request(app).post('/reset'));

  it('should return 404 and a balance of 0 for a non-existing account', async () => {
    const res = await request(app).get('/balance?account_id=1234');

    expect(res.status).toBe(httpStatus.NOT_FOUND);
    expect(res.text).toBe('0');
  });

  it('should get the balance for an existing account', async () => {
    const agent = request(app);
    await agent
      .post('/event')
      .send({ type: 'deposit', destination: '100', amount: 20 });
    const res = await agent.get('/balance?account_id=100');

    expect(res.status).toBe(httpStatus.OK);
    expect(res.text).toBe('20');
  });
});
