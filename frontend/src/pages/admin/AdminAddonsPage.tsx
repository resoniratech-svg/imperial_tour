import React, { useEffect, useState } from 'react';
import { PlusCircle, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { tourService } from '../../services/api';
import { Tour, TourAddon } from '../../types';
import { formatCurrency } from '../../utils/pricing';

export const AdminAddonsPage: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tourService.getAllTours()
      .then((data) => setTours(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Tour Add-ons Management</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review and configure optional enhancements (e.g. Camel ride, Jet ski rentals, Falcon photography).
        </p>
      </div>

      <div className="space-y-6">
        {tours.map((t) => (
          <div key={t.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-serif text-base font-bold text-white">{t.title}</h3>
                <span className="text-[11px] text-gold-400">{t.category?.name}</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {t.addons?.length || 0} Optional Add-ons
              </span>
            </div>

            {t.addons && t.addons.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {t.addons.map((a) => (
                  <div key={a.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">{a.name}</div>
                      <div className="text-[10px] text-slate-400">{a.description || a.priceUnit.replace('_', ' ')}</div>
                    </div>
                    <span className="font-mono font-bold text-gold-400">+{formatCurrency(a.price)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No add-ons currently attached to this tour.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
