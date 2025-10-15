import httpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { User } from './user.model.js';
import { UserServices } from './user.service.js';

const getYourProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user?.userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Profile retrived successfully',
    data: user,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserProfile(
    req.user?.userId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'profile updated successfully',
    data: result,
  });
});

export const UserControllers = {
  getYourProfile,
  updateUserProfile,
};
