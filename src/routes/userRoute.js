import express from 'express';
import trimRequest from 'trim-request';
import authMiddleware from '../middleware/auth.middleware.js';
import { findUsers} from '../controller/userController.js';

 const router = express.Router();
 router.route('/').get(trimRequest.all, authMiddleware, findUsers)
 export default router;
 