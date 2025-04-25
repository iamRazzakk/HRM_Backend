
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../config";
import { ApiError } from "../../error/ApiError";
import { IDepartment } from "./departmentManagement.interface";

const createDepartmentManagementIntoDB = async (name: string, description?: string) => {
    const result = await prisma.department.create({
        data: {
            name,
            description
        }
    })
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Department")
    }
    return result
}



export const departmentService = {
    createDepartmentManagementIntoDB
}