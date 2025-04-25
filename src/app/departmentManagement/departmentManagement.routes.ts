import { Router } from "express";
import { departmentController } from "./departmentManagement.controller";

const route = Router()

// TODO: need to do role base authentication
route.post("/", departmentController.createDepartment)
route.get("/", departmentController.allDepartment)
route.get("/:id", departmentController.getSingleDepartment)
route.patch("/:id", departmentController.updateDepartmentFromDB)
route.delete("/id", departmentController.deleteDepartment)

export const departmentRouter = route