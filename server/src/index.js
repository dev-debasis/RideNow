import { app } from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./db/index.js"

dotenv.config()

const PORT = process.env.PORT || 3000

connectDB()
.then(() => {
    app.listen(PORT, (req, res) => {
        console.log(`🚀 Server is listening on: http://localhost:${PORT}`)
    })
})
.catch((error) => {
    console.log("❌ Database Connection Failed: ",error)
})