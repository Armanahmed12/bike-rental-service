import { z } from 'zod';

export const bikeSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    pricePerHour: z.number().min(0, 'Price per hour must be at least 0'),
    isAvailable: z.boolean().optional(),
    cc: z.number().min(50, 'CC must be at least 50'),
    year: z.number().int().min(1900, 'Year must be valid'),
    model: z.string().min(1, 'Model is required'),
    brand: z.string().min(1, 'Brand is required'),
  }),
});

export const updateBikeSchema = z.object({
  body: bikeSchema.shape.body.partial(),
});
