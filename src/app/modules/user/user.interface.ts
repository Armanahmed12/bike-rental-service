import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant.js';
import z from 'zod';
import { userValidationSchema } from './user.validation.js';

export type IUser = z.infer<typeof userValidationSchema>['body'];

export interface UserModel extends Model<IUser> {
  doesUserExist(email: string): Promise<IUser | null>;
  doesPasswordMatch(
    plainTextPswd: string,
    hashedPswd: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
