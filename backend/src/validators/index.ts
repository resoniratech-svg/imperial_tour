import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const createTourSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  shortDesc: z.string().min(10, 'Short description must be at least 10 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  duration: z.string().optional(),
  availability: z.string().optional(),
  categoryId: z.string().uuid('Invalid category ID'),
  coverImage: z.string().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  pricingType: z.enum(['per_person', 'fixed_group']).optional(),
  minPersons: z.number().int().min(1).optional(),
  maxPersons: z.number().int().min(1).optional(),
  pricingTiers: z.array(z.object({
    minPersons: z.number().int().min(1),
    maxPersons: z.number().int().min(1),
    pricePerPerson: z.number().min(0),
    isTotal: z.boolean().optional(),
  })).optional(),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.object({
    item: z.string(),
    price: z.number().optional(),
  })).optional(),
  addons: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number().min(0),
    priceUnit: z.string().optional(),
  })).optional(),
  itinerary: z.array(z.object({
    title: z.string(),
    items: z.array(z.string()),
  })).optional(),
});

export const updateTourSchema = createTourSchema.partial();

export const createBookingSchema = z.object({
  tourId: z.string().uuid('Invalid tour ID'),
  travelDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
  numberOfGuests: z.number().int().min(1, 'At least 1 guest required'),
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().min(6, 'Phone number is required'),
  customerCountry: z.string().optional(),
  hotelName: z.string().optional(),
  pickupLocation: z.string().optional(),
  specialRequests: z.string().optional(),
  addons: z.array(z.object({
    addonId: z.string().uuid(),
    quantity: z.number().int().min(1),
  })).optional(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled', 'completed']),
  notes: z.string().optional(),
});

export const recordPaymentSchema = z.object({
  amount: z.number().min(0),
  method: z.string().optional(),
  transactionId: z.string().optional(),
  status: z.enum(['pending', 'completed', 'failed', 'refunded']),
  notes: z.string().optional(),
});

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const createCategorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  description: z.string().optional(),
  image: z.string().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const updateSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  group: z.string().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  country: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10),
  tourName: z.string().optional(),
  avatar: z.string().optional(),
  isApproved: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});
