import * as httpStatus from 'http-status-codes';
import request from 'supertest';

import app from '../../src/app';

describe('GET /api/health_check/', () => {
  it('should have the correct status code and message', () => {
    request(app)
      .get('/api/health_check')
      .expect(httpStatus.OK)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.text).toBe('OK');
      });
  });
});

describe('GET /api/example/', () => {
  it('should have the correct status code and message', () => {
    request(app)
      .get('/api/example')
      .expect(httpStatus.OK)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.text).toBe('1 + 2 = 3');
      });
  });
});
