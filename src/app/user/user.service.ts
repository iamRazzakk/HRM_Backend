
import { hashPassword } from "../../helper/generateSalt"
import { IUser } from "./user.interface"
import { Role } from "../../enum/role";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../config";




// create user into db
const createUserIntoDB = async (userData: IUser) => {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password using bcrypt
    const hashedPassword = await hashPassword(userData.password);

    // Create user with hashed password
    const user = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        // @ts-ignore
        role: userData.role,
        // @ts-ignore
        department: userData.department,
        // @ts-ignore
        designation: userData.designation,
        dateOfBirth: new Date(userData.dateOfBirth),
        joiningDate: new Date(userData.joiningDate),
        salary: userData.salary,
        profilePicture: userData.profilePicture,
        createdAt: new Date(),
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    throw new Error(`Failed to create user: ${(error as Error).message}`);
  }
};


//   find all users from db
const findUsersFromDB = async () => {
  const users = await prisma.user.findMany()
  if (users === null) {
    throw new Error('Failed to find users')
  }
  return users
}

// delete user from db
const deleteUserFromDB = async (userId: string) => {
  const user = await prisma.user.delete({
    where: {
      id: userId
    }
  })
  if (!user) {
    throw new Error('Failed to delete user')
  }
  return user
}

// update userProfile
const updateProfileIntoDB = (payload: any) => {
  const user = prisma.user.update({
    where: {
      id: payload.id
    },
    data: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      address: payload.address,
      password: payload.password,
      profilePicture: payload.profilePicture,

    }
  })
}



export const userService = {
  createUserIntoDB,
  findUsersFromDB,
  deleteUserFromDB,
  updateProfileIntoDB
}