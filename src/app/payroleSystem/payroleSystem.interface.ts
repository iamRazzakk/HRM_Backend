export type IPayroleSystem = {
    employeId:string,
    month:string
    totalWorkingDay:string,
    dailyRate:string;
    baseSalary:string;
    attendenceRecord:any
    status: "DRAFT" | "ISSUED" | "PAID"
    createAt:Date
}