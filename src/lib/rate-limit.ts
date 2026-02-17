const CLEANUP_INTERVAL = 60_000; // clean expired entries every 60s

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private lastCleanup = Date.now();

  constructor(
    private maxAttempts: number,
    private windowMs: number
  ) {}

  check(key: string): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();

    // Periodic cleanup of expired entries
    if (now - this.lastCleanup > CLEANUP_INTERVAL) {
      this.cleanup(now);
      this.lastCleanup = now;
    }

    const entry = this.store.get(key);

    // No entry or expired window — allow and start fresh
    if (!entry || now > entry.resetAt) {
      this.store.set(key, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true, remaining: this.maxAttempts - 1, resetIn: this.windowMs };
    }

    // Within window — check count
    if (entry.count >= this.maxAttempts) {
      return {
        allowed: false,
        remaining: 0,
        resetIn: entry.resetAt - now,
      };
    }

    entry.count++;
    return {
      allowed: true,
      remaining: this.maxAttempts - entry.count,
      resetIn: entry.resetAt - now,
    };
  }

  private cleanup(now: number) {
    for (const [key, entry] of this.store) {
      if (now > entry.resetAt) {
        this.store.delete(key);
      }
    }
  }
}

// 5 login attempts per IP per 15 minutes
export const loginLimiter = new RateLimiter(5, 15 * 60 * 1000);

// 3 password resets per email per hour
export const resetLimiter = new RateLimiter(3, 60 * 60 * 1000);

// 10 n8n webhook triggers per agent per minute
export const webhookLimiter = new RateLimiter(10, 60 * 1000);
