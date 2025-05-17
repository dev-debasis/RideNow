import { Booking } from '../models/booking.model.js'
import { Car } from '../models/car.model.js'

const createBooking = async (req, res) => {
    try {

        if(!req.user || !req.user._id){
            return res.status(401).json({
                message: "Unauthenticated User"
            })
        }

        const { 
            carId,
            userId,
            pickupLocation, 
            dropoffLocation, 
            pickupDateTime, 
            dropoffDateTime, 
            totalAmount
        } = req.body

        const startDateTime = new Date(pickupDateTime)
        const endDateTime = new Date(dropoffDateTime)

        if(isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())){
            return res.status(400).json({
                message: "Invalid Date Format"
            })
        }

        if(startDateTime >= endDateTime){
            return res.status(400).json({
                message: "Pickup must be before dropoff"
            })
        }

        const car = await Car.findById(carId)
        if(!car){
            return res.status(404).json({
                message: "Car not found"
            })
        }

        if(car.status !== 'available'){
            return res.status(400).json({
                message: "Car is not available for booking"
            })
        }

        const existingBooking = await Booking.findOne({
            carId,
            bookingStatus: { $nin: ['cancelled', 'completed'] },
            pickupDateTime: { $lt: endDateTime},
            dropoffDateTime: { $gt: startDateTime}
        })
        if(existingBooking){
            return res.status(400).json({
                message: "Car is already booked for the selected period"
            })
        }

        const booking = await Booking.create({
            carId,
            userId,
            pickupDateTime: startDateTime,
            dropoffDateTime: endDateTime,
            pickupLocation,
            dropoffLocation,
            totalAmount,
            bookingStatus: 'pending'
        })

        return res.status(201).json({
            data: {
                _id: booking._id,
                carId: booking.carId,
                userId: booking.userId,
                pickupDateTime: booking.pickupDateTime,
                dropoffDateTime: booking.dropoffDateTime,
                pickupLocation,
                dropoffLocation,
                totalAmount: booking.totalAmount,
                bookingStatus: booking.bookingStatus
            }
        })
    } catch (error) {
        console.error("Server Error during create booking", error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const updateBookingStatus = async (req, res) => {
    try {
        if(!req.user || !req.user._id){
            return res.status(401).json({
                message: "Unauthenticated user"
            })
        }

        const { bookingStatus } = req.body
        const validStatus = ['pending', 'confirmed', 'cancelled', 'completed']
        if(!validStatus.includes(bookingStatus)){
            return res.status(400).json({
                message: "Invalid Status"
            })
        }

        const booking = await Booking.findById(req.params.bookingId)
        if(!booking){
            return res.status(404).json({
                message: "No booking exists with this booking id"
            })
        }
        if(booking.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "You are not allowed to update this bookings"
            })
        }

        booking.bookingStatus = bookingStatus
        const updatedBooking = await booking.save({ validateBeforeSave: false })

        return res.status(200).json({
            message: "Booking status updated",
            updatedBooking
        })
    } catch (error) {
        console.error('Server error during update booking status')
        return res.status(500).json({
            message: error.message
        })
    }
}

const getUserBookings = async (req, res) => {
    try {
       if(!req.user || !req.user._id){
            return res.status(401).json({
                message: "Unauthenticated User"
            })
        }

        const userId = req.user._id
        const bookings = await Booking.find({userId})
            .populate({
                path: 'carId',
                select: 'name brand model year price image fuelType transmission seats features'
            })
            .sort({
                createdAt: -1
            })

        const formattedBooking = bookings.map(booking => ({
            _id: booking._id,
            userId: booking.userId,
            bookedCar: booking.carId,
            pickupDateTime: booking.pickupDateTime,
            dropoffDateTime: booking.dropoffDateTime,
            totalAmount: booking.totalAmount,
            bookingStatus: booking.bookingStatus
        }))

        return res.status(200).json({
            message: "Fetched all bookings",
            bookings: formattedBooking
        })
    } catch (error) {
        console.error("Server error while fetching the user booking")
        return res.status(500).json({
            message: error.message
        })
    }
}

const getBookingById = async (req, res) => {
    try {
        if(!req.user || !req.user._id){
            return res.status(401).json({
                message: "Unauthenticated User"
            })
        }

        const { bookingId } = req.params
        if(!bookingId){
            return res.status(400).json({
                message: "Please sent the booking id"
            })
        }

        const booking = await Booking.findById(bookingId)
            .populate({
                path: 'carId',
                select: 'name brand model image'
            })
        if(!booking){
            return res.status(404).json({
                message: "No booking exists with this Booking id"
            })
        }

        return res.status(200).json({
            message: "Booking fetched through booking id",
            booking
        })
    } catch (error) {
        console.error("Server error while fetching the booking through id")
        return res.status(500).json({
            message: error.message
        })
    }
}

const cancelBooking = async (req, res) => {
    try {
        if(!req.user || !req.user._id){
            return res.status(401).json({
                message: "Unauthenticated user"
            })
        }

        const booking = await Booking.findById(req.params.bookingId)
        if(!booking){
            return res.status(404).json({
                message: "No booking exists with this booking id"
            })
        }
        if(booking.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "You are not allowed to cancel this booking"
            })
        }
        if(['cancelled', 'completed'].includes(booking.bookingStatus)){
            return res.status(400).json({
                message: `Booking is already finalized, current status: ${booking.bookingStatus}`
            })
        }

        booking.bookingStatus = 'cancelled'
        const updatedBooking = await booking.save({ validateBeforeSave: false })

        return res.status(200).json({
            message: "Booking cancelled",
            updatedBooking
        })
    } catch (error) {
        console.error("Server error during booking cancellation")
        return res.status(500).json({
            message: error.message
        })
    }
}

export {
    createBooking,
    updateBookingStatus,
    getUserBookings,
    getBookingById,
    cancelBooking
}