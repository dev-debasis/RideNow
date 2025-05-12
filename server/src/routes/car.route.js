import Router from "express"
import { 
    addCar,
    getAllCars,
    getCarById,
    getCarImage,
    searchCars
} from "../controllers/car.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/adminAuth.middleware.js"

const router  = Router()

router.route("/").get(searchCars)
router.route("/all").get(getAllCars)
router.route("/add").post(verifyJWT, upload.single('image'), addCar)
router.route("/:id").get(getCarById)
router.route("/image/:id").get(getCarImage)

export default router