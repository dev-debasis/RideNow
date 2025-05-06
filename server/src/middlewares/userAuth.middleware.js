import { verifyToken } from "../utils/jwt.js"
import { User } from "../models/user.model.js"

const verifyJWT = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization")
        if(!authHeader){
            return res.status(401).json({
                message: "Authorization is missing"
            })
        }

        if(!authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Token must be a Bearer token"
            })
        }

        const token = authHeader.split(" ")[1]
        if(!token){
            return res.status(401).json({
                message: "Token not provided"
            })
        }

        const decodedToken = verifyToken(token)
        if(!decodedToken){
            return res.status(401).json({
                message: "Token is either invalid or expired"
            })
        }

        const user = await User.findById(decodedToken.id)

        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }

        req.user = user
        next()

    } catch (error) {
        console.error("Something went wrong in the server side in the user auth middleware: ",error)
    }
}

export { verifyJWT }