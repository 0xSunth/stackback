import { z } from 'zod';

export const uploadReceiptSchema = z.object({
  merchantId: z.coerce.number({ invalid_type_error: '• Invalid merchant.' }),
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
