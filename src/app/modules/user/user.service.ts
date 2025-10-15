import { IUser } from './user.interface.js';
import { User } from './user.model.js';

const updateUserProfile = async (userId: string, payload: Partial<IUser>) => {
  const result = User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const UserServices = {
  updateUserProfile,
};
