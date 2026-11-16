import { RateLimitStatus } from '../types/auth';

interface RateRecord {
  attempts: number;
  lockedUntil: number | null;
  lastAttempt: number;
}

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

class MemoryRateLimiter {
  private store = new Map<string, RateRecord>();

  async checkLimit(identifier: string): Promise<RateLimitStatus> {
    const now = Date.now();
    const record = this.store.get(identifier);

    if (!record) {
      return { isAllowed: true, remainingAttempts: MAX_ATTEMPTS };
    }

    if (record.lockedUntil && record.lockedUntil > now) {
      const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return {
        isAllowed: false,
        remainingAttempts: 0,
        retryAfterSeconds,
      };
    }

    // Reset record if outside sliding window
    if (now - record.lastAttempt > WINDOW_MS && !record.lockedUntil) {
      this.store.delete(identifier);
      return { isAllowed: true, remainingAttempts: MAX_ATTEMPTS };
    }

    return {
      isAllowed: true,
      remainingAttempts: Math.max(0, MAX_ATTEMPTS - record.attempts),
    };
  }

  async recordFailure(identifier: string): Promise<RateLimitStatus> {
    const now = Date.now();
    let record = this.store.get(identifier);

    if (!record || (now - record.lastAttempt > WINDOW_MS && !record.lockedUntil)) {
      record = { attempts: 0, lockedUntil: null, lastAttempt: now };
    }

    record.attempts += 1;
    record.lastAttempt = now;

    if (record.attempts >= MAX_ATTEMPTS) {
      record.lockedUntil = now + WINDOW_MS;
      this.store.set(identifier, record);
      return {
        isAllowed: false,
        remainingAttempts: 0,
        retryAfterSeconds: Math.ceil(WINDOW_MS / 1000),
      };
    }

    this.store.set(identifier, record);
    return {
      isAllowed: true,
      remainingAttempts: MAX_ATTEMPTS - record.attempts,
    };
  }

  async resetLimit(identifier: string): Promise<void> {
    this.store.delete(identifier);
  }
}

export const rateLimiter = new MemoryRateLimiter();