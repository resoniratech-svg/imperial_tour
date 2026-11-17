import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, Compass } from 'lucide-react';
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
  const [guests, setGuests] = useState(initialGuests);
  const [date, setDate] = useState(initialDate);
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onFilterChange) {
      onFilterChange({ category, guests, date, search });
    } else {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (guests) params.append('guests', guests.toString());
      if (date) params.append('date', date);
      if (search) params.append('search', search);

      navigate(`/tours?${params.toString()}`);
    }
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

        {/* Guests */}
        <div className="space-y-1 text-left">
          <label className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-800">
            <Users className="w-3.5 h-3.5 text-yellow-600" />
            <span>Number of Guests</span>
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className={`w-full rounded-lg px-3 py-2.5 text-xs font-semibold outline-none transition ${
              isHero
                ? 'bg-slate-50 text-slate-900 border border-slate-300 focus:border-yellow-500 focus:bg-white shadow-sm'
                : 'bg-slate-50 text-slate-800 border border-slate-300 focus:border-qatar-maroon'
            }`}
          >
            <option value="1">1 Person (Solo Traveler)</option>
            <option value="2">2 Persons (Couple / Pair)</option>
            <option value="3">3 Persons (Small Group)</option>
            <option value="4">4 Persons (Family / Friends)</option>
            <option value="5">5 Persons (Full Group)</option>
            <option value="6">6+ Persons (Large Group)</option>
          </select>
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
