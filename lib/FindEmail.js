import User from "@/schema/User.js";
import connectDB from "./db.js";

const CheckEmail = async (email) => {
  await connectDB();
  try {
    const emailExists = await User.findOne({ email: email }).lean();
    return emailExists;
  } catch (error) {
    console.error(error);
  }
};
export default CheckEmail;
