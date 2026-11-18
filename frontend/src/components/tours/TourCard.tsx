import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { Tour } from '../../types';
import { getStartingPrice, formatCurrency } from '../../utils/pricing';

interface TourCardProps {
  tour: Tour;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const startingInfo = getStartingPrice(tour.pricingTiers);
  const startingPrice = startingInfo?.price;
  const isFixedGroup = tour.pricingType === 'fixed_group' || startingInfo?.isTotal;

  // Fallback image based on category
  const defaultImage =
    tour.coverImage ||
    '/tours/half-day-desert-safari.jpg';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-yellow-400/60 transition-all duration-300 flex flex-col transform hover:-translate-y-1">
      {/* Cover Image & Category Badges - Clean, bright, unobstructed view */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={defaultImage}
          alt={tour.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Category Pill */}
        {tour.category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wider uppercase bg-slate-950/85 text-yellow-400 backdrop-blur-md border border-yellow-400/30 shadow-md">
              {tour.category.name}
            </span>
          </div>
        )}

        {/* Duration / Tag Pill */}
        {tour.duration && (
          <div className="absolute top-3 right-3 z-10">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-white/95 text-slate-800 backdrop-blur-md shadow-md">
              <Clock className="w-3 h-3 text-qatar-maroon" />
              {tour.duration}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>{tour.minPersons}–{tour.maxPersons} Guests</span>
            </span>
          </div>

          <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-qatar-maroon transition line-clamp-1 mb-2">
            {tour.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {tour.shortDesc}
          </p>

          {/* Quick highlights */}
          {tour.inclusions && tour.inclusions.length > 0 && (
            <div className="space-y-1 mb-4 pt-2 border-t border-slate-100">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 line-clamp-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span>{tour.inclusions[0].item}</span>
              </div>
              {tour.inclusions[1] && (
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 line-clamp-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span>{tour.inclusions[1].item}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pricing & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block leading-none mb-1">
              {isFixedGroup ? 'Total From' : 'From / Person'}
            </span>
            <div className="text-lg font-bold font-serif text-slate-950 leading-tight">
              {startingPrice ? formatCurrency(startingPrice) : 'Contact'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/tours/${tour.slug}`}
              className="py-2 px-3 rounded-lg border border-slate-300 hover:border-yellow-400 hover:text-qatar-maroon text-slate-700 text-xs font-bold uppercase tracking-wider transition"
            >
              Details
            </Link>
            <Link
              to={`/booking/${tour.slug}`}
              className="flex items-center gap-1 py-2 px-3.5 rounded-lg bg-qatar-maroon hover:bg-qatar-maroon-dark text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
            >
              <span>Book</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
