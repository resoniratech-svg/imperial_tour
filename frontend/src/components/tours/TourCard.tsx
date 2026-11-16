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
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-gold-500/40 transition-all duration-300 flex flex-col transform hover:-translate-y-1">
      {/* Cover Image & Category Badge */}
      <div className="relative h-60 overflow-hidden bg-slate-900">
        <img
          src={defaultImage}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category Pill */}
        {tour.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-slate-950/80 text-gold-400 backdrop-blur-md border border-gold-500/30">
              {tour.category.name}
            </span>
          </div>
        )}

        {/* Duration / Tag Pill */}
        {tour.duration && (
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-slate-800 backdrop-blur-md shadow">
              <Clock className="w-3 h-3 text-qatar-maroon" />
              {tour.duration}
            </span>
          </div>
        )}

        {/* Pricing Overlay on bottom of image */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
              {isFixedGroup ? 'Total Package From' : 'From / Person'}
            </span>
            <div className="text-xl font-bold font-serif text-gold-400 leading-tight">
              {startingPrice ? formatCurrency(startingPrice) : 'Contact for Price'}
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
            <Users className="w-3 h-3 text-gold-400" />
            <span>{tour.minPersons}–{tour.maxPersons} Guests</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
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

        {/* Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <Link
            to={`/tours/${tour.slug}`}
            className="flex-1 text-center py-2.5 px-3 rounded-lg border border-slate-300 hover:border-gold-500 hover:text-qatar-maroon text-slate-800 text-xs font-bold uppercase tracking-wider transition"
          >
            Details
          </Link>
          <Link
            to={`/booking/${tour.slug}`}
            className="flex-1 flex items-center justify-center gap-1 py-2.5 px-3 rounded-lg bg-qatar-maroon hover:bg-qatar-maroon-dark text-white text-xs font-bold uppercase tracking-wider transition shadow"
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
