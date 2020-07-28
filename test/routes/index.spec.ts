import * as httpStatus from 'http-status-codes';
import request from 'supertest';

import app from '../../src/app';

describe('/api', () => {
  describe('/health_check', () => {
    describe('/ GET', () => {
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
  });

  describe('/example', () => {
    describe('/ GET', () => {
      it('should have the correct status code and message', () => {
        request(app)
          .get('/api/example')
          .expect(httpStatus.OK)
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.text).toBe(`
      Hello, world!
      1 + 2 = 3
    `);
          });
      });
    });
  });
});
