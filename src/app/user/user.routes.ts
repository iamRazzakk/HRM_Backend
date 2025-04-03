import { Router } from "express";
import { userController } from "./uesr.controller";

const router = Router();

router.get("/user", userController.getUsers)
router.post("/user", userController.createUser)



export const userRoutes = router