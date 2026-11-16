import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar, Users, ShieldCheck, MapPin, Phone, Mail, User,
  Globe, AlertCircle, ArrowRight, CheckCircle2, FileText, Sparkles
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchTourBySlug } from '../../store/slices/tourSlice';
import { calculateTourPrice, formatCurrency } from '../../utils/pricing';
import { bookingService } from '../../services/api';

export const BookingCheckoutPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { currentTour: tour, loading } = useSelector((state: RootState) => state.tours);

  // Form states initialized from URL or defaults
  const [guestsCount, setGuestsCount] = useState<number>(
    parseInt(searchParams.get('guests') || '2', 10)
  );
  const [travelDate, setTravelDate] = useState<string>(
    searchParams.get('date') || new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
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
      const res = await bookingService.createBooking({
        tourId: tour.id,
        travelDate,
        numberOfGuests: guestsCount,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        customerCountry: country || undefined,
        hotelName: hotelName || undefined,
        pickupLocation: pickupLocation || undefined,
        specialRequests: specialRequests || undefined,
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <Users className="w-3.5 h-3.5 text-gold-600" />
                    Number of Participants
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500 font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
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
                  <span className="text-slate-500">Travel Date:</span>
                  <span className="font-semibold text-slate-900">{travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Guests:</span>
                  <span className="font-semibold text-slate-900">{guestsCount} Person(s)</span>
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
