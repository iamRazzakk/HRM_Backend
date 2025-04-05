import config from "../config";
import bcrypt from "bcrypt";

// Hash Password with bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = parseInt(config.BCRYPT_SALT_ROUNDS as string, 10);
  if (isNaN(saltRounds) || saltRounds <= 0) {
    throw new Error("Invalid BCRYPT_SALT_ROUNDS value in config");
  }
  return await bcrypt.hash(password, saltRounds);
};

// Compare Password with bcrypt
export const comparePassword = async (
  inputPassword: string,
  storedHash: string
): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, storedHash);
};