import { User } from "../models/user.model.js";
import { createToken } from "../utils/jwt.js";

const registerUser = async(req, res) => {
    try {
        const { name, email, phone, password } = req.body
    
        if(![name,email,phone,password].every((field) => field?.trim())){
            return res.status(400).json({
                message: "All Fields are required"
            })
        }
    
        const isExist = await User.findOne({
            $or: [{ email: email.toLowerCase() }, {phone}]
        })
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
        console.log(error.message)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        
        const { email, phone, password } = req.body

        if(!email && !phone){
            return res.status(400).json({
                message: "Either Email or Phone number required"
            })
        }

        if(!password){
            return res.status(400).json({
                message: "Password can't be empty"
            })
        }

        const user = await User.findOne({
            $or: [{ email }, { phone }]
        })
        if(!user){
            return res.status(404).json({
                message: "No user exist with this email/phone"
            })
        }

        const isPasswordValid = await user.isPasswordCorrect(password)
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Password doesn't match"
            })
        }

        const loggedUser = await User.findById(user._id).select("-password")

        return res.status(200).json({
            message: "User LoggedIn Successfully",
            user: loggedUser,
            token: createToken(loggedUser)
        })

    } catch (error) {
        console.error("Error During user logging: ",error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while logging the user"
        })
    }
}

export {
    registerUser,
    loginUser
}