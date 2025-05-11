import { getHighlightedMerchants } from '@/app/lib/database/merchants';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '14');

    const merchants = await getHighlightedMerchants(page, limit);
    return NextResponse.json({ merchants: merchants });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
