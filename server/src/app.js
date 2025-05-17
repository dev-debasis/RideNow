import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"
import adminRouter from "./routes/admin.route.js"
import carRouter from "./routes/car.route.js"
import bookingRouter from "./routes/booking.routes.js"
import paymentRouter from "./routes/payment.route.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(urlencoded({
    extended: true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/car", carRouter)
app.use("/api/v1/booking", bookingRouter)
app.use("/api/v1/payment", paymentRouter)

export { app }