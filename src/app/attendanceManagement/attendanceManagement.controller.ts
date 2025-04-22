import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { attendanceManagementService } from "./attendanceManagement.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createAttendanceManagement = catchAsync(async(req:Request, res:Response)=>{
    const result = req.body
    const payload = await attendanceManagementService.createAttendanceManagementIntoDB(result)
    sendResponse(res, StatusCodes.OK,{
        success:true,
        message:"Employee attendance created successfully",
        data:payload,
    })
})


const getAllAttendanceManagement = catchAsync(async(req:Request, res:Response)=>{
    const payload = await attendanceManagementService.getAllAttendanceManagementFromDB(req.query)
    sendResponse(res, StatusCodes.OK,{
        success:true,
        message:"Employee attendance created successfully",
        meta:payload.meta,
        data:payload.getAll,
    })
}
)

const getSingleAttendanceManagement = catchAsync(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const payload = await attendanceManagementService.getSingleAttendanceManagementFromDB(id)
    sendResponse(res, StatusCodes.OK,{
        success:true,
        message:"Employee attendance created successfully",
        data:payload,
    })
})


const updateAttendanceManagement = catchAsync(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = req.body
    const payload = await attendanceManagementService.updateAttendanceManagementFromDB(id, result)
    sendResponse(res, StatusCodes.OK,{
        success:true,
        message:"Employee attendance created successfully",
        data:payload,
    })
})


const deleteAttendanceManagement = catchAsync(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const payload = await attendanceManagementService.deleteAttendanceManagementFromDB(id)
    sendResponse(res, StatusCodes.OK,{
        success:true,
        message:"Employee attendance created successfully",
        data:payload,
    })
}
)

export const attendanceManagementController = { 
    createAttendanceManagement,
    getAllAttendanceManagement,
    getSingleAttendanceManagement,
    updateAttendanceManagement,
    deleteAttendanceManagement
}