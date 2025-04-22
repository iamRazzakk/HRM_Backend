import { Router } from "express";
import { attendanceManagementController } from "./attendanceManagement.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../enum/userRole";

const router = Router();

router.post("/create-attendance", attendanceManagementController.createAttendanceManagement)
router.get("/",auth(USER_ROLE.Admin), attendanceManagementController.getAllAttendanceManagement)
router.get("/:id", attendanceManagementController.getSingleAttendanceManagement)
router.patch("/:id", attendanceManagementController.updateAttendanceManagement)
router.delete("/:id", attendanceManagementController.deleteAttendanceManagement)

export const attendanceManagementRoutes = router;