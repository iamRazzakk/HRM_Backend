-- CreateTable
CREATE TABLE "PayroleSystem" (
    "employid" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "totalWorkingDay" TEXT NOT NULL,
    "dailyRate" TEXT NOT NULL,
    "baseSalary" TEXT NOT NULL,

    CONSTRAINT "PayroleSystem_pkey" PRIMARY KEY ("employid")
);

-- AddForeignKey
ALTER TABLE "PayroleSystem" ADD CONSTRAINT "PayroleSystem_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employid") ON DELETE RESTRICT ON UPDATE CASCADE;
