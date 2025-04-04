import { PrismaClient } from "@prisma/client"
import { generateSalt, hashPasswordWithSalt } from "../../helper/generateSalt"
import { IUser } from "./user.interface"

export const prisma = new PrismaClient()


// create user into db
const createUserIntoDB = async (userData: IUser) => {
    try {
      const salt = generateSalt();
      const hashedPassword = hashPasswordWithSalt(userData.password, salt);
      
      const existingUser = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });
  
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
  
      const user = await prisma.user.create({
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          role: userData.role,
          department: userData.department,
          designation: userData.designation,
          dateOfBirth: new Date(userData.dateOfBirth),
          joiningDate: new Date(userData.joiningDate),
          salary: userData.salary,
          profilePicture: userData.profilePicture,
          createdAt: new Date(),
          password: hashedPassword,  // Storing hashedPassword:salt
        },
      });
      console.log(user)
  
      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${(error as Error).message}`);
    }
  };
  

//   find all users from db
const findUsersFromDB = async()=>{
    const users = await prisma.user.findMany()
    if(users===null){
        throw new Error('Failed to find users')
    }
    return users
}

// delete user from db
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