/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError.js';
import Bike from '../bike/bike.model.js';
import { TBooking, TUltimateBookingData } from './booking.interface.js';
import { Booking } from './booking.model.js';
import httpStatus from 'http-status';

const createBookingIntoDB = async (userId: string, payload: TBooking) => {
  const bookingData: TUltimateBookingData = {
    userId,
    bikeId: payload.bikeId,
    startTime: payload.startTime,
    returnTime: null,
    totalCost: 0,
    isReturned: false,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create booking inside the session
    const [createdBookingDoc] = await Booking.create([bookingData], {
      session,
    });

    if (!createdBookingDoc) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Booking!');
    }

    // Update bike availability (from the realted bike doc) inside the same transaction
    const updatedBike = await Bike.findByIdAndUpdate(
      createdBookingDoc.bikeId,
      { isAvailable: false },
      { new: true, runValidators: true, session }
    );

    if (!updatedBike) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to update the bike's availability!"
      );
    }

    // Commit transaction
    await session.commitTransaction();
    return createdBookingDoc;
  } catch (error: any) {
    console.log('Transaction failed! Rolling back...', error);
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

// return the booked Bike
const retrunBookedBike = async (id: string) => {
  const bookingDoc = await Booking.findById(id);
  if (!bookingDoc) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'No booking doc is found with your id!'
    );
  }

  //calculate the totalcost for renting
  const currentTime = new Date();
  const utcTime = currentTime.toISOString();
  const bookingLocalTime = new Date(bookingDoc?.startTime).toLocaleString(
    'en-BD',
    { timeZone: 'Asia/Dhaka' }
  );

  // difference in milliseconds
  const diffMs = currentTime.getTime() - new Date(bookingLocalTime).getTime();
  // convert to hours
  const diffHours = diffMs / (1000 * 60 * 60);

  // total cost
  const theBikeThatBooked = await Bike.findById(bookingDoc.bikeId);
  if (!theBikeThatBooked) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'No booked bike is found with bikeId!'
    );
  }

  const pricePerHour = theBikeThatBooked?.pricePerHour;
  const totalCost = Math.round(diffHours * pricePerHour);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updateTheBookingDoc = await Booking.findByIdAndUpdate(
      id,
      {
        returnTime: utcTime,
        totalCost: totalCost,
        isReturned: true,
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!updateTheBookingDoc) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to return the booked bike'
      );
    }

    const updateTheBookedBikeDoc = await Bike.findByIdAndUpdate(
      theBikeThatBooked,
      {
        isAvailable: true,
      },
      { new: true, runValidators: true, session }
    );
    if (!updateTheBookedBikeDoc) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to return the booked bike'
      );
    }
    // Commit transaction
    await session.commitTransaction();
    return updateTheBookingDoc;
  } catch (error) {
    console.log('Transaction failed! Rolling back...', error);
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

// get all bookings from db
const getAllBookingDoc = async () => {
  const result = await Booking.find();
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  retrunBookedBike,
  getAllBookingDoc,
};
