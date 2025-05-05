import { NextResponse } from 'next/server';
import { decrypt } from '@/app/lib/server/session';
import { cookies } from 'next/headers';

export async function GET() {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  return NextResponse.json({
    userId: session?.userId ?? null,
  });
}
