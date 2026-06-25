/**
 * Simple in-memory rate limiter
 * For production, consider using Redis with rate-limiter-flexible
 */

class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.cleanup();
  }

  /**
   * Check if request should be allowed
   * @param {string} key - Identifier (usually IP address)
   * @param {number} limit - Max requests allowed
   * @param {number} windowMs - Time window in milliseconds
   */
  check(key, limit, windowMs) {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get existing requests for this key
    let keyRequests = this.requests.get(key) || [];

    // Filter out requests outside the current window
    keyRequests = keyRequests.filter((timestamp) => timestamp > windowStart);

    // Check if limit exceeded
    if (keyRequests.length >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: keyRequests[0] + windowMs,
      };
    }

    // Add current request
    keyRequests.push(now);
    this.requests.set(key, keyRequests);

    return {
      allowed: true,
      remaining: limit - keyRequests.length,
      resetTime: now + windowMs,
    };
  }

  /**
   * Cleanup old entries every 10 minutes to prevent memory leaks
   */
  cleanup() {
    setInterval(() => {
      const now = Date.now();
      const maxAge = 15 * 60 * 1000; // 15 minutes

      for (const [key, requests] of this.requests.entries()) {
        const filtered = requests.filter((timestamp) => now - timestamp < maxAge);
        if (filtered.length === 0) {
          this.requests.delete(key);
        } else {
          this.requests.set(key, filtered);
        }
      }
    }, 10 * 60 * 1000); // Run every 10 minutes
  }

  /**
   * Reset rate limit for a specific key (useful for testing)
   */
  reset(key) {
    this.requests.delete(key);
  }

  /**
   * Get current request count for a key
   */
  getCount(key) {
    return (this.requests.get(key) || []).length;
  }
}

// Singleton instance
const rateLimiter = new RateLimiter();

export default rateLimiter;

/**
 * Rate limit presets for different endpoint types
 */
export const RATE_LIMITS = {
  // Strict limit for authentication attempts (5 per 15 minutes)
  AUTH_STRICT: { limit: 5, windowMs: 15 * 60 * 1000 },

  // Standard limit for login (10 per 15 minutes)
  LOGIN: { limit: 10, windowMs: 15 * 60 * 1000 },

  // More lenient for registration (30 per hour)
  REGISTER: { limit: 30, windowMs: 60 * 60 * 1000 },

  // Password reset (3 per hour)
  PASSWORD_RESET: { limit: 3, windowMs: 60 * 60 * 1000 },

  // Email verification resend (5 per hour)
  EMAIL_VERIFY: { limit: 5, windowMs: 60 * 60 * 1000 },

  // General API limit (100 per 15 minutes)
  API_GENERAL: { limit: 100, windowMs: 15 * 60 * 1000 },
};
