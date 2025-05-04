import jwt from "jsonwebtoken"

const createToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            phone: user.phone
        }, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRY}
    )
}

export {createToken}