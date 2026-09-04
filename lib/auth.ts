import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'kupa_admin_session';

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error('SESSION_SECRET tanımlı değil.');
  return value;
}

function signature(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('hex');
}

export function createAdminSession() {
  const payload = `admin.${Date.now() + 1000 * 60 * 60 * 12}`;
  return `${payload}.${signature(payload)}`;
}

export function verifyAdminSession(token?: string) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expected = signature(payload);
  const supplied = parts[2];
  if (expected.length !== supplied.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(supplied))) return false;
  return parts[0] === 'admin' && Number(parts[1]) > Date.now();
}

export async function isAdminAuthenticated() {
  return verifyAdminSession((await cookies()).get(ADMIN_COOKIE)?.value);
}

export function passwordMatches(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? '';
  if (!expected || expected.length !== password.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(password));
}
