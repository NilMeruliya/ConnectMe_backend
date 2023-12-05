import express from "express";
import trimRequest from "trim-request";
import authMiddleware from '../middleware/auth.middleware.js'
import { createGroup, createOpenChat, getChats,  } from "../controller/chatController.js";


const router = express.Router();

router.route("/").post(trimRequest.all, authMiddleware, createOpenChat);
router.route("/").get(trimRequest.all, authMiddleware, getChats);
router.route("/group").post(trimRequest.all, authMiddleware, createGroup);

export default router;