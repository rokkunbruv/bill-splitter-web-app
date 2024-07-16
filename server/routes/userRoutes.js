
import express from 'express';
import { signup, login, verifyOTP, resendOTP } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/verifyOTP', verifyOTP);

router.post('/resendOTP', resendOTP);

export default router;
