import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Calendar, Search, Filter, Check, X, Clock, CheckCircle2,
  DollarSign, FileText, User, MapPin, Eye, AlertCircle
} from 'lucide-react';
import { bookingService } from '../../services/api';
import { Booking } from '../../types';
import { formatCurrency } from '../../utils/pricing';

export const AdminBookingsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || '');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Booking Modal
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Pickup');
  const [paymentTx, setPaymentTx] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getAllBookings({
        status: statusFilter || undefined,
        search: searchQuery || undefined,
      });
      setBookings(data.bookings);
      setTotal(data.total);

      // If specific id param is provided, open it
      const targetId = searchParams.get('id');
      if (targetId) {
        const found = data.bookings.find((b) => b.id === targetId);
        if (found) {
          handleOpenDetails(found);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [statusFilter]);

  const handleOpenDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setAdminNotes(booking.adminNotes || '');
    setPaymentAmount(booking.totalAmount);
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedBooking) return;
    try {
      setActionLoading(true);
      const updated = await bookingService.updateStatus(selectedBooking.id, newStatus, adminNotes);
      setSelectedBooking(updated);
      await loadBookings();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRecordPayment = async () => {
    if (!selectedBooking) return;
    try {
      setActionLoading(true);
      await bookingService.recordPayment(selectedBooking.id, {
        amount: paymentAmount,
        method: paymentMethod,
        transactionId: paymentTx,
        status: 'completed',
        notes: `Payment recorded via Admin Console (${paymentMethod})`,
      });
      alert('Payment successfully recorded!');
      await loadBookings();
      setSelectedBooking(null);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to record payment');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Booking Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review, approve, reject, or mark completed for all Qatar tourism bookings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['', 'pending', 'approved', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                statusFilter === st
                  ? 'bg-gold-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {st === '' ? `All (${total})` : st}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Booking Ref (e.g. ITQ-...), customer name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadBookings()}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-gold-500"
          />
        </div>
        <button
          onClick={loadBookings}
          className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-700"
        >
          Filter
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Ref</th>
                <th className="py-3.5 px-4">Lead Guest</th>
                <th className="py-3.5 px-4">Tour Experience</th>
                <th className="py-3.5 px-4">Travel Date</th>
                <th className="py-3.5 px-4">Guests</th>
                <th className="py-3.5 px-4">Total (QAR)</th>
                <th className="py-3.5 px-4">Booking Status</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/50 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-gold-400">
                    {b.bookingRef}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{b.customerName}</div>
                    <div className="text-[11px] text-slate-400">{b.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">
                    {b.tour?.title}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {new Date(b.travelDate).toISOString().split('T')[0]}
                  </td>
                  <td className="py-3.5 px-4">{b.numberOfGuests}</td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {formatCurrency(b.totalAmount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        b.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : b.status === 'rejected'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : b.status === 'completed'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                        b.paymentStatus === 'paid'
                          ? 'bg-emerald-900/40 text-emerald-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenDetails(b)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-gold-500/20 text-slate-300 hover:text-gold-400 font-semibold transition"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Actions Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block">
                  Reference: {selectedBooking.bookingRef}
                </span>
                <h2 className="font-serif text-xl font-bold text-white mt-0.5">
                  Booking Details & Dispatch
                </h2>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Current Status:</span>
                <span className="font-bold text-white uppercase ml-2">{selectedBooking.status}</span>
              </div>
              <div>
                <span className="text-slate-400">Payment Status:</span>
                <span className="font-bold text-gold-400 uppercase ml-2">{selectedBooking.paymentStatus}</span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">Customer Name:</span>
                <p className="font-bold text-white">{selectedBooking.customerName}</p>
                <p className="text-slate-400">{selectedBooking.customerEmail}</p>
                <p className="text-slate-400">{selectedBooking.customerPhone}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">Tour & Date:</span>
                <p className="font-bold text-white">{selectedBooking.tour?.title}</p>
                <p className="text-slate-400">
                  {new Date(selectedBooking.travelDate).toISOString().split('T')[0]} ({selectedBooking.numberOfGuests} Guests)
                </p>
                <p className="text-gold-400 font-bold">{formatCurrency(selectedBooking.totalAmount)}</p>
              </div>

              <div className="sm:col-span-2 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">Pickup Details:</span>
                <p className="text-white font-medium">
                  {selectedBooking.pickupLocation || selectedBooking.hotelName || 'Pickup not specified'}
                </p>
                {selectedBooking.specialRequests && (
                  <p className="text-slate-400 pt-1 text-[11px]">
                    <strong>Special Requests:</strong> {selectedBooking.specialRequests}
                  </p>
                )}
              </div>
            </div>

            {/* Admin Notes */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Internal Admin Notes
              </label>
              <textarea
                rows={2}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add internal notes on vehicle dispatch, driver assignment, or customer contact..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-gold-500"
              />
            </div>

            {/* Status Change Buttons */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Update Status
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus('approved')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Booking</span>
                </button>
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus('completed')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Completed</span>
                </button>
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus('rejected')}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus('cancelled')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Record Payment Section */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Record Payment (Real Accounting Entry)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Amount (QAR)</label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-bold text-gold-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="Cash on Pickup">Cash on Pickup</option>
                    <option value="POS Card Terminal">POS Card Terminal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Online Payment Gateway">Online Gateway (External)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Tx Ref / Receipt #</label>
                  <input
                    type="text"
                    placeholder="REC-10294"
                    value={paymentTx}
                    onChange={(e) => setPaymentTx(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleRecordPayment}
                disabled={actionLoading}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow"
              >
                Record Completed Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
