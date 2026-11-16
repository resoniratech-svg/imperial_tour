import React, { useEffect, useState } from 'react';
import { Users, Mail, Phone, Calendar, DollarSign, Search } from 'lucide-react';
import { bookingService } from '../../services/api';
import { Booking } from '../../types';
import { formatCurrency } from '../../utils/pricing';

interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  country?: string;
  bookings: Booking[];
  totalSpent: number;
}

export const AdminCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);

  useEffect(() => {
    bookingService.getAllBookings({ limit: 100 } as any)
      .then((data) => {
        // Group by customerEmail
        const map = new Map<string, CustomerProfile>();
        for (const b of data.bookings) {
          const key = b.customerEmail.toLowerCase().trim();
          if (!map.has(key)) {
            map.set(key, {
              name: b.customerName,
              email: b.customerEmail,
              phone: b.customerPhone,
              country: b.customerCountry,
              bookings: [],
              totalSpent: 0,
            });
          }
          const prof = map.get(key)!;
          prof.bookings.push(b);
          prof.totalSpent += b.totalAmount;
        }
        setCustomers(Array.from(map.values()));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Customer Profiles</h1>
        <p className="text-xs text-slate-400 mt-1">
          Directory of travelers who have submitted bookings with Imperial Tours Qatar.
        </p>
      </div>

      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, email, or telephone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-gold-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">
          {filtered.length} Travelers
        </span>
      </div>

      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Contact Phone</th>
                <th className="py-3.5 px-4">Country</th>
                <th className="py-3.5 px-4">Total Reservations</th>
                <th className="py-3.5 px-4">Total Spend (QAR)</th>
                <th className="py-3.5 px-4 text-right">History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filtered.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{c.name}</div>
                    <div className="text-[11px] text-slate-400">{c.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{c.phone}</td>
                  <td className="py-3.5 px-4 text-slate-400">{c.country || 'N/A'}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-gold-400">
                      {c.bookings.length} {c.bookings.length === 1 ? 'Tour' : 'Tours'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {formatCurrency(c.totalSpent)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-gold-500/20 text-slate-300 hover:text-gold-400 font-semibold transition"
                    >
                      View Bookings
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Booking History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">{selectedCustomer.name}</h3>
                <p className="text-xs text-slate-400">{selectedCustomer.email} • {selectedCustomer.phone}</p>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto text-xs">
              <span className="font-bold text-gold-400 uppercase tracking-wider block">
                Booking History ({selectedCustomer.bookings.length})
              </span>
              {selectedCustomer.bookings.map((b) => (
                <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-mono text-gold-400 font-bold">{b.bookingRef}</div>
                    <div className="text-white font-medium">{b.tour?.title}</div>
                    <div className="text-slate-500 text-[11px]">
                      {new Date(b.travelDate).toISOString().split('T')[0]} ({b.numberOfGuests} Guests)
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">{formatCurrency(b.totalAmount)}</div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400">{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
