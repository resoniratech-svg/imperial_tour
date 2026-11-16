export interface TourCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
  _count?: {
    tours: number;
  };
}

export interface TourPricingTier {
  id: string;
  tourId: string;
  minPersons: number;
  maxPersons: number;
  pricePerPerson: number;
  isTotal: boolean;
}

export interface TourInclusion {
  id: string;
  tourId: string;
  item: string;
  sortOrder: number;
}

export interface TourExclusion {
  id: string;
  tourId: string;
  item: string;
  price: number | null;
  sortOrder: number;
}

export interface TourAddon {
  id: string;
  tourId: string;
  name: string;
  description?: string;
  price: number;
  priceUnit: 'per_person' | 'per_item' | 'per_hour' | 'flat';
  isActive: boolean;
  sortOrder: number;
}

export interface TourItinerary {
  id: string;
  tourId: string;
  title: string;
  items: string; // JSON parsed array of strings
  sortOrder: number;
}

export interface TourImage {
  id: string;
  tourId: string;
  url: string;
  alt?: string;
  sortOrder: number;
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  duration?: string;
  availability?: string;
  categoryId: string;
  category?: TourCategory;
  coverImage?: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  pricingType: 'per_person' | 'fixed_group';
  minPersons: number;
  maxPersons: number;
  pricingTiers: TourPricingTier[];
  inclusions: TourInclusion[];
  exclusions: TourExclusion[];
  addons: TourAddon[];
  itineraryItems?: TourItinerary[];
  images?: TourImage[];
  _count?: {
    bookings: number;
  };
}

export interface BookingAddonItem {
  addonId: string;
  quantity: number;
  unitPrice: number;
  total: number;
  addon?: TourAddon;
}

export interface Booking {
  id: string;
  bookingRef: string;
  tourId: string;
  tour?: Tour;
  travelDate: string;
  numberOfGuests: number;
  pricePerPerson: number;
  isFixedPrice: boolean;
  subtotal: number;
  addonsTotal: number;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  adminNotes?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry?: string;
  hotelName?: string;
  pickupLocation?: string;
  specialRequests?: string;
  pricingSnapshot?: string;
  createdAt: string;
  updatedAt: string;
  addons?: Array<{
    id: string;
    addonId: string;
    quantity: number;
    unitPrice: number;
    total: number;
    addon?: TourAddon;
  }>;
  statusHistory?: Array<{
    id: string;
    status: string;
    notes?: string;
    changedBy?: string;
    createdAt: string;
  }>;
  payment?: {
    id: string;
    amount: number;
    currency: string;
    method?: string;
    transactionId?: string;
    status: string;
    notes?: string;
    createdAt: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  country?: string;
  rating: number;
  comment: string;
  tourName?: string;
  avatar?: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface WebsiteSettings {
  site_name?: string;
  site_tagline?: string;
  currency?: string;
  currency_symbol?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  google_maps_url?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  linkedin?: string;
  [key: string]: string | undefined;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface PricingCalculationResult {
  tierFound: boolean;
  pricePerPerson: number;
  totalBasePrice: number;
  isFixedPrice: boolean;
  matchedTier?: TourPricingTier;
  message?: string;
}
