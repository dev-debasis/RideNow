import mongoose, { Schema } from 'mongoose'

const paymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    paymentMethod: {
        type: String,
        enum: ['upi', 'card', 'netbanking'],
        default: 'upi'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'succeeded', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentIntentId: {
        type: String,
        required: true
    },
    metadata: {
        type: Schema.Types.Mixed,
        default: {}
    },
    receiptUrl: {
        type: String
    },
    refundId: {
        type: String,
        default: null
    },
    errorMessage: {
        type: String,
        default: null
    }
},
{
    timestamps: true
})

export const Payment = mongoose.model('Payment', paymentSchema)