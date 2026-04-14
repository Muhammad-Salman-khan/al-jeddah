import { compare } from "bcryptjs";

const ComparePass = async (credentials, dbPassword) => {
  try {
    const isPasswordCorrect = await compare(credentials?.password, dbPassword);
    return isPasswordCorrect;
  } catch (error) {
    console.error(error);
  }
};

export default ComparePass;
