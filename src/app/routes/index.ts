import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route.js';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { BikeRoutes } from '../modules/bike/bike.route.js';
import { BookingRoutes } from '../modules/booking/booking.route.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
