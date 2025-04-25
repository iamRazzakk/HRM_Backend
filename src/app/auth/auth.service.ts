import { prisma } from "../user/user.service";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../helper/jwtHelper";
import { comparePassword } from "../../helper/generateSalt";
import { ILoginData, ILoginResponse } from "./auth.interface";



const loginUserIntoDB = async (loginData: ILoginData): Promise<ILoginResponse> => {
  const user = await prisma.user.findUnique({
    where: { email: loginData.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePassword(loginData.password, user.password!);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Generate tokens without storing refreshToken in DB
  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
    email: user.email!,
  });

  return {
    accessToken
  };
};

const refreshAccessToken = async (refreshToken: string) => {
  // Verify the refresh token without DB check
  const decoded = verifyRefreshToken(refreshToken);

  // Optionally: You could add a check if user still exists
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return generateAccessToken({
    userId: user.id,
    role: user.role,
    email: user.email!,
  });
};



export const authService = {
  loginUserIntoDB,
  refreshAccessToken,
};