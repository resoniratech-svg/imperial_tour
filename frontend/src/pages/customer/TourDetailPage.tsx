import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock, Calendar, Users, CheckCircle2, XCircle, ShieldCheck,
  MapPin, Share2, ArrowRight, MessageCircle, AlertCircle, Info, Sparkles,
  Maximize2, X
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchTourBySlug, clearCurrentTour } from '../../store/slices/tourSlice';
import { calculateTourPrice, formatCurrency } from '../../utils/pricing';
import { TourCard } from '../../components/tours/TourCard';
import { WhatsAppButton } from '../../components/common/WhatsAppButton';

export const TourDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { currentTour: tour, similarTours, loading, error } = useSelector(
    (state: RootState) => state.tours
  );

  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchTourBySlug(slug));
    }
    return () => {
      dispatch(clearCurrentTour());
    };
  }, [dispatch, slug]);

  // Set initial guests count based on tour minPersons
  useEffect(() => {
    if (tour) {
      setGuestsCount(tour.minPersons || 2);
    }
  }, [tour]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-4">
        <div className="animate-pulse space-y-6">
          <div className="h-96 bg-slate-200 rounded-3xl" />
          <div className="h-10 bg-slate-200 rounded w-1/2" />
          <div className="h-4 bg-slate-200 rounded w-1/3" />
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center max-w-xl mx-auto px-4">
        <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">Tour Not Found</h2>
        <p className="text-slate-600 text-sm mb-6">
          The requested tour package could not be found or has been updated.
        </p>
        <Link
          to="/tours"
          className="px-6 py-3 bg-qatar-maroon text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow"
        >
          Browse All Tours
        </Link>
      </div>
    );
  }

  // Dynamic pricing calculation
  const pricingResult = calculateTourPrice(tour.pricingTiers, guestsCount);

  // Addon calculations
  let addonsTotal = 0;
  if (tour.addons && tour.addons.length > 0) {
    for (const addon of tour.addons) {
      const qty = selectedAddons[addon.id] || 0;
      if (qty > 0) {
        if (addon.priceUnit === 'per_person') {
          addonsTotal += addon.price * guestsCount * qty;
        } else {
          addonsTotal += addon.price * qty;
        }
      }
    }
  }

  const finalTotal = pricingResult.tierFound ? pricingResult.totalBasePrice + addonsTotal : 0;

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => {
      const next = { ...prev };
      if (next[addonId]) {
        delete next[addonId];
      } else {
        next[addonId] = 1;
      }
      return next;
    });
  };

  const handleProceedToBooking = () => {
    // Navigate to booking page with selected state
    const params = new URLSearchParams();
    params.append('guests', guestsCount.toString());
    params.append('date', selectedDate);
    if (Object.keys(selectedAddons).length > 0) {
      params.append('addons', JSON.stringify(selectedAddons));
    }
    navigate(`/booking/${tour.slug}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-slate-500 flex items-center gap-2">
        <Link to="/" className="hover:text-qatar-maroon">Home</Link>
        <span>/</span>
        <Link to="/tours" className="hover:text-qatar-maroon">Tours</Link>
        <span>/</span>
        {tour.category && (
          <>
            <Link to={`/tours/category/${tour.category.slug}`} className="hover:text-qatar-maroon">
              {tour.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-900 font-medium truncate">{tour.title}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tour Title & Meta Header - Positioned cleanly ABOVE the image so the photo is 100% visible */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              {tour.category && (
                <Link
                  to={`/tours/category/${tour.category.slug}`}
                  className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-qatar-maroon/10 hover:bg-qatar-maroon/20 text-qatar-maroon border border-qatar-maroon/25 transition"
                >
                  {tour.category.name}
                </Link>
              )}
              {tour.duration && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-qatar-maroon" />
                  <span>{tour.duration}</span>
                </span>
              )}
              {tour.availability && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-qatar-maroon" />
                  <span>{tour.availability}</span>
                </span>
              )}
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span>{tour.minPersons}–{tour.maxPersons} Guests</span>
              </span>
            </div>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: tour.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Tour link copied to clipboard!');
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-300 hover:border-slate-400 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {tour.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
            {tour.shortDesc}
          </p>
        </div>

        {/* Dedicated Tour Photo Showcase - Shows the FULL uncropped photo with ambient glow */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10 bg-slate-950 border border-slate-200/80 group">
          {/* Ambient blurred backdrop so any image aspect ratio fits naturally */}
          <img
            src={tour.coverImage || '/tours/half-day-desert-safari.jpg'}
            alt={tour.title}
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
          />

          {/* Main uncropped full photo display */}
          <div className="relative w-full max-h-[580px] min-h-[340px] sm:min-h-[440px] flex items-center justify-center p-2 sm:p-4">
            <img
              src={tour.coverImage || '/tours/half-day-desert-safari.jpg'}
              alt={tour.title}
              onClick={() => setLightboxOpen(true)}
              className="w-full max-h-[540px] object-contain rounded-2xl shadow-xl cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>

          {/* View Full Photo Action Button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/85 hover:bg-slate-950 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 shadow-xl transition transform hover:scale-105"
          >
            <Maximize2 className="w-4 h-4 text-yellow-400" />
            <span>View Full Photo</span>
          </button>
        </div>

        {/* Content Layout: Left 2 Cols (Details, Pricing Table, Itinerary), Right 1 Col (Dynamic Booking Widget) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Tour Description */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Experience Overview
              </h2>
              <div className="w-16 h-1 bg-gold-500 rounded-full" />
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {tour.description}
              </p>
            </div>

            {/* Transparent Official Pricing Table */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    Official Pricing Tiers
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    All prices are official Qatar Tourism rates in Qatari Riyal (QAR).
                  </p>
                </div>
                <span className="text-xs font-bold text-qatar-maroon bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  {tour.pricingType === 'fixed_group' ? 'Fixed Group Package' : 'Per Person Rates'}
                </span>
              </div>
              <div className="w-16 h-1 bg-gold-500 rounded-full" />

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                      <th className="py-3 px-4 font-bold uppercase tracking-wider">Group Size</th>
                      <th className="py-3 px-4 font-bold uppercase tracking-wider">Rate (QAR)</th>
                      <th className="py-3 px-4 font-bold uppercase tracking-wider">Pricing Type</th>
                      <th className="py-3 px-4 font-bold uppercase tracking-wider text-right">Total for Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(tour.pricingTiers || []).map((tier) => {
                      const isSingle = tier.minPersons === tier.maxPersons;
                      const label = isSingle
                        ? `${tier.minPersons} Person`
                        : `${tier.minPersons}–${tier.maxPersons} Persons`;

                      const isSelected = guestsCount >= tier.minPersons && guestsCount <= tier.maxPersons;

                      return (
                        <tr
                          key={tier.id}
                          className={`transition ${isSelected ? 'bg-gold-50/70 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                          <td className="py-3.5 px-4 flex items-center gap-2">
                            {isSelected && <span className="w-2 h-2 rounded-full bg-gold-500" />}
                            <span>{label}</span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {formatCurrency(tier.pricePerPerson)}
                            {!tier.isTotal && ' / person'}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${tier.isTotal ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'}`}>
                              {tier.isTotal ? 'Fixed Group Total' : 'Per Person'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-serif font-bold text-slate-900">
                            {tier.isTotal
                              ? formatCurrency(tier.pricePerPerson)
                              : formatCurrency(tier.pricePerPerson * tier.minPersons)}
                            {!isSingle && !tier.isTotal && ` to ${formatCurrency(tier.pricePerPerson * tier.maxPersons)}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <span>
                  Group sizes outside the above tiers: We gladly accommodate private corporate delegations and large groups. Please select “Contact us for group pricing” or contact our concierge via WhatsApp.
                </span>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-serif text-lg font-bold text-slate-900">What’s Included</h3>
                </div>
                {tour.inclusions && tour.inclusions.length > 0 ? (
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {tour.inclusions.map((inc) => (
                      <li key={inc.id} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                        <span>{inc.item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-400">See tour description for details.</p>
                )}
              </div>

              {/* Exclusions */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <h3 className="font-serif text-lg font-bold text-slate-900">Exclusions & Optionals</h3>
                </div>
                {tour.exclusions && tour.exclusions.length > 0 ? (
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {tour.exclusions.map((exc) => (
                      <li key={exc.id} className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold mt-0.5">✕</span>
                          <span>{exc.item}</span>
                        </div>
                        {exc.price && (
                          <span className="text-slate-900 font-bold whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            +{formatCurrency(exc.price)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-emerald-600 font-medium">
                    All major items for this experience are included in the package price.
                  </p>
                )}
              </div>
            </div>

            {/* Itinerary (if available, e.g. Tour 18, Tour 19) */}
            {tour.itineraryItems && tour.itineraryItems.length > 0 && (
              <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Tour Itinerary & Segments
                </h3>
                <div className="w-16 h-1 bg-gold-500 rounded-full" />
                <div className="space-y-6 pt-2">
                  {tour.itineraryItems.map((item, idx) => {
                    let parsedItems: string[] = [];
                    try {
                      parsedItems = JSON.parse(item.items);
                    } catch {
                      parsedItems = [item.items];
                    }
                    return (
                      <div key={item.id} className="border-l-2 border-gold-500 pl-4 py-1">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                          {item.title}
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {parsedItems.map((stop, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              <span>{stop}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Booking Engine Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl border-2 border-gold-500/30 p-6 shadow-2xl space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  {pricingResult.isFixedPrice ? 'Fixed Group Package' : 'Calculated Pricing'}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  {pricingResult.tierFound ? (
                    <>
                      <span className="font-serif text-3xl font-bold text-slate-900">
                        {formatCurrency(finalTotal)}
                      </span>
                      <span className="text-xs text-slate-500">
                        {pricingResult.isFixedPrice ? '(Total for group)' : `(${formatCurrency(pricingResult.pricePerPerson)}/person)`}
                      </span>
                    </>
                  ) : (
                    <span className="font-serif text-xl font-bold text-rose-600">
                      Contact for Group Pricing
                    </span>
                  )}
                </div>
              </div>

              {/* Guests Count Selector (Triggers dynamic pricing recalculation) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gold-600" />
                    Number of Participants
                  </span>
                  <span className="text-gold-600 font-bold">{guestsCount} Guest(s)</span>
                </label>

                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestsCount(num)}
                      className={`py-2 text-xs font-bold rounded-lg border transition ${
                        guestsCount === num
                          ? 'bg-slate-900 border-slate-900 text-gold-400 shadow'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-gold-500'
                      }`}
                    >
                      {num === 6 ? '6+' : num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Date Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-600" />
                  Travel Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-gold-500"
                />
              </div>

              {/* Optional Add-ons (if tour has addons) */}
              {tour.addons && tour.addons.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Optional Add-ons
                  </label>
                  <div className="space-y-2">
                    {tour.addons.map((addon) => {
                      const isChecked = !!selectedAddons[addon.id];
                      return (
                        <div
                          key={addon.id}
                          onClick={() => handleToggleAddon(addon.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between text-xs ${
                            isChecked
                              ? 'bg-gold-50 border-gold-500 text-slate-900'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <p className="font-semibold">{addon.name}</p>
                            <p className="text-[10px] text-slate-500">
                              +{formatCurrency(addon.price)} ({addon.priceUnit.replace('_', ' ')})
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-gold-600 focus:ring-gold-500 w-4 h-4"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Booking Summary Breakdown */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base Tour ({guestsCount} {guestsCount === 1 ? 'guest' : 'guests'}):</span>
                  <span className="font-semibold text-slate-900">
                    {pricingResult.tierFound ? formatCurrency(pricingResult.totalBasePrice) : 'N/A'}
                  </span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Optional Addons:</span>
                    <span className="font-semibold text-slate-900">+{formatCurrency(addonsTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Amount (QAR):</span>
                  <span className="font-serif text-lg text-qatar-maroon">
                    {pricingResult.tierFound ? formatCurrency(finalTotal) : 'Contact Us'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {pricingResult.tierFound ? (
                  <button
                    onClick={handleProceedToBooking}
                    className="w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-gold-glow flex items-center justify-center gap-2 transition transform active:scale-95"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to={`/contact?subject=${encodeURIComponent(`Group Inquiry for ${tour.title}`)}&guests=${guestsCount}`}
                    className="w-full py-3.5 bg-qatar-maroon hover:bg-qatar-maroon-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow text-center block transition"
                  >
                    Contact For Group Pricing
                  </Link>
                )}

                {/* Direct WhatsApp Inquiry for this tour */}
                <WhatsAppButton
                  tourName={tour.title}
                  travelDate={selectedDate}
                  numberOfGuests={guestsCount}
                  estimatedPrice={pricingResult.tierFound ? finalTotal : undefined}
                />
              </div>

              <div className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>No instant card charge. Administrator reviews booking.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Tours Section */}
        {similarTours && similarTours.length > 0 && (
          <div className="mt-24 pt-12 border-t border-slate-200">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon">
                More in {tour.category?.name}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                You May Also Enjoy
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(similarTours || []).map((simTour) => (
                <TourCard key={simTour.id} tour={simTour} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50 shadow-lg"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={tour.coverImage || '/tours/half-day-desert-safari.jpg'}
            alt={tour.title}
            className="max-w-[95vw] max-h-[92vh] object-contain rounded-xl shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
