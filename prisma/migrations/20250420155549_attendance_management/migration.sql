/*
  Warnings:

  - The values [Manager] on the enum `Designation` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `designation` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "presentStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'ON_LEAVE');

-- AlterEnum
BEGIN;
CREATE TYPE "Designation_new" AS ENUM ('JuniorDeveloper', 'SeniorDeveloper', 'TeamLead', 'MANAGER', 'Director', 'PRESIDENT', 'CEO', 'USER');
ALTER TABLE "User" ALTER COLUMN "designation" TYPE "Designation_new" USING ("designation"::text::"Designation_new");
ALTER TYPE "Designation" RENAME TO "Designation_old";
ALTER TYPE "Designation_new" RENAME TO "Designation";
DROP TYPE "Designation_old";
COMMIT;

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'USER';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "designation" SET NOT NULL,
ALTER COLUMN "designation" SET DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Employee" (
    "employid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeIn" TEXT NOT NULL,
    "timeOut" TEXT NOT NULL,
    "status" "presentStatus" NOT NULL,
    "methodSignIn" TEXT NOT NULL,
    "methodSignOut" TEXT,
    "verifyStatus" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userId_key" ON "Employee"("userId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
