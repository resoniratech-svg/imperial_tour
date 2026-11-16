import { Request, Response } from 'express';
import prisma from '../config/database';
import { generateBookingRef, calculateTourPrice } from '../utils/helpers';
import { AuthRequest } from '../middleware/auth';

// PUBLIC: Create booking
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      tourId, travelDate, numberOfGuests, customerName, customerEmail,
      customerPhone, customerCountry, hotelName, pickupLocation,
      specialRequests, addons,
    } = req.body;

    // Get tour with pricing
    const tour = await prisma.tour.findUnique({
      where: { id: tourId, isActive: true },
      include: {
        pricingTiers: { orderBy: { minPersons: 'asc' } },
        addons: { where: { isActive: true } },
      },
    });

    if (!tour) {
      res.status(404).json({ error: 'Tour not found or inactive' });
      return;
    }

    // Calculate pricing
    const pricing = calculateTourPrice(tour.pricingTiers, numberOfGuests);
    if (!pricing) {
      res.status(400).json({
        error: 'No pricing available for this group size. Please contact us for group pricing.',
      });
      return;
    }

    // Calculate addon totals
    let addonsTotal = 0;
    const bookingAddons: Array<{ addonId: string; quantity: number; unitPrice: number; total: number }> = [];

    if (addons && addons.length > 0) {
      for (const addon of addons) {
        const tourAddon = tour.addons.find(a => a.id === addon.addonId);
        if (!tourAddon) {
          res.status(400).json({ error: `Invalid addon: ${addon.addonId}` });
          return;
        }

        let addonTotal = 0;
        if (tourAddon.priceUnit === 'per_person') {
          addonTotal = tourAddon.price * numberOfGuests * addon.quantity;
        } else {
          addonTotal = tourAddon.price * addon.quantity;
        }

        addonsTotal += addonTotal;
        bookingAddons.push({
          addonId: addon.addonId,
          quantity: addon.quantity,
          unitPrice: tourAddon.price,
          total: addonTotal,
        });
      }
    }

    const totalAmount = pricing.totalPrice + addonsTotal;
    const bookingRef = generateBookingRef();

    // Create booking with transaction
    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        tourId,
        travelDate: new Date(travelDate),
        numberOfGuests,
        pricePerPerson: pricing.pricePerPerson,
        isFixedPrice: pricing.isFixedPrice,
        subtotal: pricing.totalPrice,
        addonsTotal,
        totalAmount,
        status: 'pending',
        paymentStatus: 'unpaid',
        customerName,
        customerEmail,
        customerPhone,
        customerCountry,
        hotelName,
        pickupLocation,
        specialRequests,
        pricingSnapshot: JSON.stringify({
          pricingTiers: tour.pricingTiers,
          calculatedPrice: pricing,
          addons: bookingAddons,
        }),
        addons: bookingAddons.length > 0 ? {
          create: bookingAddons,
        } : undefined,
        statusHistory: {
          create: {
            status: 'pending',
            notes: 'Booking created',
          },
        },
      },
      include: {
        tour: { include: { category: true } },
        addons: { include: { addon: true } },
        statusHistory: true,
      },
    });

    res.status(201).json({
      booking,
      message: 'Booking request submitted successfully. You will be contacted to confirm your booking.',
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUBLIC: Get booking by reference
export const getBookingByRef = async (req: Request, res: Response): Promise<void> => {
  try {
    const ref = req.params.ref as string;

    const booking = await prisma.booking.findUnique({
      where: { bookingRef: ref },
      include: {
        tour: { include: { category: true } },
        addons: { include: { addon: true } },
        statusHistory: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Get all bookings
export const getAllBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, tourId, startDate, endDate, search, limit, offset } = req.query;

    const where: any = {};

    if (status) where.status = status;
    if (tourId) where.tourId = tourId;
    if (startDate || endDate) {
      where.travelDate = {};
      if (startDate) where.travelDate.gte = new Date(startDate as string);
      if (endDate) where.travelDate.lte = new Date(endDate as string);
    }
    if (search) {
      where.OR = [
        { bookingRef: { contains: search as string } },
        { customerName: { contains: search as string } },
        { customerEmail: { contains: search as string } },
        { customerPhone: { contains: search as string } },
      ];
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        tour: { include: { category: true } },
        addons: { include: { addon: true } },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit as string) : 50,
      skip: offset ? parseInt(offset as string) : 0,
    });

    const total = await prisma.booking.count({ where });

    res.json({ bookings, total });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Get booking by ID
export const getBookingById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        tour: { include: { category: true, pricingTiers: true } },
        addons: { include: { addon: true } },
        statusHistory: { orderBy: { createdAt: 'desc' } },
        payment: true,
      },
    });

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Update booking status
export const updateBookingStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { status, notes } = req.body;

    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status,
        adminNotes: notes || booking.adminNotes,
        statusHistory: {
          create: {
            status,
            notes,
            changedBy: req.admin?.email,
          },
        },
      },
      include: {
        tour: { include: { category: true } },
        statusHistory: { orderBy: { createdAt: 'desc' } },
      },
    });

    res.json(updated);
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Record payment
export const recordPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { amount, method, transactionId, status, notes } = req.body;

    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    // Upsert payment
    const payment = await prisma.payment.upsert({
      where: { bookingId: id },
      update: { amount, method, transactionId, status, notes },
      create: {
        bookingId: id,
        amount,
        currency: 'QAR',
        method,
        transactionId,
        status,
        notes,
      },
    });

    // Update booking payment status
    await prisma.booking.update({
      where: { id },
      data: { paymentStatus: status === 'completed' ? 'paid' : status === 'refunded' ? 'refunded' : 'unpaid' },
    });

    res.json(payment);
  } catch (error) {
    console.error('Record payment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ADMIN: Dashboard stats
export const getDashboardStats = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [
      totalTours,
      totalBookings,
      pendingBookings,
      approvedBookings,
      completedBookings,
      totalCustomers,
      revenueResult,
    ] = await Promise.all([
      prisma.tour.count({ where: { isActive: true } }),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'pending' } }),
      prisma.booking.count({ where: { status: 'approved' } }),
      prisma.booking.count({ where: { status: 'completed' } }),
      prisma.booking.groupBy({ by: ['customerEmail'], _count: true }).then(r => r.length),
      prisma.payment.aggregate({
        where: { status: 'completed' },
        _sum: { amount: true },
      }),
    ]);

    // Recent bookings
    const recentBookings = await prisma.booking.findMany({
      include: { tour: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Monthly bookings (current year)
    const bookings = await prisma.booking.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), 0, 1),
        },
      },
      select: { createdAt: true, totalAmount: true, status: true },
    });

    const monthlyData: Record<number, { count: number; revenue: number }> = {};
    for (const b of bookings) {
      const month = b.createdAt.getMonth();
      if (!monthlyData[month]) monthlyData[month] = { count: 0, revenue: 0 };
      monthlyData[month].count++;
      if (b.status === 'completed') monthlyData[month].revenue += b.totalAmount;
    }

    res.json({
      totalTours,
      totalBookings,
      pendingBookings,
      approvedBookings,
      completedBookings,
      totalCustomers,
      totalRevenue: revenueResult._sum.amount || 0,
      recentBookings,
      monthlyData,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
