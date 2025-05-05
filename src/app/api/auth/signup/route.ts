import { NextResponse } from 'next/server';
import { createUser } from '@/app/lib/database/users';
import { z } from 'zod';

const signupFormSchema = z.object({
  email: z
    .string()
    .email({ message: '• Invalid email format.' })
    .max(255, { message: '• Email is too long.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: '• Password must be at least 8 characters.' })
    .max(128, { message: '• Password is too long.' })
    .regex(/[a-z]/, { message: '• Password must contain a lowercase letter.' })
    .regex(/[A-Z]/, { message: '• Password must contain an uppercase letter.' })
    .regex(/\d/, { message: '• Password must contain a number.' })
    .regex(/[^a-zA-Z0-9]/, { message: '• Password must contain a special character.' }),
  confirmPassword: z.string(),
});

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const validatedFields = signupFormSchema.safeParse(formData);
    if (!validatedFields.success) {
      const flatErrors = validatedFields.error.flatten().fieldErrors;
      const allErrors: string[] = [];

      for (const key in flatErrors) {
        const errs = flatErrors[key as keyof typeof flatErrors];
        if (errs) allErrors.push(...errs);
      }

      return NextResponse.json({ errors: allErrors }, { status: 400 });
    }

    const { email, password, confirmPassword } = validatedFields.data;
    if (password !== confirmPassword) {
      return NextResponse.json({ errors: ['• Passwords do not match.'] }, { status: 400 });
    }

    await createUser(email, password);

    return NextResponse.json({ success: true, redirect: '/verify-email' });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ errors: ['Internal server error.'] }, { status: 500 });
  }
}
