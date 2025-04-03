import { Router } from "express";
import { userController } from "./uesr.controller";

const router = Router();

router.get("/user", userController.getUsers)
router.post("/user", userController.createUser)
router.delete("/user/:id", userController.deleteUser)


export const userRoutes = router