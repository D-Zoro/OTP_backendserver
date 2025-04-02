import express from 'express';
import { registerUser, verifyotp_reg, completeRegistration } from '../controllers/authentication.js';

const router = express.Router();

// Route to register a user (send OTP)
router.post('/register', registerUser);

// Route to verify the OTP
router.post('/verify-otp', verifyotp_reg);

// Route to complete the registration (after OTP verification)
// router.post('/complete-registration', completeRegistration);

export default router;