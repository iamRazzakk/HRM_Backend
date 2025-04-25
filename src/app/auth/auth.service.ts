
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../helper/jwtHelper";
import { comparePassword } from "../../helper/generateSalt";
import { ILoginData, ILoginResponse } from "./auth.interface";
import { ApiError } from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../config";



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
  if (user.isDeleted === true) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User Ban from Admin")
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