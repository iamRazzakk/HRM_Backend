import { prisma } from "../user/user.service"
import { IAttendance } from "./attendanceManagement.interface"

/**
 * */ 

const createAttendanceManagementIntoDB = async(payload:IAttendance) => {
    const today = new Date().toISOString().split('T')[0];
    const timeInDate = new Date(payload.timeIn).toISOString().split('T')[0];
    if (timeInDate !== today) {
        throw new Error("Attendance can only be marked for today.");
    }
    const isExist = await prisma.employee.findFirst({
        where: {
            userId: payload.userId,
            date:payload.timeIn
        }
    })
    if(isExist){
        throw new Error('Attendance already exists for today')
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