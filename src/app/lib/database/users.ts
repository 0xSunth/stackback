import { db } from '@/db';
import { users } from '@/schema/users';
import bcrypt from 'bcryptjs';
import { AppError } from '@/lib/errors';

export async function createUser(email: string, password: string) {
  const existing = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
  if (existing) {
    throw new AppError('Email already in use', 409);
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await db
    .insert(users)
    .values({
      email,
      passwordHash,
    })
    .returning();

  return result[0];
}

export async function loginUser(email: string, password: string) {
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  return {
    id: user.id,
    email: user.email,
  };
}
