import express from "express";
import trimRequest from "trim-request"; // it trims all the spaces from sides
import { register, login, logout, tokenRefresh } from "../controller/authController.js";

const router = express.Router();

// router.post("register", (req, res) => {
//     res.send("hello")
// })

// or 

router.route("/register").post(trimRequest.all, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/tokenRefresh").post(trimRequest.all, tokenRefresh);


export default router;