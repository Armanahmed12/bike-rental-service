import { TBike } from './bike.interface.js';
import Bike from './bike.model.js';

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikesFromDB = async () => {
  const result = await Bike.find();
  return result;
};

const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBikeFromDB = async (id: string) => {
  const result = await Bike.findByIdAndUpdate(
    id,
    { isAvailable: false },
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
