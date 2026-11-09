import request from 'supertest';
import app from '../src/app';
import { redisClient } from '../src/config/redis';

describe('Sliding Window Rate Limiter Middleware', () => {
  beforeEach(async () => {
    if (redisClient.status !== 'ready') {
      try {
        await redisClient.connect();
      } catch (e) {
        // fallback if redis is not running locally for tests
      }
    }
    await redisClient.flushall();
  });

  afterAll(async () => {
    await redisClient.quit();
  });

  it('should allow requests within rate limit', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toEqual(200);
    expect(res.headers).toHaveProperty('x-ratelimit-limit', '100');
    expect(res.headers).toHaveProperty('x-ratelimit-remaining');
  });
});
