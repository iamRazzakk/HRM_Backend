import express from 'express';
import { userRoutes } from '../app/user/user.routes';
import { authRoutes } from '../app/auth/auth.route';
const router = express.Router();

const apiRoutes = [
    {
        path:"/auth",
        route:userRoutes
    },
    {
        path:"/auth",
        route:authRoutes
    }
]

apiRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
export default router;
