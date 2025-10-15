import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../errors/AppError.js';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { User } from '../modules/user/user.model.js';
import { MyJwtPayload } from '../interface/index.js';
import { TUserRole } from '../modules/user/user.interface.js';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized (token not found)'
      );
    }

    //   check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as MyJwtPayload;

    const { userId, role } = decoded;
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }

    if (requiredRoles && !requiredRoles.includes(role as TUserRole)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not Authorized (role)'
      );
    }

    req.user = decoded as MyJwtPayload;
    next();
  });
};

export default auth;
