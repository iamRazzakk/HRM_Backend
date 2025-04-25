import { sendResponse } from './../../utils/sendResponse';
import { Response } from 'express';
import { Request } from 'express';
import catchAsync from "../../utils/catchAsync";
import { departmentService } from './departmentManagement.service';
import { StatusCodes } from 'http-status-codes';
import { IDepartment } from './departmentManagement.interface';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
    const result = await departmentService.createDepartmentManagementIntoDB(req.body)
    sendResponse(res, StatusCodes.CREATED, {
        message: "Department Create Successfully",
        success: true,
        data: result
    })
})


const allDepartment = catchAsync(async (req: Request, res: Response) => {
    const result = await departmentService.getAllDepartmentIntoDB(req.query)
    sendResponse(res, StatusCodes.OK, {
        message: "Department retrieve successfully",
        success: true,
        meta: result.meta,
        data: result.data,
    })
})



const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await departmentService.getSingleDepartmentFromDB(id)
    sendResponse(res, StatusCodes.OK, {
        message: "Department retrieve successfully.",
        success: true,
        data: result
    })
})


const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await departmentService.deleteDepartmentIntoDB(id)
    console.log(result);
    sendResponse(res, StatusCodes.OK, {
        message: "Department Delete successfully.",
        success: true,
        data: result
    })
})


const updateDepartmentFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await departmentService.updateDepartmentFromDB(id, req.body);
    sendResponse(res, StatusCodes.OK, {
        message: "Department updated successfully.",
        success: true,
        data: result
    })
})


export const departmentController = {
    createDepartment,
    allDepartment,
    getSingleDepartment,
    deleteDepartment,
    updateDepartmentFromDB
}