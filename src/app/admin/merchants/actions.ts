'use server';

import { merchantFormSchema } from '@/app/lib/validation/merchantFormSchema';

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
