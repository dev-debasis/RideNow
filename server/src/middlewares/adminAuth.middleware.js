import { verifyToken } from "../utils/jwt.js"
import { Admin } from "../models/admin.model.js"

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

        const admin = await Admin.findById(decodedToken.id)

        if(!admin){
            return res.status(401).json({
                message: "Invalid or expired Token"
            })
        }

        req.admin = admin
        next()

    } catch (error) {
        console.error("Something went wrong in the server side in the admin auth middleware: ",error)
    }
}

export { verifyJWT }