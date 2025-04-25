import { userManagementController } from './UserManagement.controller';
import { Router } from "express";

const router = Router()


// TODO: need to use there authentication base on role base..
router.get("/users", userManagementController.getAllUser)

//  TODO: need to do role base auth later
router.get("/user/:id", userManagementController.getSingleUser)


// TODO: need to do use auth later
router.patch("/user/:id", userManagementController.deleteUserFromDB)

// TODO: need to do use auth later
router.patch("/user/restore/:id", userManagementController.restoreUser)

export const userManagementRoutes = router