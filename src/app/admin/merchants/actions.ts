'use server';

import { z } from 'zod';

const merchantFormSchema = z.object({
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

type FormState =
  | {
      errors?: {
        logoUrl?: string[];
        name?: string[];
        cashbackPercent?: string[];
        partner?: string[];
      };
      message?: string;
    }
  | undefined;

export async function createMerchant(state: FormState, formData: FormData) {
  const logoFile = formData.get('logoUrl');

  if (!(logoFile instanceof File) || logoFile.size === 0) {
    return {
      errors: {
        logoUrl: ['Please upload a valid image file.'],
        name: undefined,
        cashbackPercent: undefined,
        partner: undefined,
      },
    };
  }

  const validatedFields = merchantFormSchema.safeParse(Object.fromEntries(formData));
  if (!validatedFields.success) {
    return {
      errors: {
        logoUrl: undefined,
        ...validatedFields.error.flatten().fieldErrors,
      },
    };
  }

  const { name, cashbackPercent, partner } = validatedFields.data;
  console.log(name);
  console.log(cashbackPercent);
  console.log(partner);

  return {
    message: 'Merchant created successfully.',
  };
}
