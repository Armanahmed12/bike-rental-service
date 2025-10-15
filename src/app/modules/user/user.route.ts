import { Router } from 'express';
import { UserControllers } from './user.controller.js';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { updateUserValidationSchema } from './user.validation.js';

const router = Router();

router.get('/me', auth('admin', 'user'), UserControllers.getYourProfile);

router.put(
  '/me',
  auth('admin', 'user'),
  validateRequest(updateUserValidationSchema),
  UserControllers.updateUserProfile
);

export const UserRouter = router;
