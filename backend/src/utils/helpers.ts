import { v4 as uuidv4 } from 'uuid';

export const generateBookingRef = (): string => {
  const prefix = 'ITQ';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = uuidv4().split('-')[0].toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
};

export const calculateTourPrice = (
  pricingTiers: Array<{ minPersons: number; maxPersons: number; pricePerPerson: number; isTotal: boolean }>,
  numberOfGuests: number
): { pricePerPerson: number; totalPrice: number; isFixedPrice: boolean } | null => {
  const tier = pricingTiers.find(
    t => numberOfGuests >= t.minPersons && numberOfGuests <= t.maxPersons
  );

  if (!tier) {
    return null; // No pricing available for this group size
  }

  if (tier.isTotal) {
    return {
      pricePerPerson: tier.pricePerPerson / numberOfGuests,
      totalPrice: tier.pricePerPerson,
      isFixedPrice: true,
    };
  }

  return {
    pricePerPerson: tier.pricePerPerson,
    totalPrice: tier.pricePerPerson * numberOfGuests,
    isFixedPrice: false,
  };
};
