import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URL;
let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    console.log(`db is already connected`);
    return;
  }
  try {
    isConnected = mongoose.connections[0].readyState === 1;
    await mongoose.connect(MONGODB_URI);
    console.log(`db is connected `);
    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export default connectDB;
