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
                message: "Either email or phone number is required"
            })
        }

        if (!password?.trim()) {
            return res.status(400).json({
              message: "Password can't be empty",
            })
        }

        const user = await User.findOne({
            $or: [{ email: email?.toLowerCase() }, { phone }]
        })

        if(!user){
            return res.status(404).json({
                message: "No user exists with this email or phone number"
            })
        }

        const isPasswordValid = await user.isPasswordCorrect(password)
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        const loggedUser = await User.findById(user._id).select("-password")

        return res.status(200).json({
            message: "User logged in successfully",
            user: loggedUser,
            token: createToken(loggedUser)
        })

    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({
            message: "Internal Server Error during login",
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        if(!user){
            return res.status(404).json({
                message: "No User Found"
            })
        }

        return res.status(200).json({
            message: "Fetched Successfully",
            user: user
        })
        
    } catch (error) {
        console.error("Server Error during getProfile request: ",error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body

        if(![name,email,phone].every((field) => field?.trim())){
            return res.status(400).json({
                message: "All Fields are required"
            })
        }

        const isEmailExist = await User.findOne({email, _id: {$ne: req.user._id}})
        if(isEmailExist){
            return res.status(400).json({
                message: "Email already in use"
            })
        }

        const isPhoneExist = await User.findOne({phone, _id: {$ne: req.user._id}})
        if(isPhoneExist){
            return res.status(400).json({
                message: "Phone number already in use"
            })
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { 
                name, 
                email, 
                phone 
            },
            {
                new: true
            }
        ).select("-password")

        return res.status(200).json({
            message: "Profile updated successfully",
            user: user
        })


    } catch (error) {
        console.error("Server Error during updating the user profile: ",error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body
        if(!currentPassword || !newPassword){
            return res.status(400).json({
                message: "Both fields are required"
            })
        }

        const user = await User.findById(req.user._id)
        const isPasswordValid = await user.isPasswordCorrect(currentPassword)
        if(!isPasswordValid){
            return res.status(400).json({
                message: "Invalid current password"
            })
        }

        user.password = newPassword
        await user.save({validateBeforeSave: false})

        return res.status(200).json({
            message: "Password updated successfully"
        })
    } catch (error) {
        console.error("Server error while updating the password: ",error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    changePassword
}