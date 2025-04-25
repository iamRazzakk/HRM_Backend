import { sendResponse } from './../../utils/sendResponse';
import { userManagementService } from './UserManagement.service';
import { Request, Response } from 'express';
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from 'http-status-codes'

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userManagementService.getAllUsersFromDB(req.query)
    sendResponse(res, StatusCodes.CREATED, {
        message: "Retrieve All User",
        success: true,
        meta: result.meta,
        data: result.data
    })
})


const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userManagementService.getSingleUserFromDB(id)
    sendResponse(res, StatusCodes.OK, {
        success: true,
        message: "User retrieve successfully",
        data: result
    })
})


const deleteUserFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userManagementService.deleteUserFromDB(id)
    sendResponse(res, StatusCodes.OK, {
        success: true,
        message: "User delete successfully",
        data: result.isDeleted
    })
})



const restoreUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userManagementService.restoreUserFromDB(id)
    sendResponse(res, StatusCodes.ACCEPTED, {
        message: "Restore user Successfully",
        success: true,
        data: result
    })
})



export const userManagementController = {
    getAllUser,
    getSingleUser,
    deleteUserFromDB,
    restoreUser
}