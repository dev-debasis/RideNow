import { Admin } from "../models/admin.model.js";
import { createToken } from "../utils/jwt.js";

const registerAdmin = async(req, res) => {
    try {
        const { name, email, phone, password } = req.body
    
        if(![name,email,phone,password].every((field) => field?.trim())){
            return res.status(400).json({
                message: "All Fields are required"
            })
        }
    
        const isExist = await Admin.findOne({
            $or: [{ email: email.toLowerCase() }, {phone}]
        })
        if(isExist){
            return res.status(409).json({
                message: "Admin already exist"
            })
        }
    
        const admin = await Admin.create({
            name,
            email: email.toLowerCase(),
            phone,
            password
        })
    
        const createdAdmin = await Admin.findById(admin._id).select(
            "-password"
        )
        if(!createdAdmin){
            return res.status(500).json({
                message: "Something went wrong while registering the Admin"
            })
        }
    
        return res.status(201).json({
            message: "Admin Registered Successfully",
            admin: createdAdmin,
            token: createToken(createdAdmin),
        })
    } catch (error) {
        console.error("Error during admin registration: ",error)
        console.log(error.message)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const loginAdmin = async (req, res) => {
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

        const admin = await Admin.findOne({
            $or: [{ email: email?.toLowerCase() }, { phone }]
        })

        if(!admin){
            return res.status(404).json({
                message: "No admin exists with this email or phone number"
            })
        }

        const isPasswordValid = await admin.isPasswordCorrect(password)
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        const loggedAdmin = await Admin.findById(admin._id).select("-password")

        return res.status(200).json({
            message: "Admin logged in successfully",
            admin: loggedAdmin,
            token: createToken(loggedAdmin)
        })

    } catch (error) {
        console.error("Error during admin login:", error);
        return res.status(500).json({
            message: "Internal Server Error during login",
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id).select("-password")
        if(!admin){
            return res.status(404).json({
                message: "No Admin Found"
            })
        }

        return res.status(200).json({
            admin: admin
        })
    } catch (error) {
        console.error("Server error: ",error)
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

        const isEmailExist = await Admin.findOne({email, _id: {$ne: req.admin._id}})
        if(isEmailExist){
            return res.status(400).json({
                message: "Email already in use"
            })
        }

        const isPhoneExist = await Admin.findOne({phone, _id: {$ne: req.admin._id}})
        if(isPhoneExist){
            return res.status(400).json({
                message: "Phone number already in use"
            })
        }

        const admin = await Admin.findByIdAndUpdate(
            req.admin._id,
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
            admin: admin
        })


    } catch (error) {
        console.error("Server Error during updating the admin profile: ",error)
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

        const admin = await Admin.findById(req.admin._id)
        const isPasswordValid = await admin.isPasswordCorrect(currentPassword)
        if(!isPasswordValid){
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        admin.password = newPassword
        await admin.save({validateBeforeSave: false})

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
    registerAdmin,
    loginAdmin,
    getProfile,
    updateProfile,
    changePassword
}