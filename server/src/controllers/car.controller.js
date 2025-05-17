import { Car } from "../models/car.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const addCar = async (req, res) => {
     try {

        if(!req.body || !req.file){
            return res.status(400).json({
                message: "Missing image or car data"
            })
        }

        const carImageLocalPath = req.file?.path

        if(!carImageLocalPath){
            return res.status(400).json({
                message: "Car Image is required"
            })
        }

        const carImage = await uploadOnCloudinary(carImageLocalPath)
        console.log("carImage response of upload on cloudinary: ",carImage)

        if(!carImage){
            return res.status(400).json({
                message: "Upload car image on cloudinary failed"
            })
        }


        const car = await Car.create({
            name: req.body.name,
            model: req.body.model,
            brand: req.body.brand,
            year: req.body.year,
            price: req.body.price,
            seats: req.body.seats,
            fuelType: req.body.fuelType,
            transmission: req.body.transmission,
            category: req.body.category,
            status: req.body.status,
            image: carImage.secure_url,
            features: req.body.features,
        })

        return res.status(201).json({
            message: "Car added successfully",
            car: car
        })

    } catch (error) {
        console.error("Server Error while adding the car: ",error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const getAllCars = async (req, res) => {
     try {
        const allCars = await Car.find().sort({ createdAt: -1 });

        if(!allCars){
            return res.status(404).json({
                message: "No car found"
            })
        }

        return  res.status(200).json({
            message: "All cars are fetched",
            cars: allCars
        })
    } catch (error) {
        console.error("Server Error while fetching all cars: ",error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const getCarById = async (req, res) => {
     try {
        const car = await Car.findById(req.params.id)    
        if(!car){
            return res.status(404).json({
                message: "No car found"
            })
        }

        const carDetails = {
            id: car._id,
            name: car.name,
            brand: car.brand,
            price: car.price,
            image: car.image,
            category: car.category,
            isAvailable: (car.status === 'available'),
            status: car.status,
            features: car.features || [],
            transmission: car.transmission,
            fuelType: car.fuelType,
            seatingCapacity: car.seats,
        }

        return res.status(200).json({
            message: "Car Fetched by Id",
            car: carDetails
        })
    } catch (error) {
        console.error("Server Error while fetching the car through id: ",error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const searchCars = async (req, res) => {
     try {
        const {
            search,
            category,
            priceRange,
            sortBy = 'name',
            page = 1,
            limit = 12,
        } = req.query

        let  query = {}

        if(search){
            query.$or = [
                {name: { $regex: search, $options: 'i' }},
                {category: { $regex: search, $options: 'i' }}
            ]
        }

        if(category){
            query.category = category
        }

        if(priceRange){
            switch (priceRange) {
                case 'under50':
                    query.price = { $lt: 50};
                    break;
            
                case '50to100':
                    query.price = { $gte: 50, $lt: 100};
                    break;
            
                case 'over100':
                    query.price = { $gte: 100};
                    break;
            
                default:
                    break;
            }
        }

        let sortOptions = {}

        switch(sortBy){
            case 'price-low': 
                sortOptions = { price: 1}
                break
            case 'price-high':
                sortOptions = { price: -1}
                break
            default:
                sortOptions = { name: 1}
        }

        const skip = (parseInt(page) - 1) * parseInt(limit)

        const cars = await Car.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .select("name price image category status features power speed transmission fuelType seats model year brand")

        const totalItems = await Car.countDocuments(query)
        const categories = await Car.distinct('category')

        const formattedCars = cars.map(car => ({
            id: car._id,
            name: car.name,
            price: car.price,
            image: car.image,
            category: car.category,
            status: car.status,
            features: car.features || [],
            transmission: car.transmission,
            fuelType: car.fuelType,
            seatingCapacity: car.seats
        }))

        return res.status(200).json({
            message: "Cars fetched",
            cars: formattedCars,
            pagination: {
                currentPage: parseInt(page),
                totalPage: Math.ceil(totalItems/limit),
                totalItems
            },
            categories
        })

    } catch (error) {
        console.error("Server Error while searching the cars: ",error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const getCarImage = async (req, res) => {
     try {
        const car = await Car.findById(req.params.id)
        const carImageUrl = car.image

        if(!car || !car.image){
            return res.status(404).json({
                message: "Car image not found"
            })
        }

        return res.status(200).json({
            message: "Car image fetched",
            imageUrl: carImageUrl
        })
    } catch (error) {
        console.error("Server Error while fetching the car image: ",error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export {
    addCar,
    getAllCars,
    getCarById,
    searchCars,
    getCarImage
}