import mongoose from 'mongoose';

const URI_MONGO = process.env.MONGODB_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(URI_MONGO, {});
    console.log('mongodb conectado 🚀');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnect;
