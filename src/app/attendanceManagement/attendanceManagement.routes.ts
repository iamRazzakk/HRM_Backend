import { Router } from "express";
import { attendanceManagementController } from "./attendanceManagement.controller";

const route = Router();

route.post("/create-attendance", attendanceManagementController.createAttendanceManagement)
route.get("/", attendanceManagementController.getAllAttendanceManagement)

export const attendanceManagementRoutes = route;