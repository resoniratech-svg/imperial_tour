import { Request, Response } from 'express';
import prisma from '../config/database';
import { slugify } from '../utils/helpers';
import { AuthRequest } from '../middleware/auth';

// PUBLIC: Get all active categories
export const getPublicCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.tourCategory.findMany({
      where: { isActive: true },
      include: { _count: { select: { tours: { where: { isActive: true } } } } },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Get all categories
export const getAllCategories = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const categories = await prisma.tourCategory.findMany({
      include: { _count: { select: { tours: true } } },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('Get all categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Create category
export const createCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, image, sortOrder, isActive } = req.body;
    const slug = slugify(name);

    const existing = await prisma.tourCategory.findUnique({ where: { slug } });
    if (existing) {
      res.status(400).json({ error: 'Category with this name already exists' });
      return;
    }

    const category = await prisma.tourCategory.create({
      data: { name, slug, description, image, sortOrder: sortOrder ?? 0, isActive: isActive ?? true },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Update category
export const updateCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { name, description, image, sortOrder, isActive } = req.body;

    const updateData: any = {};
    if (name !== undefined) {
      updateData.name = name;
      updateData.slug = slugify(name);
    }
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (isActive !== undefined) updateData.isActive = isActive;

    const category = await prisma.tourCategory.update({
      where: { id },
      data: updateData,
    });

    res.json(category);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Delete category
export const deleteCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const tourCount = await prisma.tour.count({ where: { categoryId: id } });
    if (tourCount > 0) {
      res.status(400).json({ error: 'Cannot delete category with associated tours' });
      return;
    }

    await prisma.tourCategory.delete({ where: { id } });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
