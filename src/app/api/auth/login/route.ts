import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/db/client';
import { createSessionResponse } from '@/app/lib/server/session';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().trim(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedFields = loginFormSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          errors: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = validatedFields.data;

    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (!user) {
      return NextResponse.json(
        {
          errors: {
            email: ['Invalid email or password.'],
          },
        },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          errors: {
            password: ['Invalid email or password.'],
          },
        },
        { status: 401 },
      );
    }

    return await createSessionResponse(user.id, '/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
