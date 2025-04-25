import { ApiError } from './../../error/ApiError';
import { StatusCodes } from "http-status-codes"
import QueryBuilder from "../../helper/QueryBuilder"
import { prisma } from '../../config';

const getAllUsersFromDB = async (query: Record<string, any>) => {
    const result = await new QueryBuilder(prisma.user, query).search(["name", "email"]).filter().sort().paginate().execute()
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No user found")
    }
    return result;
}



const getSingleUserFromDB = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            firstName: true,
            lastName: true,
            email: true,
            dateOfBirth: true,
            joiningDate: true,
            phone: true
        }
    })
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No user Found!")
    }
    return result
}

// ! Delete user

const deleteUserFromDB = async (id: string) => {
    const existingUser = await prisma.user.findUnique({
        where: { id }
    });
    if (!existingUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    if (existingUser.isDeleted) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User is already deleted");
    }

    const result = await prisma.user.update({
        where: { id },
        data: {
            isDeleted: true,
        }
    })
    return result
}


//* restore user from db
const restoreUserFromDB = async (id: string) => {
    const isExistingUser = await prisma.user.update({
        where: { id },
        data: {
            isDeleted: false
        }
    })
    if (!isExistingUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to restore user")
    }
    return isExistingUser;
}


export const userManagementService = {
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    restoreUserFromDB
}