import { Types } from 'mongoose';

export type TBooking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime?: Date | null;
  totalCost: 0;
  isReturned: false;
};

export type TUltimateBookingData = {
  userId: string;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: null;
  totalCost: number;
  isReturned: boolean;
};
