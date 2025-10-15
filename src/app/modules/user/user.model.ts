import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface.js';
import bcrypt from 'bcrypt';
import { config } from '../../config/index.js';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: 0 },
    phone: { type: Number, unique: true, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
    },
  },
  {
    toJSON: { virtuals: false },
    toObject: { virtuals: false },
    timestamps: true,

    statics: {
      async doesUserExist(email: string) {
        return await this.findOne({ email }).select('+password');
      },
      async doesPasswordMatch(plainTextPswd: string, hashedPswd: string) {
        return await bcrypt.compare(plainTextPswd, hashedPswd);
      },
    },
  }
);

// pre save middleware
userSchema.pre('save', async function (next) {
  const user = this as IUser;

  // Only hash the password if it’s new or modified
  try {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
    next();
  } catch (err) {
    next(err as Error);
  }
});

// post save middleware
userSchema.post('save', async function (doc, next) {
  doc.password = ''; // hide hashed password
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
