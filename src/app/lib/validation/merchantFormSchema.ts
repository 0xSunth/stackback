import { z } from 'zod';

export const merchantFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: '• Name must be at least 2 characters.' })
    .max(100, { message: '• Name must be at most 100 characters.' })
    .trim(),
  cashbackPercent: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: '• Enter a valid percentage (e.g., 5 or 5.25).',
    })
    .refine((val) => parseFloat(val) >= 0 && parseFloat(val) <= 100, {
      message: '• Percentage must be between 0 and 100.',
    }),
  partner: z
    .string()
    .min(2, { message: '• Partner name must be at least 2 characters.' })
    .max(100, { message: '• Partner name must be at most 100 characters.' })
    .trim(),
});
