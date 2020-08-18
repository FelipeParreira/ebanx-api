import * as httpStatus from 'http-status-codes';
import request from 'supertest';

import app from '../../src/app';

describe('GET /health_check', () => {
  it('should have the correct status code and message', () => {
    request(app)
      .get('/health_check')
      .expect(httpStatus.OK)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.text).toBe('OK');
      });
  });
});
