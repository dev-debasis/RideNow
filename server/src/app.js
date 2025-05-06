import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"
import adminRouter from "./routes/admin.route.js"

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

app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)

export { app }