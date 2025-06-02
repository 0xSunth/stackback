import { z } from 'zod';

export const signupFormSchema = z
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
