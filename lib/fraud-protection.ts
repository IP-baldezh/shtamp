/**
 * Client-side fraud protection utilities.
 * Used in form submission handlers to detect bot activity.
 */

// ─── Rate limiting (in-memory, per browser session) ───────────────────────────

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Returns true if the action is allowed, false if rate-limited.
 * @param key     Unique key (e.g. "contact_form")
 * @param limit   Max submissions allowed within the window
 * @param windowMs Time window in milliseconds (default: 10 minutes)
 */
export function checkRateLimit(
  key: string,
  limit = 3,
  windowMs = 10 * 60 * 1000,
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetIn: windowMs };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetAt - now,
    };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count, resetIn: entry.resetAt - now };
}

// ─── Timing check ─────────────────────────────────────────────────────────────

/**
 * Returns current timestamp to embed in a form when it's mounted.
 * Used to detect bots that submit forms instantly.
 */
export function getFormTimestamp(): number {
  return Date.now();
}

/**
 * Returns true if the form was submitted too quickly (likely a bot).
 * @param mountedAt   Timestamp when the form was rendered (from getFormTimestamp)
 * @param minMs       Minimum legitimate fill time in ms (default: 3 seconds)
 */
export function isTooFast(mountedAt: number, minMs = 3000): boolean {
  return Date.now() - mountedAt < minMs;
}

// ─── Honeypot check ───────────────────────────────────────────────────────────

/**
 * Returns true if the honeypot field has been filled (bot activity).
 * The honeypot field (_hp) must be hidden via CSS and have no label.
 */
export function isHoneypotFilled(value: string | undefined): boolean {
  return typeof value === "string" && value.length > 0;
}

// ─── Combined fraud check ─────────────────────────────────────────────────────

export interface FraudCheckResult {
  blocked: boolean;
  reason?: "honeypot" | "too_fast" | "rate_limited";
  message: string;
}

export function runFraudChecks(params: {
  honeypot?: string;
  mountedAt: number;
  rateLimitKey: string;
  rateLimitMax?: number;
}): FraudCheckResult {
  const { honeypot, mountedAt, rateLimitKey, rateLimitMax = 3 } = params;

  if (isHoneypotFilled(honeypot)) {
    return { blocked: true, reason: "honeypot", message: "Обнаружена подозрительная активность." };
  }

  if (isTooFast(mountedAt)) {
    return {
      blocked: true,
      reason: "too_fast",
      message: "Форма отправлена слишком быстро. Пожалуйста, попробуйте ещё раз.",
    };
  }

  const rl = checkRateLimit(rateLimitKey, rateLimitMax);
  if (!rl.allowed) {
    const minutes = Math.ceil(rl.resetIn / 60000);
    return {
      blocked: true,
      reason: "rate_limited",
      message: `Слишком много попыток. Попробуйте через ${minutes} мин.`,
    };
  }

  return { blocked: false, message: "" };
}
