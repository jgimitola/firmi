import mongoose from "mongoose";

const ChartSchema = new mongoose.Schema({

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    date: {
        type: Date,
        default: Date.now
    }

})

export default mongoose.models.Chart || mongoose.model('Chart', ChartSchema)