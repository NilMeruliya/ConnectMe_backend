import express from "express"
import routeAuth from "./authRoute.js"
import chatRoutes from './chatRoute.js'
import messageRoute from './messageRoute.js'

const router = express.Router();

//http://localhost:8888/auth/register
router.use("/auth", routeAuth);
router.use("/chat", chatRoutes);
router.use("/message", messageRoute);

export default router; 