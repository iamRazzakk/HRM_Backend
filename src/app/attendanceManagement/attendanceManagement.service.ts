import { prisma } from "../user/user.service"
import { IAttendance } from "./attendanceManagement.interface"

const createAttendanceManagementIntoDB = async(payload:IAttendance) => {
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

const getAllAttendanceManagementFromDB = async()=>{
    const getAll = await prisma.employee.findMany({
        include:{
            user:{
                select:{
                    firstName:true,
                    lastName:true,
                    email:true,
                    id:true,
                }
            }   
        }
    })
    if(!getAll){
        throw new Error('Failed to get all attendance')
    }
    return getAll
}


export const attendanceManagementService = {
    createAttendanceManagementIntoDB,
    getAllAttendanceManagementFromDB
}