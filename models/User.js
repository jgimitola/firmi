import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 50
    },
    age: {
        type: Number,
        required: false,
        maxlength: 3,
    },
    gender: {
        type: String,
        required: false,
        maxlength: 50
    },

})

export default mongoose.models.User || mongoose.model('User', UserSchema)

