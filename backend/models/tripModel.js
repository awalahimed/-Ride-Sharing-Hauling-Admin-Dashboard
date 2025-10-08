import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'driver',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: true
  },
  pickup: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  destination: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['Requested', 'Accepted', 'InProgress', 'Completed', 'Cancelled'],
    default: 'Requested'
  },
  fare: {
    type: Number,
    default: 0
  },
  distance: {
    type: Number,
    default: 0
  },
  startTime: Date,
  endTime: Date,
  rating: Number,
  feedback: String
}, { timestamps: true });

export default mongoose.model("trip", tripSchema);