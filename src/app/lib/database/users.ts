import { db } from '@/db/client';
import { users } from '@/db/schemas';
import bcrypt from 'bcryptjs';

export async function createUser(email: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
  if (existing) {
    throw new Error('This email is already registered.');
  }

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
    throw new Error('Invalid email or password.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  return {
    id: user.id,
    email: user.email,
  };
}
