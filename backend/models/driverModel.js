import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  vehiclePlate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Pending', 'Suspended'],
    default: 'Pending'
  },
  currentLocation: {
    type: {
      lat: Number,
      lng: Number
    },
    default: null
  },
  rating: {
    type: Number,
    default: 0
  },
  totalTrips: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("driver", driverSchema);