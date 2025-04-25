import { userManagementService } from './UserManagement.service';
import { Request, Response } from 'express';
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes'

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userManagementService.getAllUsersFromDB(req.query)
    sendResponse(res, StatusCodes.OK, {
        message: "Retrieve All User",
        success: true,
        data: result
    })
})



export const userManagementController = {
    getAllUser
}