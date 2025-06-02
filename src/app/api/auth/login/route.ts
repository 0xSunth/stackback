import { NextResponse } from 'next/server';
import { loginUser } from '@/app/lib/database/users';
import { AppError } from '@/app/lib/errors';
import { createSessionResponse } from '@/app/lib/server/session';
import { loginFormSchema } from '@/app/lib/validation/loginFormSchema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginFormSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { email, password } = result.data;
    const user = await loginUser(email, password);

    return await createSessionResponse(user.id.toString(), '/dashboard');
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { errors: { email: ['• ' + error.message] } },
        { status: error.statusCode },
      );
    }

    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
