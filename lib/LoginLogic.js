import ComparePass from "./compare.js";
import CheckEmail from "./FindEmail.js";
import { signInSchema } from "./validation.js";

const loginChecker = async (credentials) => {
  try {
    // zod validation's for
    const { email, password } = await signInSchema(credentials);
    // checking email if user exists in the db or not
    const user = await CheckEmail(email);
    if (!user) {
      throw new Error("User does not exist's");
    }
    // checking pass from user and comparing from db pass by decypting
    const checkPass = await ComparePass(password, user.password);
    if (!checkPass) {
      throw new Error("Invalid credentials.");
    }
    // if exist than return user else  throw error
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export default loginChecker;
