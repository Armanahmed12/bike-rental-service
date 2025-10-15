import { z } from 'zod';

export const bookingValidationSchema = z.object({
  body: z.object({
    bikeId: z.string().min(1, 'bikeId is required'),
    startTime: z.string().min(1, 'startTime is required'),
  }),
});
