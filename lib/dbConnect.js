import mongoose from 'mongoose'

const URI_MONGO = process.env.MONGODB_URI

const conectarDB = async() => {
    try {
        await mongoose.connect(URI_MONGO, {
        })
        console.log('mongodb conectado 🚀')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default conectarDB;

const URI = process.env.MONGODB_URL;

