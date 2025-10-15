import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { AuthServices } from './auth.service.js';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { user, accessToken } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token: accessToken,
    data: user,
  });
});

const signUpUser = catchAsync(async (req, res) => {
  const result = await AuthServices.userSingUp(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  signUpUser,
};
