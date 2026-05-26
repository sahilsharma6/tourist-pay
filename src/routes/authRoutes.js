import express from 'express';
import { signup, login, getMe, logout } from '../controllers/authController.js';
import { signupValidator, loginValidator } from '../validators/authValidator.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

export default router;
