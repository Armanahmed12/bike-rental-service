import { Router } from 'express';
import { BikeControllers } from './bike.controller.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { bikeSchema, updateBikeSchema } from './bike.validation.js';
import auth from '../../middlewares/auth.js';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(bikeSchema),
  BikeControllers.createBike
);

router.get('/', BikeControllers.getAllBikes);

router.put(
  '/:bikeId',
  auth('admin'),
  validateRequest(updateBikeSchema),
  BikeControllers.updateBike
);

router.delete('/:bikeId', auth('admin'), BikeControllers.deleteBike);

export const BikeRoutes = router;
