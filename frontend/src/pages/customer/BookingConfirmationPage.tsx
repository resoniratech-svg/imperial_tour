import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2, Clock, Calendar, Users, MapPin, Phone, Mail,
  Printer, MessageCircle, AlertCircle, ShieldCheck, ArrowRight
} from 'lucide-react';
import { bookingService } from '../../services/api';
import { Booking } from '../../types';
import { formatCurrency } from '../../utils/pricing';

export const BookingConfirmationPage: React.FC = () => {
  const { ref } = useParams<{ ref: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ref) {
      bookingService.getBookingByRef(ref)
        .then((data) => setBooking(data))
        .catch((err) => {
          console.error(err);
          setError('Booking reference not found');
        })
        .finally(() => setLoading(false));
    }
  }, [ref]);

  if (loading) {
    return (
      <div className="min-h-screen pt-36 pb-20 max-w-xl mx-auto px-4 text-center">
        <div className="animate-pulse space-y-4">
          <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto" />
          <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto" />
          <div className="h-4 bg-slate-200 rounded w-2/3 mx-auto" />
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen pt-36 pb-20 max-w-xl mx-auto px-4 text-center">
        <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">Booking Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">
          We could not locate reference {ref}. Please check your confirmation email or contact our support.
        </p>
        <Link
          to="/"
          className="px-6 py-2.5 bg-qatar-maroon text-white font-bold text-xs uppercase tracking-wider rounded-lg"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved by Admin
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1.5">
            Rejected
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            Cancelled
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            Completed
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Pending Admin Approval
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card Header */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-slate-900 via-qatar-maroon-dark to-slate-900 p-8 text-center text-white">
            <div className="w-16 h-16 rounded-full bg-gold-500/20 border-2 border-gold-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-gold-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Booking Request Received
            </span>
            <h1 className="font-serif text-3xl font-bold text-white mt-1">
              Thank You, {booking.customerName}!
            </h1>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
              Your tour request has been submitted to Imperial Tours Qatar. Our operations concierge is reviewing vehicle and guide availability.
            </p>
          </div>

          {/* Reference & Status Bar */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Booking Reference
              </span>
              <div className="font-mono text-lg font-bold text-qatar-maroon">
                {booking.bookingRef}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">Current Status:</span>
              {getStatusBadge(booking.status)}
            </div>
          </div>

          {/* Important Admin Approval Notice */}
          <div className="p-6 bg-amber-50/70 border-b border-amber-100 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Next Steps:</strong> In accordance with Imperial Tours Qatar standards, your booking is currently <strong>Pending</strong>. An administrator will review your requested date, vehicle allocation, and hotel pickup location. You will receive an official confirmation via email or phone call.
            </div>
          </div>

          {/* Detailed Summary */}
          <div className="p-8 space-y-6">
            <h2 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Tour Itinerary Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500">Tour Experience:</span>
                <p className="font-bold text-slate-900 text-sm">{booking.tour?.title}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500">Travel Date:</span>
                <p className="font-bold text-slate-900 text-sm">
                  {new Date(booking.travelDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500">Participants:</span>
                <p className="font-bold text-slate-900">{booking.numberOfGuests} Guest(s)</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500">Pickup Location:</span>
                <p className="font-bold text-slate-900">
                  {booking.pickupLocation || booking.hotelName || 'To be coordinated'}
                </p>
              </div>

              {booking.specialRequests && (
                <div className="sm:col-span-2 space-y-1 pt-2">
                  <span className="text-slate-500">Special Notes:</span>
                  <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {booking.specialRequests}
                  </p>
                </div>
              )}
            </div>

            {/* Financial Summary */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-serif text-base font-bold text-slate-900 mb-3">
                Pricing Breakdown (QAR)
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Tour Base ({booking.numberOfGuests} guests):</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(booking.subtotal)}</span>
                </div>
                {booking.addonsTotal > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Optional Addons:</span>
                    <span className="font-semibold text-slate-900">+{formatCurrency(booking.addonsTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Amount:</span>
                  <span className="font-serif text-xl text-qatar-maroon font-bold">
                    {formatCurrency(booking.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-gold-500 text-slate-700 text-xs font-bold uppercase tracking-wider transition"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Print Confirmation</span>
              </button>

              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-qatar-maroon hover:bg-qatar-maroon-dark text-white text-xs font-bold uppercase tracking-wider transition shadow"
              >
                <span>Back to Homepage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
