import { StatusCodes } from "http-status-codes";
import { prisma } from "../../config";
import { ApiError } from "../../error/ApiError";
import { IDepartment } from "./departmentManagement.interface";
import QueryBuilder from "../../helper/QueryBuilder";

const createDepartmentManagementIntoDB = async (payload: IDepartment) => {
    if (!payload.name) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Input department name.!")
    }

    // Check if department with same name already exists
    const existingDepartment = await prisma.department.findFirst({
        where: {
            name: payload.name
        }
    });

    if (existingDepartment) {
        throw new ApiError(StatusCodes.CONFLICT, "Department with this name already exists")
    }

    const result = await prisma.department.create({
        data: {
            name: payload.name,
            description: payload.description
        }
    })
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Department")
    }
    return result
}




const getAllDepartmentIntoDB = async (query: Record<string, any>) => {
    const result = await new QueryBuilder(prisma.department, query).search(["name"]).filter().sort().paginate().execute()
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No data found")
    }
    return result
}



const getSingleDepartmentFromDB = async (id: string) => {
    const result = await prisma.department.findUnique({
        where: {
            id: id
        },
        select: {
            name: true,
            description: true
        }
    })
    console.log(result);
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No data found")
    }
    return result
}



const deleteDepartmentIntoDB = async (id: string) => {
    const result = await prisma.department.delete({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true
        }
    })
    return result
}


const updateDepartmentFromDB = async (id: string, payload: IDepartment) => {
    const result = await prisma.department.update({
        where: {
            id: id
        },
        data: {
            name: payload.name,
            description: payload.description
        }
    })
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to update department")
    }
    return result
}


export const departmentService = {
    createDepartmentManagementIntoDB,
    getAllDepartmentIntoDB,
    getSingleDepartmentFromDB,
    deleteDepartmentIntoDB,
    updateDepartmentFromDB
}