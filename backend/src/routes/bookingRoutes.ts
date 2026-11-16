import { Router } from 'express';
import {
  createBooking, getBookingByRef,
  getAllBookings, getBookingById, updateBookingStatus, recordPayment,
  getDashboardStats,
} from '../controllers/bookingController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createBookingSchema, updateBookingStatusSchema, recordPaymentSchema } from '../validators';

const router = Router();

// Public routes
router.post('/', validate(createBookingSchema), createBooking);
router.get('/ref/:ref', getBookingByRef);

// Admin routes
router.get('/admin/stats', authMiddleware, getDashboardStats);
router.get('/admin/all', authMiddleware, getAllBookings);
router.get('/admin/:id', authMiddleware, getBookingById);
router.patch('/admin/:id/status', authMiddleware, validate(updateBookingStatusSchema), updateBookingStatus);
router.post('/admin/:id/payment', authMiddleware, validate(recordPaymentSchema), recordPayment);

export default router;
