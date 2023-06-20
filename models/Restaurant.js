import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
})

export default mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema)