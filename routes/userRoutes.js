import express from 'express';
import { createUser, loginUser, verifyUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', createUser);
router.post('/user/login', loginUser);
router.post('/user/verify', verifyUser);

export default router;
