import express from "express";
import trimRequest from "trim-request";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMessages, sendMessages } from "../controller/messageController.js";

const router = express.Router();

router.route("/").post(trimRequest.all, authMiddleware, sendMessages);
router.route("/:chatId").get(trimRequest.all, authMiddleware, getMessages);

export default router;