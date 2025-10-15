import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { BikeServices } from './bike.service.js';
import httpStatus from 'http-status';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike added successfully',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});
const updateBike = catchAsync(async (req, res) => {
  const { bikeId } = req.params;
  const result = await BikeServices.updateBikeIntoDB(
    bikeId as string,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes updated successfully',
    data: result,
  });
});
const deleteBike = catchAsync(async (req, res) => {
  const { bikeId } = req.params;
  const result = await BikeServices.deleteBikeFromDB(bikeId as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
};
