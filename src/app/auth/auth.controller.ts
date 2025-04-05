import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";
import { Request, Response } from "express";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.loginUserIntoDB({ email, password });
    
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'User logged in successfully',
      data: {
        accessToken: result.accessToken,
      }
    });
  });
  
  const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshAccessToken(refreshToken);
    
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Access token refreshed successfully',
      data: { accessToken }
    });
  });
  
  
  export const authController = {
    loginUser,
    refreshToken,
  };