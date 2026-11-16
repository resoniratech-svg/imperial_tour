import { Router } from 'express';
import {
  getPublicTours, getPublicTourBySlug,
  getAllTours, getTourById, createTour, updateTour, deleteTour, toggleTourStatus,
} from '../controllers/tourController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createTourSchema, updateTourSchema } from '../validators';

const router = Router();

// Public routes
router.get('/public', getPublicTours);
router.get('/public/:slug', getPublicTourBySlug);

// Admin routes
router.get('/', authMiddleware, getAllTours);
router.get('/:id', authMiddleware, getTourById);
router.post('/', authMiddleware, validate(createTourSchema), createTour);
router.put('/:id', authMiddleware, updateTour);
router.delete('/:id', authMiddleware, deleteTour);
router.patch('/:id/toggle', authMiddleware, toggleTourStatus);

export default router;
