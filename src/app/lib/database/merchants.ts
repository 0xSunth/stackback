import { db } from '@/db/client';

export async function getMerchants(page: number = 1, limit: number = 20) {
  const merchants = await db.query.merchants.findMany({
    orderBy: (merchants, { asc }) => asc(merchants.name),
    limit: limit,
    offset: (page - 1) * limit,
  });

  if (merchants.length === 0) {
    throw new Error('No merchants found in the database.');
  }

  return merchants;
}

export async function getHighlightedMerchants(page: number = 1, limit: number = 20) {
  const merchants = await db.query.merchants.findMany({
    where: (merchants, { eq }) => eq(merchants.highlight, true),
    orderBy: (merchants, { asc }) => asc(merchants.name),
    limit: limit,
    offset: (page - 1) * limit,
  });

  if (merchants.length === 0) {
    throw new Error('No merchants found in the database.');
  }

  return merchants;
}
