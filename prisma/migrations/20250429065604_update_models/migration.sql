/*
  Warnings:

  - The values [JuniorDeveloper,SeniorDeveloper,TeamLead,MANAGER,Director,PRESIDENT,CEO,USER] on the enum `Designation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Designation_new" AS ENUM ('Junior', 'Mid', 'Senior', 'Lead', 'Intern');
ALTER TABLE "User" ALTER COLUMN "designation" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "designation" TYPE "Designation_new" USING ("designation"::text::"Designation_new");
ALTER TYPE "Designation" RENAME TO "Designation_old";
ALTER TYPE "Designation_new" RENAME TO "Designation";
DROP TYPE "Designation_old";
ALTER TABLE "User" ALTER COLUMN "designation" SET DEFAULT 'Intern';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "designation" SET DEFAULT 'Intern';

-- CreateTable
CREATE TABLE "Designation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Designation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
