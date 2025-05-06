import { Router } from "express"
import { 
    loginAdmin, 
    registerAdmin,
    updateProfile,
    changePassword,
    getProfile
} from "../controllers/admin.controller.js"
import { verifyJWT } from "../middlewares/adminAuth.middleware.js"

const router = Router()

router.route("/register").post(registerAdmin)
router.route("/login").post(loginAdmin)
router.route("/profile").patch(verifyJWT, updateProfile)
router.route("/profile").get(verifyJWT, getProfile)
router.route("/change-password").patch(verifyJWT, changePassword)

export default router