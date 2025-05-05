import { NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    console.log('Failed to verify session');
    return null;
  }
}

export async function createSessionResponse(userId: string, redirectUrl: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  const response = NextResponse.json({ success: true, redirect: redirectUrl });

  response.cookies.set({
    name: 'session',
    value: session,
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}

export function deleteSessionResponse(redirectUrl: string) {
  const response = NextResponse.json({ success: true, redirect: redirectUrl });

  response.cookies.set({
    name: 'session',
    value: '',
    expires: new Date(0), // Expire immédiatement
    path: '/',
  });

  return response;
}
