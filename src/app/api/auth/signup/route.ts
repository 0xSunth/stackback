import { NextResponse } from 'next/server';
import { createUser } from '@/app/lib/database/users';
import { AppError } from '@/app/lib/errors';
import { z } from 'zod';

const signupFormSchema = z
  .object({
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
    consent: z.literal(true, {
      errorMap: () => ({ message: '• You must agree to the privacy policy.' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '• Passwords do not match.',
    path: ['confirmPassword'],
  });

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const result = signupFormSchema.safeParse(formData);

    if (!result.success) {
      const errors = Object.values(result.error.flatten().fieldErrors).flat();
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { email, password } = result.data;
    await createUser(email, password);

    return NextResponse.json({ success: true, redirect: '/verify-email' });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ errors: ['• ' + error.message] }, { status: error.statusCode });
    }

    console.error('Signup error:', error);
    return NextResponse.json({ errors: ['Internal server error.'] }, { status: 500 });
  }
}
