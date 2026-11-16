import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Calendar, DollarSign, Compass, Users } from 'lucide-react';
import { contentService } from '../../services/api';
import { formatCurrency } from '../../utils/pricing';

export const AdminReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState<'monthly' | 'daily' | 'tour-wise' | 'customers'>('tour-wise');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    contentService.getReports(reportType)
      .then((res) => setData(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [reportType]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Financial & Booking Reports</h1>
          <p className="text-xs text-slate-400 mt-1">
            Revenue calculations are strictly generated from recorded payments in the database.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['tour-wise', 'monthly', 'daily', 'customers'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                reportType === type
                  ? 'bg-gold-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {type.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs">Generating report data...</div>
        ) : reportType === 'tour-wise' && Array.isArray(data) ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">Tour Title</th>
                  <th className="py-3 px-4">Total Reservations</th>
                  <th className="py-3 px-4 text-right">Recorded Revenue (QAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {data.map((item: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 font-bold text-white">{item.tourTitle}</td>
                    <td className="py-3 px-4">{item.totalBookings}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-gold-400">
                      {formatCurrency(item.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : reportType === 'customers' && Array.isArray(data) ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4">Bookings Count</th>
                  <th className="py-3 px-4 text-right">Total Booked Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {data.map((c: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 font-bold text-white">{c.customerName}</td>
                    <td className="py-3 px-4 font-mono">{c.customerPhone}</td>
                    <td className="py-3 px-4 text-slate-400">{c.customerCountry || 'N/A'}</td>
                    <td className="py-3 px-4">{c._count}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-white">
                      {formatCurrency(c._sum?.totalAmount || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
              {reportType === 'monthly' ? 'Monthly Aggregations' : 'Daily Aggregations'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data && Object.entries(data).map(([period, val]: [string, any]) => (
                <div key={period} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-xs font-mono">{period}</div>
                  <div className="font-bold text-white text-sm mt-1">{val.count} Bookings</div>
                  <div className="text-gold-400 font-serif font-bold text-base mt-0.5">
                    {formatCurrency(val.revenue)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
