import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const createUserIntoDB =async (userData:IUser)=>{
const user = await prisma.user.create({
    data:userData
})
if(!user){
    throw new Error('Failed to create user')
}
return user
}
const findUsersFromDB = async()=>{
    const users = await prisma.user.findMany()
    if(users===null){
        throw new Error('Failed to find users')
    }
    return users
}


const deleteUserFromDB = async(userId:string)=>{
    const user = await prisma.user.delete({
        where:{
            id:userId
        }
    })
    if(!user){
        throw new Error('Failed to delete user')
    }
    return user
}


export const userService = {
    createUserIntoDB,
    findUsersFromDB,
    deleteUserFromDB
}