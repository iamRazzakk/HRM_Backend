import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const loginUser = catchAsync(async(req:Request, res:Response)=>{
    const {email, password}=req.body;
    const result = await authService.loginUserIntoDB({email, password})
    sendResponse(res, StatusCodes.OK,{
        success:true,
        message:'User logged in successfully',
        data:result
    })  
})



export const authController = {
    loginUser
}