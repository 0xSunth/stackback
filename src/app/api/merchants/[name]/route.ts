import { getMerchantByName } from '@/app/lib/database/merchants';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const merchant = await getMerchantByName(params.name);
    return NextResponse.json({ merchant });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
