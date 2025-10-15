import { User } from '../user/user.model.js';
// import { TLoginUser } from './auth.interface.js';
import httpStatus from 'http-status';
// import { createToken } from './auth.utils.js';
// import { config } from '../../config/index.js';
import { IUser } from '../user/user.interface.js';
import { TLoginUser } from './auth.interface.js';
import AppError from '../../errors/AppError.js';
import { createToken } from './auth.utils.js';
import { config } from '../../config/index.js';
// import { MyJwtPayload } from '../../interface/index.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const { email } = payload;
  const user = await User.doesUserExist(email);
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No user is found with the given email address'
    );
  }

  const doesPasswordMatch = await User.doesPasswordMatch(
    payload.password,
    user.password
  );

  if (!doesPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password doesn't match");
  }

  const jwtPayload = {
    userId: user._id as string,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
    user,
  };
};

const userSingUp = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};
export const AuthServices = {
  loginUser,
  userSingUp,
};
