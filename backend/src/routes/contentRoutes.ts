import { Router } from 'express';
import {
  getPublicTestimonials, submitContactMessage, getPublicSettings, getPublicGallery,
  getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getAllContactMessages, markMessageRead, deleteContactMessage,
  getAllSettings, updateSetting, bulkUpdateSettings,
  getAllGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage,
  getReports,
} from '../controllers/contentController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { contactMessageSchema } from '../validators';

const router = Router();

// Public routes
router.get('/testimonials/public', getPublicTestimonials);
router.post('/contact', validate(contactMessageSchema), submitContactMessage);
router.get('/settings/public', getPublicSettings);
router.get('/gallery/public', getPublicGallery);

// Admin: Testimonials
router.get('/testimonials', authMiddleware, getAllTestimonials);
router.post('/testimonials', authMiddleware, createTestimonial);
router.put('/testimonials/:id', authMiddleware, updateTestimonial);
router.delete('/testimonials/:id', authMiddleware, deleteTestimonial);

// Admin: Contact messages
router.get('/messages', authMiddleware, getAllContactMessages);
router.patch('/messages/:id/read', authMiddleware, markMessageRead);
router.delete('/messages/:id', authMiddleware, deleteContactMessage);

// Admin: Settings
router.get('/settings', authMiddleware, getAllSettings);
router.put('/settings', authMiddleware, updateSetting);
router.put('/settings/bulk', authMiddleware, bulkUpdateSettings);

// Admin: Gallery
router.get('/gallery', authMiddleware, getAllGalleryImages);
router.post('/gallery', authMiddleware, createGalleryImage);
router.put('/gallery/:id', authMiddleware, updateGalleryImage);
router.delete('/gallery/:id', authMiddleware, deleteGalleryImage);

// Admin: Reports
router.get('/reports', authMiddleware, getReports);

export default router;
