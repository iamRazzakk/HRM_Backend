/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'HR', 'Employee', 'Manager', 'Intern');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations');

-- CreateEnum
CREATE TYPE "Designation" AS ENUM ('JuniorDeveloper', 'SeniorDeveloper', 'TeamLead', 'Manager', 'Director');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "department" "Department" NOT NULL DEFAULT 'HR',
ADD COLUMN     "designation" "Designation",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "joiningDate" TIMESTAMP(3),
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Employee',
ADD COLUMN     "salary" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
