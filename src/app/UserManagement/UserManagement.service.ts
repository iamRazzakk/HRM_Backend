import { StatusCodes } from "http-status-codes"
import { ApiError } from "../../error/ApiError"
import { prisma } from "../user/user.service"
import QueryBuilder from "../../helper/QueryBuilder"

const getAllUsersFromDB = async (query: Record<string, any>) => {
    const result = await new QueryBuilder(prisma.user, query).search(["name", "email"]).filter().sort().paginate().execute()
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No user found")
    }
    return result;
}


export const userManagementService = {
    getAllUsersFromDB
}