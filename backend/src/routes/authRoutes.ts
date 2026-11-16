import { Router } from 'express';
import { login, getProfile, updateProfile } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { loginSchema } from '../validators';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router;
