import User from "../models/user.model.js";
import { createToken } from "../utils/jwt.js";

const registerUser = async(req, res) => {
    try {
        const { name, email, phone, password } = req.body
    
        if([name,email,phone,password].some((field) => field?.trim() === "")){
            return res.status(400).json({
                message: "All Fields are required"
            })
        }
    
        const isExist = await User.findOne({email: email.toLowerCase()})
        if(isExist){
            return res.status(409).json({
                message: "User already exist"
            })
        }
    
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            phone,
            password
        })
    
        const createdUser = await User.findById(user._id).select(
            "-password"
        )
        if(!createdUser){
            return res.status(500).json({
                message: "Something went wrong while registering the user"
            })
        }
    
        return res.status(201).json({
            user: createdUser,
            token: createToken(createdUser),
            message: "User Registered Successfully"
        })
    } catch (error) {
        console.error("Error during user registration: ",error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
