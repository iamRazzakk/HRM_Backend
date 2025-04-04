    import crypto from "crypto"
    import config from "../config"
    export const generateSalt = (): string => {
        const saltRounds = parseInt(config.BCRYPT_SALT_ROUNDS as string, 10);
        if (isNaN(saltRounds) || saltRounds <= 0) {
            throw new Error("Invalid BCRYPT_SALT_ROUNDS value in config");
        }
        return crypto.randomBytes(saltRounds).toString("hex");
    };



    export const hashPasswordWithSalt = (password: string, salt: string): string => {
        return crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex")
    }