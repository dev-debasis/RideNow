import dotenv from 'dotenv'
dotenv.config()
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localPath) => {
    try {
        if(!localPath){
            throw new Error("Can't fetch the local file path")
        }

        const uploadResponse = await cloudinary.uploader.upload(localPath, {
            resource_type: "image"
        })
        console.log("File uploaded successfully")

        fs.unlinkSync(localPath)
        return uploadResponse
    } catch (error) {
        if(fs.existsSync(localPath)){
            fs.unlinkSync(localPath)
        }
        console.error("Cloudinary Upload Error:", error);
        return null
    }
}
  
export { uploadOnCloudinary }