import {Router} from "express"
import { 
    registerUser,
    loginUser,
    updateProfile,
    changePassword,
    getProfile
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/userAuth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/profile").get(verifyJWT, getProfile)
router.route("/profile").patch(verifyJWT, updateProfile)
router.route("/change-password").patch(verifyJWT, changePassword)

export default router