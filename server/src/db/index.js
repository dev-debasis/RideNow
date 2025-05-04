import mongoose  from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        console.log(`✅ MongoDB connected!!`)
        console.log("DB HOST: ",connectionInstance.connection.host)
    } catch (error) {
        console.error("❌ MongoDB connection failed: ",error)
        process.exit(1)
    }
}

export {connectDB}