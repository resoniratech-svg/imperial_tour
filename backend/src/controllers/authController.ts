import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { config } from '../config';
import { AuthRequest } from '../middleware/auth';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    if (!admin.isActive) {
      res.status(403).json({ error: 'Account is disabled' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn as any }
    );

    res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.admin) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    if (!admin) {
      res.status(404).json({ error: 'Admin not found' });
      return;
    }

    res.json(admin);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.admin) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { name, currentPassword, newPassword } = req.body;
    const updateData: any = {};

    if (name) updateData.name = name;

    if (newPassword) {
      if (!currentPassword) {
        res.status(400).json({ error: 'Current password is required' });
        return;
      }

      const admin = await prisma.admin.findUnique({ where: { id: req.admin.id } });
      if (!admin) {
        res.status(404).json({ error: 'Admin not found' });
        return;
      }

      const isValid = await bcrypt.compare(currentPassword, admin.password);
      if (!isValid) {
        res.status(400).json({ error: 'Current password is incorrect' });
        return;
      }

      updateData.password = await bcrypt.hash(newPassword, 12);
    }

    const updated = await prisma.admin.update({
      where: { id: req.admin.id },
      data: updateData,
      select: { id: true, email: true, name: true, role: true },
    });

    res.json(updated);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
