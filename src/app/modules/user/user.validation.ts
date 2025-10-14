import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.email().min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'password needs at least 8 characters')
    .max(20, { message: 'Password can not be more than 20 characters' }),
  phone: z.number().min(1, 'password is required'),
  address: z.string().min(1, 'address is required'),
  role: z.enum(['admin', 'user']),
});

export const updateUserValidationSchema = z.object({
  name: z.string().min(1, 'name is required'),
  phone: z.number().min(1, 'password is required'),
  address: z.string().min(1, 'address is required'),
});
