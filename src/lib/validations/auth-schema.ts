import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please enter a valid email address.' })
    .max(255, { message: 'Email must be less than 255 characters.' })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(128, { message: 'Password must be less than 128 characters.' }),
  rememberMe: z.boolean().default(false),
});

export type LoginInput = z.infer<typeof LoginSchema>;