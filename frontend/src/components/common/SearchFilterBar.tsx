import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, Compass, ChevronDown, Plus, Minus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface SearchFilterBarProps {
  initialCategory?: string;
  initialGuests?: number;
  initialDate?: string;
  onFilterChange?: (filters: { category: string; guests: number; date: string; search: string }) => void;
  isHero?: boolean;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  initialCategory = '',
  initialGuests = 2,
  initialDate = '',
  onFilterChange,
  isHero = false,
}) => {
  const navigate = useNavigate();
  const { categories } = useSelector((state: RootState) => state.tours);

  const [category, setCategory] = useState(initialCategory);
  const [adults, setAdults] = useState(initialGuests || 2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [guestsPickerOpen, setGuestsPickerOpen] = useState(false);
  const guestPickerRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState(initialDate);
  const [search, setSearch] = useState('');

  // Total count for tour query
  const totalGuests = Math.max(1, adults + children);

  // Close popup on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestPickerRef.current && !guestPickerRef.current.contains(event.target as Node)) {
        setGuestsPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGuestsPickerOpen(false);

    if (onFilterChange) {
      onFilterChange({ category, guests: totalGuests, date, search });
    } else {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (totalGuests) params.append('guests', totalGuests.toString());
      if (adults) params.append('adults', adults.toString());
      if (children) params.append('children', children.toString());
      if (infants) params.append('infants', infants.toString());
      if (date) params.append('date', date);
      if (search) params.append('search', search);

      navigate(`/tours?${params.toString()}`);
    }
  };

  // Format guest summary display
  const getGuestSummary = () => {
    const parts: string[] = [];
    parts.push(`${adults} ${adults === 1 ? 'Adult' : 'Adults'}`);
    if (children > 0) parts.push(`${children} ${children === 1 ? 'Child' : 'Children'}`);
    if (infants > 0) parts.push(`${infants} ${infants === 1 ? 'Infant' : 'Infants'}`);
    return parts.join(', ');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full rounded-2xl transition-all ${
        isHero
          ? 'bg-white/95 backdrop-blur-md p-4 sm:p-5 border-2 border-yellow-400 shadow-2xl ring-4 ring-black/10'
          : 'bg-white p-4 border border-slate-200 shadow-md'
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {/* Category */}
        <div className="space-y-1 text-left">
          <label className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-800">
            <Compass className="w-3.5 h-3.5 text-yellow-600" />
            <span>Tour Category</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full rounded-lg px-3 py-2.5 text-xs font-semibold outline-none transition ${
              isHero
                ? 'bg-slate-50 text-slate-900 border border-slate-300 focus:border-yellow-500 focus:bg-white shadow-sm'
                : 'bg-slate-50 text-slate-800 border border-slate-300 focus:border-qatar-maroon'
            }`}
          >
            <option value="">All Categories (25 Tours)</option>
            {(categories || []).map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Travel Date */}
        <div className="space-y-1 text-left">
          <label className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-800">
            <Calendar className="w-3.5 h-3.5 text-yellow-600" />
            <span>Travel Date</span>
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full rounded-lg px-3 py-2.5 text-xs font-semibold outline-none transition ${
              isHero
                ? 'bg-slate-50 text-slate-900 border border-slate-300 focus:border-yellow-500 focus:bg-white shadow-sm'
                : 'bg-slate-50 text-slate-800 border border-slate-300 focus:border-qatar-maroon'
            }`}
          />
        </div>

        {/* Guests with Interactive Counter Popover matching Image 2 */}
        <div className={`space-y-1 text-left relative ${guestsPickerOpen ? 'z-50' : ''}`} ref={guestPickerRef}>
          <label className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-800">
            <Users className="w-3.5 h-3.5 text-yellow-600" />
            <span>Number of Guests</span>
          </label>

          <button
            type="button"
            onClick={() => setGuestsPickerOpen(!guestsPickerOpen)}
            className={`w-full rounded-lg px-3 py-2.5 text-xs font-semibold outline-none transition flex items-center justify-between text-left ${
              isHero
                ? 'bg-slate-50 text-slate-900 border border-slate-300 focus:border-yellow-500 focus:bg-white shadow-sm'
                : 'bg-slate-50 text-slate-800 border border-slate-300 focus:border-qatar-maroon'
            }`}
          >
            <span className="truncate">{getGuestSummary()}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                guestsPickerOpen ? 'rotate-180 text-yellow-600' : ''
              }`}
            />
          </button>

          {/* Interactive Guest Picker Popover matching Image 2 */}
          {guestsPickerOpen && (
            <div className="absolute top-full left-0 sm:left-auto sm:right-0 md:left-0 md:right-auto w-full sm:w-80 mt-2 bg-white rounded-2xl border border-slate-200/90 shadow-2xl ring-1 ring-black/10 p-4 z-[100] animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Row 1: Adults */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-slate-900">Adults</div>
                  <div className="text-xs text-slate-500">Age 12+</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                    disabled={adults <= 1}
                    className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-slate-900">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults((prev) => Math.min(15, prev + 1))}
                    disabled={adults >= 15}
                    className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="border-b border-slate-100 my-1" />

              {/* Row 2: Children */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-slate-900">Children</div>
                  <div className="text-xs text-slate-500">Age 3–11</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                    disabled={children <= 0}
                    className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-slate-900">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren((prev) => Math.min(10, prev + 1))}
                    disabled={children >= 10}
                    className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="border-b border-slate-100 my-1" />

              {/* Row 3: Infants */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-slate-900">Infants</div>
                  <div className="text-xs text-slate-500">Under 3 · free</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
                    disabled={infants <= 0}
                    className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-slate-900">{infants}</span>
                  <button
                    type="button"
                    onClick={() => setInfants((prev) => Math.min(6, prev + 1))}
                    disabled={infants >= 6}
                    className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Done Action */}
              <div className="pt-3 mt-1 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'} total
                </span>
                <button
                  type="button"
                  onClick={() => setGuestsPickerOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 lg:col-span-1 flex items-end">
          <button
            type="submit"
            className="w-full h-10 px-6 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg hover:shadow-yellow-400/50 flex items-center justify-center gap-2 transition transform active:scale-95"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Find Experience</span>
          </button>
        </div>
      </div>
    </form>
  );
};
