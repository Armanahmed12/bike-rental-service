import z from 'zod';
import { bikeSchema } from './bike.validation.js';

export type TBike = z.infer<typeof bikeSchema>['body'];
