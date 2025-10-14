import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant.js';
import z from 'zod';
import { userValidationSchema } from './user.validation.js';

export type IUser = z.infer<typeof userValidationSchema>;

export interface UserModel extends Model<IUser> {
  doesUserExistByEmail(is: string): Promise<IUser | null>;
}

export type TUserRole = keyof typeof USER_ROLE;
