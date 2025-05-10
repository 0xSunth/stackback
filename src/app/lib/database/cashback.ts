import { db } from '@/db/client';
import { eq } from 'drizzle-orm';
import { cashbackRequests } from '@/db/schemas/cashback_requests';
import { users } from '@/db/schemas/users';
import { merchants } from '@/db/schemas/merchants';

export async function getCashbackRequests(page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit;

  const cashbackRequestsWithRelations = await db
    .select({
      id: cashbackRequests.id,
      amount_btc: cashbackRequests.amountBTC,
      status: cashbackRequests.status,
      receiptUrl: cashbackRequests.receiptUrl,
      createdAt: cashbackRequests.createdAt,
      userEmail: users.email,
      merchantName: merchants.name,
    })
    .from(cashbackRequests)
    .leftJoin(users, eq(cashbackRequests.userId, users.id))
    .leftJoin(merchants, eq(cashbackRequests.merchantId, merchants.id))
    .orderBy(cashbackRequests.createdAt)
    .limit(limit)
    .offset(offset);

  if (cashbackRequestsWithRelations.length === 0) {
    throw new Error('No cashback requests found in the database.');
  }

  return cashbackRequestsWithRelations;
}
