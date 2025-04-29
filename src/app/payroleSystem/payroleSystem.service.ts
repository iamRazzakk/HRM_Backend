import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../error/ApiError";
import { IPayroleSystem } from "./payroleSystem.interface";
import { PrismaQueryBuilder } from "../../utils/queryBuilder";
import { prisma } from "../../config";

const createPayroleSystemIntoDB = async(payload:IPayroleSystem)=>{
const result = await prisma.payroleSystem.create({
    data:{
        employeeId:payload.employeId,
        month:payload.month,
        totalWorkingDay:payload.totalWorkingDay,
        dailyRate:payload.dailyRate,
        baseSalary:payload.baseSalary,
        status: payload.status,
    }
})
    if(!result){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create")
    }
    return result
}


// TODO need to complete base on doc
const getAllPayroleFromDB = async(query:Record<string, any>)=>{
const result = new PrismaQueryBuilder<IPayroleSystem>
// TODO: Need to input here query name later
(query).search(["status"]).filter().paginate()

const {where, take, skip} = result.build();
const getAll = await prisma.payroleSystem.findMany({
    where,
    take,
    skip,
    include:{
        attendenceRecord:{
            select:{

            }
        }
    }
})
}




export const payroleSystemService= {
    createPayroleSystemIntoDB,
    getAllPayroleFromDB
}