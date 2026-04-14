import { hash } from "bcrypt";

export const HashPassword = async (password, roundOfSoults) => {
  const hashPass = await hash(password, roundOfSoults);
  return hashPass;
};
