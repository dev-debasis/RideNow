import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

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

app.get("/", (req, res) => {
    res.send("Check")
})

export {app}