import { Router } from 'express'
import { 
    cancelBooking,
    createBooking, 
    getBookingById, 
    getUserBookings, 
    updateBookingStatus 
} from '../controllers/booking.controller.js'
import { verifyJWT } from "../middlewares/userAuth.middleware.js"

const router = Router()

router.route('/create').post(verifyJWT, createBooking)
router.route('/update/:bookingId').patch(verifyJWT, updateBookingStatus)
router.route('/all').get(verifyJWT, getUserBookings)
router.route('/:bookingId').get(verifyJWT, getBookingById)
router.route('/cancel/:bookingId').patch(verifyJWT, cancelBooking)

export default router