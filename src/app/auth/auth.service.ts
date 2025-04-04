import { IUser } from "../user/user.interface";
import { prisma } from "../user/user.service";
import * as crypto from 'crypto';

const loginUserIntoDB = async (user: IUser) => {
    const { email, password } = user;
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (!existingUser) {
        throw new Error('User not found');
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (existingUser.password !== hashedPassword) {
        throw new Error('Invalid password');
    }
};

export const authService = {
    loginUserIntoDB,
}