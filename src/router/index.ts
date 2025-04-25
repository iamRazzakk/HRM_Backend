import express from 'express';
import { userRoutes } from '../app/user/user.routes';
import { authRoutes } from '../app/auth/auth.route';
import { attendanceManagementRoutes } from '../app/attendanceManagement/attendanceManagement.routes';
import { userManagementRoutes } from '../app/UserManagement/UserManagement.routes';
import { departmentRouter } from '../app/departmentManagement/departmentManagement.routes';
const router = express.Router();

const apiRoutes = [
    {
        path: "/auth",
        route: userRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/",
        route: userManagementRoutes
    },
    {
        path: "/attendance",
        route: attendanceManagementRoutes
    },
    {
        path: "/departments",
        route: departmentRouter
    }
]

apiRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
export default router;
