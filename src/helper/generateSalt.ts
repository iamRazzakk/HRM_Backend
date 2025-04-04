import crypto from "crypto";
import config from "../config";

// Generate Salt function
export const generateSalt = (): string => {
  const saltRounds = parseInt(config.BCRYPT_SALT_ROUNDS as string, 10);
  if (isNaN(saltRounds) || saltRounds <= 0) {
    throw new Error("Invalid BCRYPT_SALT_ROUNDS value in config");
  }
  return crypto.randomBytes(saltRounds).toString("hex");
};

// Hash Password with Salt function
export const hashPasswordWithSalt = (password: string, salt: string): string => {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${hash}:${salt}`;  // Storing hash:salt together
};

// Compare Password with Salt function
export const comparePasswordWithSalt = (inputPassword: string, storedHashedPassword: string): boolean => {
  // Assuming the stored password format is hash:salt
  const salt = generateSalt()
  const [storedHash] = storedHashedPassword.split(":"); // Extract hash and salt

  console.log("Stored Hash:", storedHash);
  console.log("Salt:", salt);

  if (!salt) {
    throw new Error("No salt found in the stored password");
  }

  // Recreate the hash from the input password and the extracted salt
  const inputHash = crypto.pbkdf2Sync(inputPassword, salt, 100000, 64, "sha512").toString("hex");

  console.log("Input Password Hash:", inputHash);

  // Compare the hashes
  const isMatch = inputHash === storedHash;
  console.log("Password Match:", isMatch);

  return isMatch;
};
