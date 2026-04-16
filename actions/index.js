"use server";
import connectDB from "@/Lib/db.js";
import CheckEmail from "@/Lib/FindEmail.js";
import { HashPassword } from "@/Lib/hashPassword.js";
import { SignUp } from "@/Lib/validation.js";
import User from "@/schema/User.js";

const formater = (data) => JSON.parse(JSON.stringify(data));
export const signUpAction = async (formData) => {
  await connectDB();
  try {
    console.log(formData);

    const validData = SignUp.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (!validData.success) {
      return { success: false, message: validData.error.flatten().fieldErrors };
    }
    const { name, email, password } = validData.data;
    const userExists = await CheckEmail(email);
    if (userExists) {
      return {
        success: false,
        message: "A user with this email already exists",
      };
    }
    const hashPassword = await HashPassword(password, 12);
    const CreatedUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    return {
      success: true,
      message: "User created Successfully.",
      data: formater(CreatedUser),
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "something went wrong" };
  }
};
