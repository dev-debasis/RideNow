import { stripe } from '../config/stripe.config.js'
import { Payment } from '../models/payment.model.js'
import { Booking } from '../models/booking.model.js'

const createPaymentIntent = async (req, res) => {
    try {
        if(!req.user || !req.user._id){
            return res.status(401).json({
                message: "Unauthenticated User"
            })
        }

        const userId = req.user._id

        const { amount, currency = 'INR', bookingId, paymentMethod = 'upi' } = req.body
        if(!amount || !bookingId){
            return res.status(400).json({
                message: "Amount and BookingId are required"
            })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency,
            payment_method_types: [paymentMethod],
            metadata: {
                bookingId,
                userId: String(userId)
            }
        })

        return res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        })
    } catch (error) {
        console.error("Server error while creating the payment intent")
        return res.status(500).json({
            message: error.message
        })
    }
}

const confirmAndSavePayment = async (req, res) => {
    try {
        const { 
            bookingId,
            amount,
            paymentIntentId,
            currency,
            paymentMethod
        } = req.body

        const userId = req.user._id

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
        if (!paymentIntent) {
            return res.status(404).json({ 
                message: "PaymentIntent not found" 
            });
        }

        const receiptUrl = paymentIntent.charges?.data?.[0]?.receipt_url || req.body.receiptUrl

        switch(paymentIntent.status){
            case 'succeeded': 
                const newPayment = await Payment.create({
                    userId,
                    bookingId,
                    amount,
                    currency,
                    paymentMethod,
                    paymentStatus: 'succeeded',
                    paymentIntentId,
                    metadata: paymentIntent.metadata,
                    receiptUrl
                })

                const booking = await Booking.findByIdAndUpdate(
                    bookingId,
                    { 
                        bookingStatus: 'confirmed'
                    },
                    {
                        new: true
                    }
                )
                .populate({
                    path: 'userId',
                    select: 'name email'
                })
                .populate({
                    path: 'carId',
                    select: 'name brand model'
                })

                const receipt = await generateReceipt(booking, paymentIntent)

                return res.status(200).json({
                    message: "Payment confirmed successfully - Booking confirmed",
                    newPayment,
                    booking,
                    receipt
                })
            case 'processing': 
                return res.status(202).json({
                    message: "payment is in processing "
                })
            case 'require_payment_method': 
                return res.status(400).json({
                    message: "payment failed"
                })
            default:
                return res.status(400).json({
                    message: `Payment status: ${paymentIntent.status}, Please contact support`
                })
                
        }
    } catch (error) {
        console.error("Server error during confirmAndSavePayment")
        return res.status(500).json({
            message: error.message
        })
    }
}

const allPaymentHistory = async (req, res) => {
    try {
        if(!req.user || !req.user._id){
            return res.status(401).json({
                message: "Unauthenticated User"
            })
        }
        const userId = req.user._id
        const paymentHistory = await Payment.find({ userId })
        if(!paymentHistory){
            return res.status(404).json({
                message: "No record found"
            })
        }
        return res.status(200).json({
            message: "Payment history fetched successfully",
            paymentHistory
        })
    } catch (error) {
        console.error("Server error while fetching user payment history",error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export {
    createPaymentIntent,
    confirmAndSavePayment,
    allPaymentHistory
}