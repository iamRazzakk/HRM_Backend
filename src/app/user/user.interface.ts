import { Designation } from "../../enum/degisnation";
import { Department } from "../../enum/department";

export type IUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone:string;
    address: string;
    role: "Admin" | "HR" | "Employee"| "Manager"| "Intern";
    department: Department | undefined;
    designation: Designation | undefined;
    dateOfBirth: Date;
    joiningDate: Date;
    salary?: number;
    profilePicture?: string;
    password: string;
    createdAt: Date;
}