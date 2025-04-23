import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../error/ApiError";
import { prisma } from "../user/user.service"
import { IAttendance } from "./attendanceManagement.interface"
import { PrismaQueryBuilder } from "../../utils/queryBuilder";

/**
 * */ 

const createAttendanceManagementIntoDB = async(payload:IAttendance) => {
 
    const userExists = await prisma.user.findUnique({
        where: { id: payload.userId },
      });
    
      if (!userExists) {
        throw new ApiError(StatusCodes.BAD_REQUEST,"❌ User not found!");
      }
    
    const create = await prisma.employee.create({
        data:{
            user: {
                connect: { id: payload.userId }
              },
              date: payload.date,
              timeIn: payload.timeIn,
              timeOut: payload.timeOut,
              status: payload.status,
              methodSignIn: payload.methodSignIn,
              methodSignOut: payload.methodSignOut,
              verifyStatus: payload.verifyStatus,
        }
    })
    if(!create){
        throw new Error('Failed to create attendance')
    }
    return create
}

const getAllAttendanceManagementFromDB = async(query:Record<string,any>)=>{
    const queryBuilder = new PrismaQueryBuilder<IAttendance>(query)
    .search(['status', 'methodSignIn', 'methodSignOut'])
    .filter()
    .paginate();
    const { where, take, skip } = queryBuilder.build();

    const getAll = await prisma.employee.findMany({
    where,
    take,
    skip,
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          id: true,
        },
      },
    },
});
    if(!getAll){
        throw new ApiError(StatusCodes.BAD_REQUEST,'Failed to get all attendance')
    }
    const meta = await queryBuilder.getMeta(prisma.employee);
    return {meta,getAll}
}

const getSingleAttendanceManagementFromDB = async(id:string)=>{
    const singleOne = await prisma.employee.findUnique({
        where:{
            employid:id
        }
    })
    if(!singleOne){
        throw new ApiError(StatusCodes.BAD_REQUEST,'Failed to get single attendance')
    }
    return singleOne
}



// delete 
const deleteAttendanceManagementFromDB = async(id:string)=>{
    const deleteOne = await prisma.employee.delete({
        where:{
            employid:id
        }
    })
    if(!deleteOne){
        throw new ApiError(StatusCodes.BAD_REQUEST,'Failed to get single attendance')
    }
    return deleteOne
}

const updateAttendanceManagementFromDB = async (
    id: string,
    payload: Partial<IAttendance>
  ) => {
    const updateData: any = {};
  
    if (payload.userId) {
      updateData.user = {
        connect: { id: payload.userId }
      };
    }
  
    if (payload.date) updateData.date = payload.date;
    if (payload.timeIn) updateData.timeIn = payload.timeIn;
    if (payload.timeOut) updateData.timeOut = payload.timeOut;
    if (payload.status) updateData.status = payload.status;
    if (payload.methodSignIn) updateData.methodSignIn = payload.methodSignIn;
    if (payload.methodSignOut) updateData.methodSignOut = payload.methodSignOut;
    if (typeof payload.verifyStatus === 'boolean') {
      updateData.verifyStatus = payload.verifyStatus;
    }
  
    const updateOne = await prisma.employee.update({
      where: { employid: id },
      data: updateData,
    });
  
    if (!updateOne) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update attendance');
    }
  
    return updateOne;
  };
  


export const attendanceManagementService = {
    createAttendanceManagementIntoDB,
    getAllAttendanceManagementFromDB,
    getSingleAttendanceManagementFromDB,
    deleteAttendanceManagementFromDB,
    updateAttendanceManagementFromDB
}