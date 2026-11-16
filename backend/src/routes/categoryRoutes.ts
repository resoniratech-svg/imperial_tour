import { Router } from 'express';
import {
  getPublicCategories, getAllCategories,
  createCategory, updateCategory, deleteCategory,
} from '../controllers/categoryController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createCategorySchema } from '../validators';

const router = Router();

// Public
router.get('/public', getPublicCategories);

// Admin
router.get('/', authMiddleware, getAllCategories);
router.post('/', authMiddleware, validate(createCategorySchema), createCategory);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);

export default router;
