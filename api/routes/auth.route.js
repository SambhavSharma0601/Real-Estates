import express from 'express';
import { google, signOut, signin, signup ,forgotPassword, verifyCode, updatePassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut);
router.post('/forgot-password', forgotPassword);
router.post('/verify-code', verifyCode);
router.post('/update-password', updatePassword);

export default router;