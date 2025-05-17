import Router from 'express'
import { verifyJWT } from '../middlewares/userAuth.middleware.js'
import { 
    allPaymentHistory,
    confirmAndSavePayment,
    createPaymentIntent
} from '../controllers/payment.controller.js'

const router = Router()

router.route("/create-intent").post(verifyJWT, createPaymentIntent)
router.route("/confirm").post(verifyJWT, confirmAndSavePayment)
router.route("/history").get(verifyJWT, allPaymentHistory)

export default router