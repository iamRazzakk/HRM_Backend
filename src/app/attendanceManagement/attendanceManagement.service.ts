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


export const attendanceManagementService = {
    createAttendanceManagementIntoDB
}