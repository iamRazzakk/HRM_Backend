import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

/**
 * @desc Create a new user
 * @route POST /api/v1/users
 * @access Public
 */

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.body;
    const result = await userService.createUserIntoDB(user)
    sendResponse(res, StatusCodes.OK, {
        success: true,
        message: 'User created successfully',
        data: result
    })
}
)
const getUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.findUsersFromDB()
    sendResponse(res, StatusCodes.OK, {
        success: true,
        message: 'Users retrieved successfully',
        data: result
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await userService.deleteUserFromDB(userId)
    sendResponse(res, StatusCodes.OK, {
        success: true,
        message: 'User deleted successfully',
        data: result
    })
})


const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id
    const result = await userService.updateProfileIntoDB(userId)
    sendResponse(res, StatusCodes.OK, {
        message: "User Data update successfully",
        success: true,
        data: result
    })
})

export const userController = {
    createUser,
    getUsers,
    deleteUser,
    updateUserProfile
}