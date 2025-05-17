import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema({
  carId: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pickupDateTime: {
    type: Date,
    required: true
  },
  dropoffDateTime: {
    type: Date,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  dropoffLocation: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export const Booking = mongoose.model('Booking', bookingSchema);
