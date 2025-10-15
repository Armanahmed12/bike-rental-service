import z from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.email().min(1, 'Email is is required'),
    password: z.string().min(1, 'password is required'),
  }),
});

export const AtuhValidation = {
  loginValidationSchema,
};
