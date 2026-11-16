import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// PUBLIC: Get approved testimonials
export const getPublicTestimonials = async (_req: Request, res: Response): Promise<void> => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUBLIC: Submit contact message
export const submitContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const msg = await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    });
    res.status(201).json({ message: 'Message sent successfully', id: msg.id });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUBLIC: Get website settings
export const getPublicSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const settings = await prisma.websiteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });
    res.json(settingsMap);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUBLIC: Get gallery images
export const getPublicGallery = async (_req: Request, res: Response): Promise<void> => {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(images);
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Get all testimonials
export const getAllTestimonials = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Create testimonial
export const createTestimonial = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const testimonial = await prisma.testimonial.create({ data: req.body });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Update testimonial
export const updateTestimonial = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id as string },
      data: req.body,
    });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Delete testimonial
export const deleteTestimonial = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id as string } });
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Get all contact messages
export const getAllContactMessages = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Mark message as read
export const markMessageRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const msg = await prisma.contactMessage.update({
      where: { id: req.params.id as string },
      data: { isRead: true },
    });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Delete contact message
export const deleteContactMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await prisma.contactMessage.delete({ where: { id: req.params.id as string } });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Get all settings
export const getAllSettings = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const settings = await prisma.websiteSetting.findMany({ orderBy: { group: 'asc' } });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Update setting
export const updateSetting = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { key, value, group } = req.body;
    const setting = await prisma.websiteSetting.upsert({
      where: { key },
      update: { value, group: group || 'general' },
      create: { key, value, group: group || 'general' },
    });
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Bulk update settings
export const bulkUpdateSettings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { settings } = req.body;
    if (!Array.isArray(settings)) {
      res.status(400).json({ error: 'Settings must be an array' });
      return;
    }

    for (const { key, value, group } of settings) {
      await prisma.websiteSetting.upsert({
        where: { key },
        update: { value, group: group || 'general' },
        create: { key, value, group: group || 'general' },
      });
    }

    const all = await prisma.websiteSetting.findMany({ orderBy: { group: 'asc' } });
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Gallery management
export const getAllGalleryImages = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createGalleryImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const image = await prisma.galleryImage.create({ data: req.body });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateGalleryImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const image = await prisma.galleryImage.update({
      where: { id },
      data: req.body,
    });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteGalleryImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    await prisma.galleryImage.delete({ where: { id } });
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Reports
export const getReports = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { type, startDate, endDate } = req.query;

    const dateFilter: any = {};
    if (startDate) dateFilter.gte = new Date(startDate as string);
    if (endDate) dateFilter.lte = new Date(endDate as string);

    switch (type) {
      case 'daily': {
        const bookings = await prisma.booking.findMany({
          where: dateFilter.gte || dateFilter.lte ? { createdAt: dateFilter } : undefined,
          include: { tour: true, payment: true },
          orderBy: { createdAt: 'desc' },
        });

        const dailyData: Record<string, { count: number; revenue: number }> = {};
        for (const b of bookings) {
          const day = b.createdAt.toISOString().split('T')[0];
          if (!dailyData[day]) dailyData[day] = { count: 0, revenue: 0 };
          dailyData[day].count++;
          if (b.payment?.status === 'completed') dailyData[day].revenue += b.payment.amount;
        }

        res.json(dailyData);
        break;
      }

      case 'tour-wise': {
        const tours = await prisma.tour.findMany({
          include: {
            _count: { select: { bookings: true } },
            bookings: {
              include: { payment: true },
              where: dateFilter.gte || dateFilter.lte ? { createdAt: dateFilter } : undefined,
            },
          },
        });

        const tourData = tours.map(t => ({
          tourId: t.id,
          tourTitle: t.title,
          totalBookings: t.bookings.length,
          revenue: t.bookings.reduce((sum, b) =>
            sum + (b.payment?.status === 'completed' ? b.payment.amount : 0), 0),
        }));

        res.json(tourData);
        break;
      }

      case 'customers': {
        const customers = await prisma.booking.groupBy({
          by: ['customerEmail', 'customerName', 'customerPhone', 'customerCountry'],
          _count: true,
          _sum: { totalAmount: true },
        });
        res.json(customers);
        break;
      }

      default: {
        // Monthly overview
        const bookings = await prisma.booking.findMany({
          where: dateFilter.gte || dateFilter.lte ? { createdAt: dateFilter } : undefined,
          include: { payment: true },
          orderBy: { createdAt: 'desc' },
        });

        const monthlyData: Record<string, { count: number; revenue: number }> = {};
        for (const b of bookings) {
          const month = b.createdAt.toISOString().substring(0, 7);
          if (!monthlyData[month]) monthlyData[month] = { count: 0, revenue: 0 };
          monthlyData[month].count++;
          if (b.payment?.status === 'completed') monthlyData[month].revenue += b.payment.amount;
        }

        res.json(monthlyData);
      }
    }
  } catch (error) {
    console.error('Reports error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
