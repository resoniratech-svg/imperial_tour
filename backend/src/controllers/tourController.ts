import { Request, Response } from 'express';
import prisma from '../config/database';
import { slugify } from '../utils/helpers';
import { AuthRequest } from '../middleware/auth';

// PUBLIC: Get all active tours with categories and pricing
export const getPublicTours = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, featured, search, limit, offset } = req.query;

    const where: any = { isActive: true };

    if (category) {
      where.category = { slug: category as string };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { shortDesc: { contains: search as string } },
        { description: { contains: search as string } },
      ];
    }

    const tours = await prisma.tour.findMany({
      where,
      include: {
        category: true,
        pricingTiers: { orderBy: { minPersons: 'asc' } },
        inclusions: { orderBy: { sortOrder: 'asc' } },
        exclusions: { orderBy: { sortOrder: 'asc' } },
        addons: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } },
        images: { orderBy: { sortOrder: 'asc' } },
        itineraryItems: { orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { sortOrder: 'asc' },
      take: limit ? parseInt(limit as string) : undefined,
      skip: offset ? parseInt(offset as string) : undefined,
    });

    const total = await prisma.tour.count({ where });

    res.json({ tours, total });
  } catch (error) {
    console.error('Get tours error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUBLIC: Get single tour by slug
export const getPublicTourBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug as string;

    const tour = await prisma.tour.findUnique({
      where: { slug, isActive: true },
      include: {
        category: true,
        pricingTiers: { orderBy: { minPersons: 'asc' } },
        inclusions: { orderBy: { sortOrder: 'asc' } },
        exclusions: { orderBy: { sortOrder: 'asc' } },
        addons: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } },
        images: { orderBy: { sortOrder: 'asc' } },
        itineraryItems: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!tour) {
      res.status(404).json({ error: 'Tour not found' });
      return;
    }

    // Get similar tours (same category, exclude current)
    const similarTours = await prisma.tour.findMany({
      where: {
        categoryId: tour.categoryId,
        id: { not: tour.id },
        isActive: true,
      },
      include: {
        category: true,
        pricingTiers: { orderBy: { minPersons: 'asc' } },
      },
      take: 4,
    });

    res.json({ tour, similarTours });
  } catch (error) {
    console.error('Get tour error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Get all tours (including inactive)
export const getAllTours = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tours = await prisma.tour.findMany({
      include: {
        category: true,
        pricingTiers: { orderBy: { minPersons: 'asc' } },
        inclusions: { orderBy: { sortOrder: 'asc' } },
        exclusions: { orderBy: { sortOrder: 'asc' } },
        addons: { orderBy: { sortOrder: 'asc' } },
        images: { orderBy: { sortOrder: 'asc' } },
        itineraryItems: { orderBy: { sortOrder: 'asc' } },
        _count: { select: { bookings: true } },
      },
      orderBy: { sortOrder: 'asc' },
    });

    res.json(tours);
  } catch (error) {
    console.error('Get all tours error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Get tour by ID
export const getTourById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const tour = await prisma.tour.findUnique({
      where: { id },
      include: {
        category: true,
        pricingTiers: { orderBy: { minPersons: 'asc' } },
        inclusions: { orderBy: { sortOrder: 'asc' } },
        exclusions: { orderBy: { sortOrder: 'asc' } },
        addons: { orderBy: { sortOrder: 'asc' } },
        images: { orderBy: { sortOrder: 'asc' } },
        itineraryItems: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!tour) {
      res.status(404).json({ error: 'Tour not found' });
      return;
    }

    res.json(tour);
  } catch (error) {
    console.error('Get tour by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Create tour
export const createTour = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      title, shortDesc, description, duration, availability,
      categoryId, coverImage, isActive, isFeatured, pricingType,
      minPersons, maxPersons, pricingTiers, inclusions, exclusions,
      addons, itinerary,
    } = req.body;

    const slug = slugify(title);

    // Check slug uniqueness
    const existing = await prisma.tour.findUnique({ where: { slug } });
    if (existing) {
      res.status(400).json({ error: 'A tour with a similar name already exists' });
      return;
    }

    const tour = await prisma.tour.create({
      data: {
        title,
        slug,
        shortDesc,
        description,
        duration,
        availability,
        categoryId,
        coverImage,
        isActive: isActive ?? true,
        isFeatured: isFeatured ?? false,
        pricingType: pricingType ?? 'per_person',
        minPersons: minPersons ?? 1,
        maxPersons: maxPersons ?? 5,
        pricingTiers: pricingTiers ? {
          create: pricingTiers.map((tier: any) => ({
            minPersons: tier.minPersons,
            maxPersons: tier.maxPersons,
            pricePerPerson: tier.pricePerPerson,
            isTotal: tier.isTotal ?? false,
          })),
        } : undefined,
        inclusions: inclusions ? {
          create: inclusions.map((item: string, idx: number) => ({
            item,
            sortOrder: idx,
          })),
        } : undefined,
        exclusions: exclusions ? {
          create: exclusions.map((exc: any, idx: number) => ({
            item: exc.item,
            price: exc.price,
            sortOrder: idx,
          })),
        } : undefined,
        addons: addons ? {
          create: addons.map((addon: any, idx: number) => ({
            name: addon.name,
            description: addon.description,
            price: addon.price,
            priceUnit: addon.priceUnit ?? 'per_person',
            sortOrder: idx,
          })),
        } : undefined,
        itineraryItems: itinerary ? {
          create: itinerary.map((item: any, idx: number) => ({
            title: item.title,
            items: JSON.stringify(item.items),
            sortOrder: idx,
          })),
        } : undefined,
      },
      include: {
        category: true,
        pricingTiers: true,
        inclusions: true,
        exclusions: true,
        addons: true,
        itineraryItems: true,
      },
    });

    res.status(201).json(tour);
  } catch (error) {
    console.error('Create tour error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Update tour
export const updateTour = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const {
      title, shortDesc, description, duration, availability,
      categoryId, coverImage, isActive, isFeatured, pricingType,
      minPersons, maxPersons, pricingTiers, inclusions, exclusions,
      addons, itinerary,
    } = req.body;

    const existing = await prisma.tour.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Tour not found' });
      return;
    }

    const updateData: any = {};
    if (title !== undefined) {
      updateData.title = title;
      updateData.slug = slugify(title);
    }
    if (shortDesc !== undefined) updateData.shortDesc = shortDesc;
    if (description !== undefined) updateData.description = description;
    if (duration !== undefined) updateData.duration = duration;
    if (availability !== undefined) updateData.availability = availability;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
    if (pricingType !== undefined) updateData.pricingType = pricingType;
    if (minPersons !== undefined) updateData.minPersons = minPersons;
    if (maxPersons !== undefined) updateData.maxPersons = maxPersons;

    // Update pricing tiers (replace all)
    if (pricingTiers) {
      await prisma.tourPricingTier.deleteMany({ where: { tourId: id } });
      await prisma.tourPricingTier.createMany({
        data: pricingTiers.map((tier: any) => ({
          tourId: id,
          minPersons: tier.minPersons,
          maxPersons: tier.maxPersons,
          pricePerPerson: tier.pricePerPerson,
          isTotal: tier.isTotal ?? false,
        })),
      });
    }

    // Update inclusions (replace all)
    if (inclusions) {
      await prisma.tourInclusion.deleteMany({ where: { tourId: id } });
      await prisma.tourInclusion.createMany({
        data: inclusions.map((item: string, idx: number) => ({
          tourId: id,
          item,
          sortOrder: idx,
        })),
      });
    }

    // Update exclusions (replace all)
    if (exclusions) {
      await prisma.tourExclusion.deleteMany({ where: { tourId: id } });
      await prisma.tourExclusion.createMany({
        data: exclusions.map((exc: any, idx: number) => ({
          tourId: id,
          item: exc.item,
          price: exc.price,
          sortOrder: idx,
        })),
      });
    }

    // Update addons (replace all)
    if (addons) {
      await prisma.tourAddon.deleteMany({ where: { tourId: id } });
      await prisma.tourAddon.createMany({
        data: addons.map((addon: any, idx: number) => ({
          tourId: id,
          name: addon.name,
          description: addon.description,
          price: addon.price,
          priceUnit: addon.priceUnit ?? 'per_person',
          sortOrder: idx,
        })),
      });
    }

    // Update itinerary (replace all)
    if (itinerary) {
      await prisma.tourItinerary.deleteMany({ where: { tourId: id } });
      await prisma.tourItinerary.createMany({
        data: itinerary.map((item: any, idx: number) => ({
          tourId: id,
          title: item.title,
          items: JSON.stringify(item.items),
          sortOrder: idx,
        })),
      });
    }

    const tour = await prisma.tour.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        pricingTiers: true,
        inclusions: true,
        exclusions: true,
        addons: true,
        itineraryItems: true,
      },
    });

    res.json(tour);
  } catch (error) {
    console.error('Update tour error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Delete tour
export const deleteTour = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const existing = await prisma.tour.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Tour not found' });
      return;
    }

    // Check for bookings
    const bookingCount = await prisma.booking.count({ where: { tourId: id } });
    if (bookingCount > 0) {
      // Soft delete - deactivate instead
      await prisma.tour.update({ where: { id }, data: { isActive: false } });
      res.json({ message: 'Tour deactivated (has associated bookings)' });
      return;
    }

    await prisma.tour.delete({ where: { id } });
    res.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    console.error('Delete tour error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Toggle tour status
export const toggleTourStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const tour = await prisma.tour.findUnique({ where: { id } });
    if (!tour) {
      res.status(404).json({ error: 'Tour not found' });
      return;
    }

    const updated = await prisma.tour.update({
      where: { id },
      data: { isActive: !tour.isActive },
    });

    res.json(updated);
  } catch (error) {
    console.error('Toggle tour error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
