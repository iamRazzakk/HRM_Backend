/*
  Warnings:

  - Added the required column `status` to the `PayroleSystem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "payRoleStatus" AS ENUM ('DRAFT', 'ISSUED', 'PAID');

-- AlterTable
ALTER TABLE "PayroleSystem" ADD COLUMN     "status" "payRoleStatus" NOT NULL;
