import { db } from '@/db';
import { cashbackRequests } from '@/schema/cashback_requests';
import { AppError } from '@/lib/errors';
import { currencyEnum } from '@/db/schema';

type Currency = typeof currencyEnum.enumValues[number];

interface CreateCashbackRequestParams {
  userId: number;
  merchantId: number;
  amount: string;
  currency: Currency;
  amountBTC: string;
  receiptUrl: string;
  purchasedAt: Date;
}

export async function createCashbackRequest(params: CreateCashbackRequestParams) {
  const result = await db
    .insert(cashbackRequests)
    .values({
      ...params,
    })
    .returning();

  if (!result.length) {
    throw new AppError('Failed to create cashback request.', 500);
  }

  return result[0];
}

export async function getCashbackRequests(page: number = 1, limit: number = 10) {
  const cashbackRequests = await db.query.cashbackRequests.findMany({
    orderBy: (cashbackRequests, { asc }) => asc(cashbackRequests.createdAt),
    limit: limit,
    offset: (page - 1) * limit,
    with: {
      user: true,
      merchant: true,
    },
  });

  if (cashbackRequests.length === 0) {
    throw new AppError('No cashback requests found.', 404);
  }

  return cashbackRequests;
}
