import express from "express"
import routeAuth from "./authRoute.js"

const router = express.Router();

//http://localhost:8888/auth/register
router.use("/auth", routeAuth);

export default router; 