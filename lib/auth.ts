import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "xpanix_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

type CookieReader = { get(name: string): { value: string } | undefined };

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error(
      "ADMIN_PASSWORD environment variable is not set. Add it to .env.local (see .env.example)."
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }
  if (!safeEqual(signature, expected)) return false;

  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() <= expires;
}

export function verifyPassword(password: string): boolean {
  const secret = getSecret();
  return safeEqual(password, secret);
}

export function isAuthed(cookies: CookieReader): boolean {
  return isValidSessionToken(cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
