import { comparePasswordWithSalt } from "../../helper/generateSalt";
import { IUser } from "../user/user.interface";
import { prisma } from "../user/user.service";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
const loginUserIntoDB = async (loginData: IUser) => {
    const { email, password } = loginData;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
  
    console.log('Stored Password:', user.password); // Log the stored password
  
    const isPasswordValid = comparePasswordWithSalt(password, user.password); // This will trigger logs inside the function
    console.log('Password Valid:', isPasswordValid);
  
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
  
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
  
    const { password: _, ...userWithoutPassword } = user;
  
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  };

export const authService = {
    loginUserIntoDB,
}


