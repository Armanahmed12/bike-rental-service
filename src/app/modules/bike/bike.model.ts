import { model, Schema } from 'mongoose';
import { TBike } from './bike.interface.js';

// 2️⃣ Define the Mongoose schema
const bikeSchema = new Schema<TBike>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    cc: { type: Number, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
  },
  { timestamps: true }
);

bikeSchema.index({ name: 1, model: 1, brand: 1 }, { unique: true });

// 3️⃣ Create the model
const Bike = model<TBike>('Bike', bikeSchema);
export default Bike;
