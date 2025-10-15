import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { BookingServices } from './booking.service.js';
import httpStatus from 'http-status';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(
    req.user?.userId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

const returnBookedBike = catchAsync(async (req, res) => {
  const result = await BookingServices.retrunBookedBike(
    req?.params?.bikeId as string
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike returned successfully',
    data: result,
  });
});
const getAllBookingDocs = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingDoc();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals Retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  returnBookedBike,
  getAllBookingDocs,
};
