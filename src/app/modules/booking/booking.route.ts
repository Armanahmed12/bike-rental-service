import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { bookingValidationSchema } from './booking.validation.js';
import { BookingControllers } from './booking.controller.js';

const router = Router();

router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(bookingValidationSchema),
  BookingControllers.createBooking
);

router.put(
  '/:bikeId/return',
  auth('admin'),
  BookingControllers.returnBookedBike
);

router.get('/', auth('admin', 'user'), BookingControllers.getAllBookingDocs);

export const BookingRoutes = router;
