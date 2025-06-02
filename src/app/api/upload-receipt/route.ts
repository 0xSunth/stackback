import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';

import { createCashbackRequest } from '@/app/lib/database/cashbackRequests';
import { decrypt } from '@/server/session';
import { uploadReceiptSchema } from '@/app/lib/validation/uploadReceiptSchema';

export async function POST(req: Request) {
  try {
    const cookie = (await cookies()).get('session')?.value;
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await decrypt(cookie);

    let userId: number | null = null;
    if (session?.userId) {
      if (typeof session.userId === 'number') {
        userId = session.userId;
      } else if (typeof session.userId === 'string') {
        const parsed = parseInt(session.userId, 10);
        userId = isNaN(parsed) ? null : parsed;
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const formData = await req.formData();

    const file = formData.get('file') as File | null;
    const rawData = {
      merchantId: formData.get('merchantId'),
      amount: formData.get('amount'),
      currency: formData.get('currency'),
      purchasedAt: formData.get('purchasedAt'),
    };

    const validatedFields = uploadReceiptSchema.safeParse(rawData);
    if (!validatedFields.success) {
      const flatErrors = validatedFields.error.flatten().fieldErrors;
      const allErrors: string[] = [];

      for (const key in flatErrors) {
        const errs = flatErrors[key as keyof typeof flatErrors];
        if (errs) allErrors.push(...errs);
      }

      return NextResponse.json({ errors: allErrors }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ errors: ['• File is required.'] }, { status: 400 });
    }

    // File handling
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${uuidv4()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    await writeFile(filePath, buffer);
    const receiptUrl = `/uploads/${fileName}`;

    const { merchantId, amount, currency, purchasedAt } = validatedFields.data;

    // Only for testing
    const BTC_EXCHANGE_RATE = 60000;
    const amountBTC = (amount / BTC_EXCHANGE_RATE).toFixed(8);

    await createCashbackRequest({
      userId,
      merchantId,
      amount: amount.toString(),
      amountBTC,
      currency,
      purchasedAt: new Date(purchasedAt),
      receiptUrl,
    });

    return NextResponse.json({ success: true, redirect: '/dashboard' });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ errors: ['Internal server error.'] }, { status: 500 });
  }
}
