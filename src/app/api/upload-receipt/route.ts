import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { createCashbackRequest } from '@/app/lib/database/cashbackRequests';
import { decrypt } from '@/server/session';

export const uploadReceiptSchema = z.object({
  merchantId: z.string().uuid({ message: '• Invalid merchant.' }),
  amount: z.coerce
    .number({ invalid_type_error: '• Amount must be a number.' })
    .gt(0, { message: '• Amount must be greater than zero.' }),
  currency: z.enum(['USD', 'EUR', 'GBP', 'JPY'], {
    errorMap: () => ({ message: '• Invalid currency.' }),
  }),
  purchasedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: '• Invalid purchase date.' }),
});

export async function POST(req: Request) {
  try {
    const cookie = (await cookies()).get('session')?.value;
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await decrypt(cookie);
    const userId = typeof session?.userId === 'string' ? session.userId : null;
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

    await createCashbackRequest({
      user: userId,
      merchant: merchantId,
      amount,
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
