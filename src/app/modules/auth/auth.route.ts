import { Router } from 'express';
import { AuthControllers } from './auth.controller.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { AtuhValidation } from './auth.validation.js';
import { userValidationSchema } from '../user/user.validation.js';

const router = Router();

router.post(
  '/login',
  validateRequest(AtuhValidation.loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  '/signup',
  validateRequest(userValidationSchema),
  AuthControllers.signUpUser
);
export const AuthRoutes = router;
