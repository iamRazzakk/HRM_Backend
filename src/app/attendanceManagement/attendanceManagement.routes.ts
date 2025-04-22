import { Router } from "express";
import { attendanceManagementController } from "./attendanceManagement.controller";

const router = Router();

router.post("/create-attendance", attendanceManagementController.createAttendanceManagement)
router.get("/", attendanceManagementController.getAllAttendanceManagement)
router.get("/:id", attendanceManagementController.getSingleAttendanceManagement)

export const attendanceManagementRoutes = router;