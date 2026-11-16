import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, Calendar, Clock, CheckCircle2, DollarSign, Users,
  ArrowUpRight, AlertCircle, PlusCircle, Check, X, ShieldAlert
} from 'lucide-react';
import { bookingService } from '../../services/api';
import { Booking } from '../../types';
import { formatCurrency } from '../../utils/pricing';

export const AdminDashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<{
    totalTours: number;
    totalBookings: number;
    pendingBookings: number;
    approvedBookings: number;
    completedBookings: number;
    totalCustomers: number;
    totalRevenue: number;
    recentBookings: Booking[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadStats = () => {
    setLoading(true);
    bookingService.getDashboardStats()
      .then((data) => setStats(data))
      .catch((err) => console.error('Dashboard stats fetch error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      setActionLoading(bookingId);
      await bookingService.updateStatus(bookingId, status, `Status changed by admin to ${status}`);
      loadStats();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading && !stats) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-800 rounded w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-800 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Tours',
      value: stats?.totalTours || 25,
      sub: 'All active catalog items',
      icon: <Compass className="w-5 h-5 text-gold-400" />,
      color: 'bg-gold-500/10 border-gold-500/30',
    },
    {
      label: 'Pending Requests',
      value: stats?.pendingBookings || 0,
      sub: 'Awaiting admin review',
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      color: 'bg-amber-500/10 border-amber-500/30',
    },
    {
      label: 'Approved Bookings',
      value: stats?.approvedBookings || 0,
      sub: 'Confirmed & dispatched',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      color: 'bg-emerald-500/10 border-emerald-500/30',
    },
    {
      label: 'Recorded Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      sub: 'From completed payments',
      icon: <DollarSign className="w-5 h-5 text-purple-400" />,
      color: 'bg-purple-500/10 border-purple-500/30',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Operations Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time overview of Imperial Tours Qatar bookings, revenue, and active catalog.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/tours/new"
            className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Tour</span>
          </Link>
          <Link
            to="/admin/bookings"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Manage All Bookings</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl border ${card.color} flex items-center justify-between`}
          >
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {card.label}
              </span>
              <div className="font-serif text-2xl font-bold text-white">
                {card.value}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {card.sub}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Secondary metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Total Bookings Lifetime</span>
            <div className="text-xl font-bold text-white mt-1">{stats?.totalBookings || 0}</div>
          </div>
          <Calendar className="w-6 h-6 text-slate-500" />
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Completed Tours</span>
            <div className="text-xl font-bold text-white mt-1">{stats?.completedBookings || 0}</div>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Unique Travelers</span>
            <div className="text-xl font-bold text-white mt-1">{stats?.totalCustomers || 0}</div>
          </div>
          <Users className="w-6 h-6 text-gold-500" />
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-white">Recent Booking Requests</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review and approve pending tour requests.
            </p>
          </div>
          <Link
            to="/admin/bookings"
            className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Tour</th>
                <th className="py-3 px-4">Travel Date</th>
                <th className="py-3 px-4">Guests</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {stats?.recentBookings && stats.recentBookings.length > 0 ? (
                stats.recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-gold-400">
                      {b.bookingRef}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{b.customerName}</div>
                      <div className="text-[11px] text-slate-500">{b.customerEmail}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-200">
                      {b.tour?.title}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(b.travelDate).toISOString().split('T')[0]}
                    </td>
                    <td className="py-3 px-4">{b.numberOfGuests}</td>
                    <td className="py-3 px-4 font-bold text-white">
                      {formatCurrency(b.totalAmount)}
                    </td>
                    <td className="py-3 px-4">
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
                    <td className="py-3 px-4 text-right">
                      {b.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleUpdateStatus(b.id, 'approved')}
                            disabled={actionLoading === b.id}
                            className="p-1 rounded bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white transition"
                            title="Approve Booking"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(b.id, 'rejected')}
                            disabled={actionLoading === b.id}
                            className="p-1 rounded bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white transition"
                            title="Reject Booking"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <Link
                          to={`/admin/bookings?id=${b.id}`}
                          className="text-xs text-gold-400 hover:underline font-semibold"
                        >
                          View
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No bookings recorded yet. New customer submissions will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
