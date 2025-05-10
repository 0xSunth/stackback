import { getCashbackRequests } from '@/app/lib/database/cashback';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '14');

    const cashbackRequests = await getCashbackRequests(page, limit);
    return NextResponse.json({ cashbackRequests: cashbackRequests });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
