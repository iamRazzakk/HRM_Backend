import express from 'express';
import { userRoutes } from '../app/user/user.routes';
const router = express.Router();

const apiRoutes = [
    {
        path:"/auth",
        route:userRoutes
    }
]

apiRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
export default router;
