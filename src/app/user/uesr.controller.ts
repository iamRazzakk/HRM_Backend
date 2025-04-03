import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req:Request, res:Response) => {
try {
    const user = req.body;
    const result = await userService.createUserIntoDB(user)
    res.status(200).json({
        success: true,
        message: 'User created successfully',
        data: result
    })
} catch (error) {
    console.log("failed to create user", error)
    res.status(500).json({
        success: false,
        message: 'Failed to create user',
})
}}



const getUsers = async (req:Request, res:Response) => {
    try {
        const result = await userService.findUsersFromDB()
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: result
        })
    } catch (error) {
        console.log("failed to get users", error)
        res.status(500).json({
            success: false,
            message: 'Failed to get users',
        })
    }
}

export const userController = {
    createUser,
    getUsers
}