import { db } from '@/db';
import { AppError } from '@/lib/errors';

// Use prepared statement
export async function getMerchants(page: number = 1, limit: number = 20) {
  const merchants = await db.query.merchants.findMany({
    orderBy: (merchants, { asc }) => [asc(merchants.name)],
    limit,
    offset: (page - 1) * limit,
  });

  if (merchants.length === 0) {
    throw new AppError('No merchants found.', 404);
  }

  return merchants;
}

export async function getHighlightedMerchants(page: number = 1, limit: number = 20) {
  const merchants = await db.query.merchants.findMany({
    where: (merchants, { eq }) => eq(merchants.highlight, true),
    orderBy: (merchants, { asc }) => [asc(merchants.name)],
    limit: limit,
    offset: (page - 1) * limit,
  });

  if (merchants.length === 0) {
    throw new AppError('No highlighted merchants found.', 404);
  }

  return merchants;
}

export async function getMerchantByName(name: string) {
  const merchant = await db.query.merchants.findFirst({
    where: (merchants, { ilike }) => ilike(merchants.name, name),
  });
  
  if (!merchant) {
    throw new AppError(`Merchant "${name}" not found.`, 404);
  }

  return merchant;
}
