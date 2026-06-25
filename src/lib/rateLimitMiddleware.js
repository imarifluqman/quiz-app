import { NextResponse } from "next/server";
import rateLimiter from "./rateLimiter";

/**
 * Get client IP address from request
 */
function getClientIp(request) {
  // Try various headers that might contain the real IP
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(",")[0].trim();
  }

  if (realIp) return realIp;
  if (cfConnectingIp) return cfConnectingIp;

  // Fallback
  return "unknown";
}

/**
 * Rate limiting middleware
 * @param {Object} config - Rate limit configuration
 * @param {number} config.limit - Max requests allowed
 * @param {number} config.windowMs - Time window in milliseconds
 * @param {string} config.keyPrefix - Optional prefix for the rate limit key
 */
export function withRateLimit({ limit, windowMs, keyPrefix = "rl" }) {
  return (handler) => {
    return async (request, context) => {
      try {
        const ip = getClientIp(request);
        const key = `${keyPrefix}:${ip}`;

        const result = rateLimiter.check(key, limit, windowMs);

        if (!result.allowed) {
          const resetDate = new Date(result.resetTime);
          const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);

          return NextResponse.json(
            {
              error: "Too many requests. Please try again later.",
              retryAfter: retryAfter,
              resetAt: resetDate.toISOString(),
            },
            {
              status: 429,
              headers: {
                "Retry-After": retryAfter.toString(),
                "X-RateLimit-Limit": limit.toString(),
                "X-RateLimit-Remaining": "0",
                "X-RateLimit-Reset": result.resetTime.toString(),
              },
            }
          );
        }

        // Add rate limit headers to successful responses
        const response = await handler(request, context);

        // Clone response to add headers
        const newResponse = new Response(response.body, response);
        newResponse.headers.set("X-RateLimit-Limit", limit.toString());
        newResponse.headers.set("X-RateLimit-Remaining", result.remaining.toString());
        newResponse.headers.set("X-RateLimit-Reset", result.resetTime.toString());

        return newResponse;
      } catch (error) {
        console.error("Rate limit middleware error:", error);
        // If rate limiting fails, allow the request through
        return handler(request, context);
      }
    };
  };
}

/**
 * Rate limiting middleware that uses email as key (for registration, password reset)
 * @param {Object} config - Rate limit configuration
 */
export function withEmailRateLimit({ limit, windowMs, keyPrefix = "rl-email" }) {
  return (handler) => {
    return async (request, context) => {
      try {
        // Get email from request body
        const body = await request.json();
        const email = body.email?.toLowerCase();

        if (!email) {
          // If no email, fall back to IP-based rate limiting
          const ip = getClientIp(request);
          const key = `${keyPrefix}:${ip}`;
          const result = rateLimiter.check(key, limit, windowMs);

          if (!result.allowed) {
            const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);
            return NextResponse.json(
              { error: "Too many requests. Please try again later." },
              { status: 429, headers: { "Retry-After": retryAfter.toString() } }
            );
          }
        } else {
          // Rate limit by both IP and email
          const ip = getClientIp(request);
          const emailKey = `${keyPrefix}:email:${email}`;
          const ipKey = `${keyPrefix}:ip:${ip}`;

          const emailResult = rateLimiter.check(emailKey, limit, windowMs);
          const ipResult = rateLimiter.check(ipKey, limit * 2, windowMs); // Allow 2x for IP

          if (!emailResult.allowed || !ipResult.allowed) {
            const result = !emailResult.allowed ? emailResult : ipResult;
            const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);
            return NextResponse.json(
              { error: "Too many requests. Please try again later." },
              { status: 429, headers: { "Retry-After": retryAfter.toString() } }
            );
          }
        }

        // Need to reconstruct request with body since we consumed it
        const newRequest = new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: JSON.stringify(body),
        });

        return handler(newRequest, context);
      } catch (error) {
        console.error("Email rate limit middleware error:", error);
        return handler(request, context);
      }
    };
  };
}
