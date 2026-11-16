import { TourPricingTier, PricingCalculationResult } from '../types';

export const calculateTourPrice = (
  pricingTiers: TourPricingTier[] = [],
  guestsCount: number
): PricingCalculationResult => {
  if (!pricingTiers || pricingTiers.length === 0 || guestsCount <= 0) {
    return {
      tierFound: false,
      pricePerPerson: 0,
      totalBasePrice: 0,
      isFixedPrice: false,
      message: 'Contact us for group pricing',
    };
  }

  // Find tier that matches guestsCount
  const matchedTier = pricingTiers.find(
    tier => guestsCount >= tier.minPersons && guestsCount <= tier.maxPersons
  );

  if (!matchedTier) {
    return {
      tierFound: false,
      pricePerPerson: 0,
      totalBasePrice: 0,
      isFixedPrice: false,
      message: 'Contact us for group pricing',
    };
  }

  if (matchedTier.isTotal) {
    // Fixed group pricing (e.g. Water Sports Tour: 2800 QAR total for 1-5 persons, or Romantic dinner: 2250 QAR total for 2 persons)
    return {
      tierFound: true,
      pricePerPerson: Math.round(matchedTier.pricePerPerson / guestsCount),
      totalBasePrice: matchedTier.pricePerPerson,
      isFixedPrice: true,
      matchedTier,
    };
  }

  // Per person pricing for stated group size (e.g. 2 persons @ 400 QAR = 800 QAR total)
  return {
    tierFound: true,
    pricePerPerson: matchedTier.pricePerPerson,
    totalBasePrice: matchedTier.pricePerPerson * guestsCount,
    isFixedPrice: false,
    matchedTier,
  };
};

export const formatCurrency = (amount: number, currency = 'QAR'): string => {
  return `${new Intl.NumberFormat('en-QA', {
    maximumFractionDigits: 0,
  }).format(amount)} ${currency}`;
};

export const getStartingPrice = (tiers: TourPricingTier[] = []): { price: number; isTotal: boolean } | null => {
  if (!tiers || tiers.length === 0) return null;

  // Find lowest price
  let minPrice = Infinity;
  let isTotal = false;

  for (const tier of tiers) {
    const effectivePrice = tier.isTotal ? Math.round(tier.pricePerPerson / tier.maxPersons) : tier.pricePerPerson;
    if (effectivePrice < minPrice) {
      minPrice = effectivePrice;
      isTotal = tier.isTotal;
    }
  }

  return minPrice === Infinity ? null : { price: minPrice, isTotal };
};
