import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Redis } from 'ioredis';
import { redisClient } from '../config/redis';

export interface RateLimiterOptions {
  windowMs: number;
  maxRequests: number;
}

export async function checkTokenBucket(
  client: Redis, 
  ip: string, 
  now: number, 
  windowMs: number, 
  max: number
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const key = `rate_limit:${ip}`;
  const clearBefore = now - windowMs;

  try {
    const multi = client.multi();
    multi.zremrangebyscore(key, 0, clearBefore);
    multi.zcard(key);
    multi.zadd(key, now, `${now}-${Math.random()}`);
    multi.pexpire(key, windowMs);
    
    const results = await multi.exec();
    if (!results) {
      throw new Error('Redis multi transaction failed');
    }

    const countResult = results[1];
    if (countResult && countResult[1]) {
      const currentCount = countResult[1] as number;
      if (currentCount >= max) {
        await client.zremrangebyrank(key, -1, -1);
        return {
          allowed: false,
          remaining: 0,
          resetTime: now + windowMs
        };
      }
      return {
        allowed: true,
        remaining: Math.max(0, max - currentCount - 1),
        resetTime: now + windowMs
      };
    }

    return {
      allowed: true,
      remaining: max - 1,
      resetTime: now + windowMs
    };
  } catch (err) {
    console.error('Rate limiter Redis error, failing open:', err);
    return { allowed: true, remaining: max, resetTime: now + windowMs };
  }
}

export function slidingWindowRateLimiter(options: RateLimiterOptions = { windowMs: 60000, maxRequests: 100 }): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' 
      ? forwarded.split(',')[0].trim() 
      : req.socket.remoteAddress || '127.0.0.1';

    const now = Date.now();
    const { allowed, remaining, resetTime } = await checkTokenBucket(
      redisClient,
      ip,
      now,
      options.windowMs,
      options.maxRequests
    );

    res.setHeader('X-RateLimit-Limit', options.maxRequests);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000));

    if (!allowed) {
      res.status(429).json({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.'
      });
      return;
    }

    next();
  };
}
