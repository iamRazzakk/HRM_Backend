import { userManagementController } from './UserManagement.controller';
import { Router } from "express";

const router = Router()

router.get("/users", userManagementController.getAllUser)



export const userManagementRoutes = router