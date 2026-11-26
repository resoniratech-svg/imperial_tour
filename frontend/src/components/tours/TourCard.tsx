import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tour } from '../../types';
import { getStartingPrice, formatCurrency } from '../../utils/pricing';

interface TourCardProps {
  tour: Tour;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const startingInfo = getStartingPrice(tour.pricingTiers);
  const startingPrice = startingInfo?.price;
  const isFixedGroup = tour.pricingType === 'fixed_group' || startingInfo?.isTotal;

  // Build the list of images for slideshow
  const imageList = useMemo(() => {
    const list: string[] = [];
    if (tour.coverImage) {
      list.push(tour.coverImage);
    }
    if (tour.images && tour.images.length > 0) {
      tour.images.forEach((img) => {
        if (img.url && !list.includes(img.url)) {
          list.push(img.url);
        }
      });
    }

    if (list.length === 0) {
      list.push('/tours/half-day-desert-safari.jpg');
    }
    return list;
  }, [tour.coverImage, tour.images]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle through images every 4.5 seconds if multiple images exist and user isn't hovering
  useEffect(() => {
    if (imageList.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [imageList.length, isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  };

  const handleSelectDot = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-yellow-400/60 transition-all duration-300 flex flex-col transform hover:-translate-y-1">
      {/* Cover Image & Multi-Image Slideshow Carousel */}
      <div
        className="relative aspect-[16/10] overflow-hidden bg-slate-950 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides Images */}
        {imageList.map((imgSrc, idx) => (
          <img
            key={imgSrc + idx}
            src={imgSrc}
            alt={`${tour.title} - view ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
              idx === currentImageIndex
                ? 'opacity-100 z-0'
                : 'opacity-0 pointer-events-none'
            }`}
            loading="lazy"
          />
        ))}

        {/* Left Arrow Button for manual browsing */}
        {imageList.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white hover:text-amber-300 border border-white/25 shadow-lg backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95"
            aria-label="Previous slide"
            title="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Right Arrow Button for manual browsing */}
        {imageList.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white hover:text-amber-300 border border-white/25 shadow-lg backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95"
            aria-label="Next slide"
            title="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Slideshow Pagination Indicator Dots */}
        {imageList.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-950/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow-md">
            {imageList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleSelectDot(e, idx)}
                className={`transition-all rounded-full ${
                  idx === currentImageIndex
                    ? 'w-4 h-1.5 bg-yellow-400 shadow-sm'
                    : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Category Pill */}
        {tour.category && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wider uppercase bg-slate-950/85 text-yellow-400 backdrop-blur-md border border-yellow-400/30 shadow-md">
              {tour.category.name}
            </span>
          </div>
        )}

        {/* Duration / Tag Pill */}
        {tour.duration && (
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
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
