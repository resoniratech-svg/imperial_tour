import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar, Users, ShieldCheck, MapPin, Phone, Mail, User,
  Globe, AlertCircle, ArrowRight, CheckCircle2, FileText, Sparkles,
  ChevronsUpDown
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchTourBySlug } from '../../store/slices/tourSlice';
import { calculateTourPrice, formatCurrency } from '../../utils/pricing';
import { bookingService } from '../../services/api';

const AGE_OPTIONS = Array.from({ length: 85 }, (_, i) => `${i + 1} Years`);

const formatDateDisplay = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);
  const d = new Date(year, month, day);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getInitialDates = () => {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() + 7);
  const end = new Date(now);
  end.setDate(now.getDate() + 14);

  const formatISO = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  return {
    start: formatISO(start),
    end: formatISO(end),
  };
};

export const BookingCheckoutPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { currentTour: tour, loading } = useSelector((state: RootState) => state.tours);

  // Form states initialized from URL or defaults
  const initialDates = getInitialDates();

  const [startDate, setStartDate] = useState<string>(
    searchParams.get('startDate') || searchParams.get('date') || initialDates.start
  );
  const [endDate, setEndDate] = useState<string>(
    searchParams.get('endDate') || initialDates.end
  );
  const [guestsCount, setGuestsCount] = useState<number>(
    parseInt(searchParams.get('guests') || searchParams.get('passengers') || '2', 10)
  );

  const [paxAges, setPaxAges] = useState<string[]>(() => {
    const fromParam = searchParams.get('paxAges');
    if (fromParam) {
      return fromParam.split(',');
    }
    const initialGuests = parseInt(searchParams.get('guests') || searchParams.get('passengers') || '2', 10);
    return Array.from({ length: Math.max(1, initialGuests) }, () => '18 Years');
  });

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const handlePassengersChange = (newCount: number) => {
    const count = Math.max(1, Math.min(10, newCount));
    setGuestsCount(count);
    setPaxAges((prev) => {
      const next = [...prev];
      if (count > next.length) {
        while (next.length < count) {
          next.push('18 Years');
        }
      } else {
        next.splice(count);
      }
      return next;
    });
  };

  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>(() => {
    try {
      const param = searchParams.get('addons');
      return param ? JSON.parse(param) : {};
    } catch {
      return {};
    }
  });

  // Customer contact details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      dispatch(fetchTourBySlug(slug));
    }
  }, [dispatch, slug]);

  if (loading || !tour) {
    return (
      <div className="min-h-screen pt-32 pb-20 max-w-4xl mx-auto px-4 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto" />
          <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  // Price calculation
  const pricingResult = calculateTourPrice(tour.pricingTiers, guestsCount);

  let addonsTotal = 0;
  const structuredAddons: Array<{ addonId: string; quantity: number }> = [];

  if (tour.addons && tour.addons.length > 0) {
    for (const addon of tour.addons) {
      const qty = selectedAddons[addon.id] || 0;
      if (qty > 0) {
        structuredAddons.push({ addonId: addon.id, quantity: qty });
        if (addon.priceUnit === 'per_person') {
          addonsTotal += addon.price * guestsCount * qty;
        } else {
          addonsTotal += addon.price * qty;
        }
      }
    }
  }

  const grandTotal = pricingResult.tierFound ? pricingResult.totalBasePrice + addonsTotal : 0;

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFormError('Please enter your full name, valid email, and contact phone number.');
      return;
    }

    if (!pricingResult.tierFound) {
      setFormError('No pricing available for this guest count. Please contact our team for custom group rates.');
      return;
    }

    try {
      setSubmitting(true);
      const combinedRequests = [
        `Dates: ${formatDateDisplay(startDate)} to ${formatDateDisplay(endDate)}`,
        `Passengers: ${guestsCount} (${paxAges.map((a, i) => `Pax ${i + 1}: ${a}`).join(', ')})`,
        specialRequests ? `Special Requests: ${specialRequests}` : '',
      ]
        .filter(Boolean)
        .join(' | ');

      const res = await bookingService.createBooking({
        tourId: tour.id,
        travelDate: startDate,
        numberOfGuests: guestsCount,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        customerCountry: country || undefined,
        hotelName: hotelName || undefined,
        pickupLocation: pickupLocation || undefined,
        specialRequests: combinedRequests,
        addons: structuredAddons.length > 0 ? structuredAddons : undefined,
      });

      // Redirect to Booking Confirmation page
      navigate(`/booking-confirmation/${res.booking.bookingRef}`);
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setFormError(
        err.response?.data?.error ||
        'Failed to submit booking request. Please check your information and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon">
            Seamless Tour Reservation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            Book Your Qatar Experience
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Review your tour details, specify pickup information, and submit your request for confirmation.
          </p>
        </div>

        {formError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Details Form (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Selected Tour & Schedule */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gold-500" />
                1. Selected Tour & Schedule
              </h2>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <img
                  src={tour.coverImage || 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400'}
                  alt={tour.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">
                    {tour.category?.name}
                  </span>
                  <h3 className="font-serif text-base font-bold text-slate-900">{tour.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    {tour.duration && <span>Duration: {tour.duration}</span>}
                    <span>•</span>
                    <span>{tour.minPersons}–{tour.maxPersons} Guests per Vehicle</span>
                  </div>
                </div>
              </div>

              {/* Selected Schedule & Passenger Demographics */}
              <div className="pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 items-start p-4 rounded-xl bg-slate-50 border border-slate-200">
                  {/* Start Date */}
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-[#601934] block">
                      Start Date
                    </label>
                    <div
                      onClick={() => startDateRef.current?.showPicker?.() || startDateRef.current?.focus()}
                      className="relative flex items-center justify-between w-full bg-white text-slate-800 border border-slate-300 rounded px-3 py-2 text-xs font-medium shadow-sm cursor-pointer hover:border-[#601934] transition"
                    >
                      <span className="text-slate-800">
                        {formatDateDisplay(startDate)}
                      </span>
                      <Calendar className="w-4 h-4 text-slate-600 shrink-0 pointer-events-none" />
                      <input
                        ref={startDateRef}
                        type="date"
                        value={startDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-[#601934] block">
                      End Date
                    </label>
                    <div
                      onClick={() => endDateRef.current?.showPicker?.() || endDateRef.current?.focus()}
                      className="relative flex items-center justify-between w-full bg-white text-slate-800 border border-slate-300 rounded px-3 py-2 text-xs font-medium shadow-sm cursor-pointer hover:border-[#601934] transition"
                    >
                      <span className="text-slate-800">
                        {formatDateDisplay(endDate)}
                      </span>
                      <Calendar className="w-4 h-4 text-slate-600 shrink-0 pointer-events-none" />
                      <input
                        ref={endDateRef}
                        type="date"
                        value={endDate}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Number of Passengers */}
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-[#601934] block">
                      Number of Passengers:
                    </label>
                    <div className="relative">
                      <select
                        value={guestsCount}
                        onChange={(e) => handlePassengersChange(Number(e.target.value))}
                        className="w-full bg-white text-slate-800 border border-slate-300 rounded px-3 py-2 text-xs font-medium shadow-sm outline-none focus:border-[#601934] focus:ring-1 focus:ring-[#601934] cursor-pointer appearance-none pr-7"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                        <ChevronsUpDown className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Pax Ages */}
                  {paxAges.map((age, idx) => (
                    <div key={`pax-age-${idx}`} className="space-y-1 text-left">
                      <label className="text-xs font-semibold text-[#601934] block">
                        {`Pax ${idx + 1} Age:`}
                      </label>
                      <div className="relative">
                        <select
                          value={age}
                          onChange={(e) => {
                            const newAges = [...paxAges];
                            newAges[idx] = e.target.value;
                            setPaxAges(newAges);
                          }}
                          className="w-full bg-white text-slate-800 border border-slate-300 rounded px-3 py-2 text-xs font-medium shadow-sm outline-none focus:border-[#601934] focus:ring-1 focus:ring-[#601934] cursor-pointer appearance-none pr-7"
                        >
                          {AGE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Customer Contact Information */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-gold-500" />
                2. Lead Passenger Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexander Hamilton"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+974 5555 1234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. United Kingdom, Qatar, UAE"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Hotel / Residence Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Ritz-Carlton, Doha"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Pickup Location & Special Requests */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500" />
                3. Pickup & Special Preferences
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Exact Pickup Address / Terminal
                  </label>
                  <input
                    type="text"
                    placeholder="Hotel lobby, Hamad International Airport, or private address in Doha"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Special Requests (Child seats, dietary requests, anniversary, etc.)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us if you have dietary preferences, need child booster seats, or have timing requirements..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-gold-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl border-2 border-gold-500/30 p-6 shadow-xl space-y-6">
              <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Booking Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tour Name:</span>
                  <span className="font-semibold text-slate-900 text-right max-w-[180px] truncate">{tour.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Start Date:</span>
                  <span className="font-semibold text-slate-900">{formatDateDisplay(startDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">End Date:</span>
                  <span className="font-semibold text-slate-900">{formatDateDisplay(endDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Passengers:</span>
                  <span className="font-semibold text-slate-900">{guestsCount} Person(s)</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-slate-500 shrink-0">Passenger Ages:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {paxAges.map((a, i) => `Pax ${i + 1}: ${a}`).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pricing Basis:</span>
                  <span className="font-semibold text-slate-900">
                    {pricingResult.isFixedPrice ? 'Fixed Group Rate' : `${formatCurrency(pricingResult.pricePerPerson)} / person`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Base Subtotal:</span>
                  <span className="font-semibold text-slate-900">
                    {pricingResult.tierFound ? formatCurrency(pricingResult.totalBasePrice) : 'Contact Us'}
                  </span>
                </div>

                {addonsTotal > 0 && (
                  <div className="flex justify-between text-gold-600 font-semibold pt-2 border-t border-slate-100">
                    <span>Optional Addons:</span>
                    <span>+{formatCurrency(addonsTotal)}</span>
                  </div>
                )}

                <div className="pt-3 border-t-2 border-slate-100 flex items-baseline justify-between text-slate-900">
                  <span className="text-sm font-bold">Total Amount:</span>
                  <span className="font-serif text-2xl font-bold text-qatar-maroon">
                    {pricingResult.tierFound ? formatCurrency(grandTotal) : 'Contact Us'}
                  </span>
                </div>
              </div>

              {/* Status Note */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-amber-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  Booking Request Notice
                </p>
                <p className="leading-relaxed">
                  Submitting this form initiates your booking reservation. In accordance with ITQ quality standards, bookings are assigned a “Pending” status until confirmed by an administrator. No upfront payment required online.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !pricingResult.tierFound}
                className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:shadow-gold-glow flex items-center justify-center gap-2 transition"
              >
                {submitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <span>Submit Booking Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[10px] text-center text-slate-400">
                By submitting you agree to ITQ Terms & Conditions and Privacy Policy.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
