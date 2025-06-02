import { getMerchantByName } from '@/app/lib/database/merchants';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (name) {
      const merchant = await getMerchantByName(name);
      return NextResponse.json({ merchant });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
