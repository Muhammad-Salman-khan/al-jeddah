import User from "@/schema/User.js";

const CheckEmail = async (email) => {
  try {
    const emailExists = await User.findOne({ email: email }).lean();
    return emailExists;
  } catch (error) {
    console.error(error);
  }
};
export default CheckEmail;
