
import express from 'express';
import { signup, login, verifyOTP, sendOTPVerificationEmail, forgotPassword, resetPassword } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/verifyOTP', verifyOTP);

// can be used to resend verify signup email
router.post('/sendOTP', sendOTPVerificationEmail);

// can be used to resend change password email
router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

export default router;
