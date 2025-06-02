import { NextResponse } from 'next/server';
import { createUser } from '@/app/lib/database/users';
import { AppError } from '@/app/lib/errors';
import { signupFormSchema } from '@/app/lib/validation/signupFormSchema';

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
