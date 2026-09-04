import { ADMIN_COOKIE, createAdminSession, passwordMatches } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!passwordMatches(String(body.password ?? ''))) return NextResponse.json({ error: 'Parola hatalı.' }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminSession(), { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 12 });
  return response;
}
