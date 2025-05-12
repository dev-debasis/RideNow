import mongoose, { Schema } from "mongoose"

const carSchema = new Schema({
    name: {
        type: String,
        required: [true, "Car name is required"]
    },
    brand: {
        type: String,
        required: [true, "Please add brand name"]
    },
    model: {
        type: String,
        required: [true, "Please add car model"]
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: [true, "Please add price/day"]
    },
    seats: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true,
        enum: ['petrol', 'diesel', 'electric', 'hybrid'],
        default: 'petrol'
    },
    transmission: {
        type: String,
        required: true,
        enum: ['manual', 'automatic'],
        default: 'manual'
    },
    category: {
        type: String,
        required: true,
        enum: ['suv', 'sedan', 'hatchback', 'coupe', 'van'],
        default: 'suv'
    },
    status: {
        type: String,
        enum: ['available', 'rented', 'maintenance'],
        default: 'available'
    },
    image: {
        type: String,
        required: [true, "Pleas add car image"]
    },
    features: [
        {
            type: String,
        }
    ]
},
{
    timestamps: true
})

export const Car = mongoose.model("Car", carSchema)