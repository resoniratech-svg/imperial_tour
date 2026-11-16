import React, { useEffect, useState } from 'react';
import { DollarSign, Save, Plus, Trash2, CheckCircle2, AlertCircle, Compass } from 'lucide-react';
import { tourService } from '../../services/api';
import { Tour, TourPricingTier } from '../../types';
import { formatCurrency } from '../../utils/pricing';

export const AdminPricingPage: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [selectedTourId, setSelectedTourId] = useState<string>('');
  const [tiers, setTiers] = useState<Array<{ minPersons: number; maxPersons: number; pricePerPerson: number; isTotal: boolean }>>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadTours = async () => {
    try {
      setLoading(true);
      const data = await tourService.getAllTours();
      setTours(data);
      if (data.length > 0 && !selectedTourId) {
        setSelectedTourId(data[0].id);
        setTiers(data[0].pricingTiers.map(t => ({
          minPersons: t.minPersons,
          maxPersons: t.maxPersons,
          pricePerPerson: t.pricePerPerson,
          isTotal: t.isTotal,
        })));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  const handleSelectTour = (tourId: string) => {
    setSelectedTourId(tourId);
    setSuccessMsg(null);
    const found = tours.find((t) => t.id === tourId);
    if (found) {
      setTiers(found.pricingTiers.map(t => ({
        minPersons: t.minPersons,
        maxPersons: t.maxPersons,
        pricePerPerson: t.pricePerPerson,
        isTotal: t.isTotal,
      })));
    }
  };

  const handleTierChange = (index: number, field: string, value: any) => {
    setTiers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleAddTier = () => {
    const lastTier = tiers[tiers.length - 1];
    const newMin = lastTier ? lastTier.maxPersons + 1 : 1;
    setTiers((prev) => [
      ...prev,
      { minPersons: newMin, maxPersons: newMin, pricePerPerson: 500, isTotal: false },
    ]);
  };

  const handleRemoveTier = (index: number) => {
    setTiers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSavePricing = async () => {
    if (!selectedTourId) return;
    try {
      setSaving(true);
      setSuccessMsg(null);
      await tourService.updateTour(selectedTourId, { pricingTiers: tiers } as any);
      setSuccessMsg('Pricing tiers successfully updated and live on customer website!');
      await loadTours();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update pricing');
    } finally {
      setSaving(false);
    }
  };

  const activeTour = tours.find((t) => t.id === selectedTourId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Dynamic Pricing Management</h1>
        <p className="text-xs text-slate-400 mt-1">
          Modify rates for any of the 25 tours across Qatar. Changes take immediate effect on the customer booking engine without modifying source code.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tour Selector List */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 max-h-[75vh] overflow-y-auto">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block px-2 mb-2">
            Select Tour ({tours.length})
          </span>
          {tours.map((t) => {
            const isSelected = t.id === selectedTourId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTour(t.id)}
                className={`w-full text-left p-3 rounded-xl transition text-xs flex items-center justify-between ${
                  isSelected
                    ? 'bg-gold-500/10 border border-gold-500/40 text-gold-400 font-bold'
                    : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="truncate pr-2">
                  <div className="truncate">{t.title}</div>
                  <div className="text-[10px] text-slate-500 font-normal">{t.category?.name}</div>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {t.pricingTiers.length} tiers
                </span>
              </button>
            );
          })}
        </div>

        {/* Pricing Editor */}
        <div className="lg:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          {activeTour ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400">
                    Editing Pricing For:
                  </span>
                  <h2 className="font-serif text-xl font-bold text-white mt-0.5">
                    {activeTour.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Pricing Mode: <strong className="text-white">{activeTour.pricingType === 'fixed_group' ? 'Fixed Group Package' : 'Per Person based on group size'}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddTier}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-gold-400" />
                    <span>Add Tier</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSavePricing}
                    disabled={saving}
                    className="px-4 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{saving ? 'Saving...' : 'Save Prices'}</span>
                  </button>
                </div>
              </div>

              {/* Tiers List */}
              <div className="space-y-4">
                {tiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center text-xs"
                  >
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Min Guests
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={tier.minPersons}
                        onChange={(e) => handleTierChange(idx, 'minPersons', parseInt(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Max Guests
                      </label>
                      <input
                        type="number"
                        min={tier.minPersons}
                        value={tier.maxPersons}
                        onChange={(e) => handleTierChange(idx, 'maxPersons', parseInt(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Rate (QAR)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={tier.pricePerPerson}
                        onChange={(e) => handleTierChange(idx, 'pricePerPerson', parseFloat(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-bold text-gold-400"
                      />
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-4 sm:pt-0">
                      <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tier.isTotal}
                          onChange={(e) => handleTierChange(idx, 'isTotal', e.target.checked)}
                          className="rounded text-gold-500 w-4 h-4"
                        />
                        <span className="text-[11px]">Total Package</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleRemoveTier(idx)}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                        title="Delete Tier"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select a tour on the left to inspect and modify pricing tiers.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
