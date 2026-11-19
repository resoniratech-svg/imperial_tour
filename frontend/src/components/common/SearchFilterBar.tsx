import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronsUpDown } from 'lucide-react';

interface SearchFilterBarProps {
  initialCategory?: string;
  initialGuests?: number;
  initialDate?: string;
  onFilterChange?: (filters: { category: string; guests: number; date: string; search: string }) => void;
  isHero?: boolean;
}

const TABS = [
  { id: 'tours', label: 'Tours' },
  { id: 'transit', label: 'Transit Tours' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'meet-assist', label: 'Meet & Assist / Lounges' },
];

const AGE_OPTIONS = Array.from({ length: 85 }, (_, i) => `${i + 1} Years`);

const formatDateDisplay = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);
  const d = new Date(year, month, day);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getInitialDates = () => {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() + 7);
  const end = new Date(now);
  end.setDate(now.getDate() + 14);

  const formatISO = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  return {
    start: formatISO(start),
    end: formatISO(end),
  };
};

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  initialGuests = 2,
  initialDate = '',
  onFilterChange,
}) => {
  const navigate = useNavigate();
  const initialDates = getInitialDates();

  const [activeTab, setActiveTab] = useState('tours');
  const [startDate, setStartDate] = useState(initialDate || initialDates.start);
  const [endDate, setEndDate] = useState(initialDates.end);
  const [passengers, setPassengers] = useState(initialGuests || 2);
  const [paxAges, setPaxAges] = useState<string[]>(['18 Years', '18 Years']);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const handlePassengersChange = (newCount: number) => {
    const count = Math.max(1, Math.min(10, newCount));
    setPassengers(count);
    setPaxAges((prev) => {
      const next = [...prev];
      if (count > next.length) {
        while (next.length < count) {
          next.push('18 Years');
        }
      } else {
        next.splice(count);
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onFilterChange) {
      onFilterChange({
        category: activeTab === 'transit' ? 'transit-tours' : '',
        guests: passengers,
        date: startDate,
        search: '',
      });
      return;
    }

    if (activeTab === 'transfer' || activeTab === 'meet-assist') {
      navigate(`/contact?service=${activeTab}&startDate=${startDate}&endDate=${endDate}&passengers=${passengers}`);
      return;
    }

    const params = new URLSearchParams();
    if (activeTab === 'transit') {
      params.append('category', 'transit-tours');
    }
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (passengers) params.append('guests', passengers.toString());
    if (paxAges.length > 0) params.append('paxAges', paxAges.join(','));

    navigate(`/tours?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full text-left">
      {/* Top Tabs */}
      <div className="flex items-end overflow-x-auto no-scrollbar space-x-0.5">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap rounded-t-lg tracking-wide ${
                isActive
                  ? 'bg-white/95 text-[#601934] font-bold shadow-sm'
                  : 'bg-[#601934] hover:bg-[#782042] text-white/95'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Search Filter Panel */}
      <div className="bg-white/90 backdrop-blur-md rounded-b-xl rounded-tr-xl p-4 sm:p-6 shadow-2xl border border-white/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 items-start">
          {/* Start Date */}
          <div className="space-y-1 text-left">
            <label className="text-xs sm:text-[13px] font-semibold text-[#601934] block">
              Start Date
            </label>
            <div
              onClick={() => startDateRef.current?.showPicker?.() || startDateRef.current?.focus()}
              className="relative flex items-center justify-between w-full bg-white text-slate-800 border border-slate-300 rounded px-3 py-2 text-sm shadow-sm cursor-pointer hover:border-[#601934] transition"
            >
              <span className="text-slate-800 font-medium">
                {formatDateDisplay(startDate)}
              </span>
              <Calendar className="w-4 h-4 text-slate-700 shrink-0 pointer-events-none" />
              <input
                ref={startDateRef}
                type="date"
                value={startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setStartDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-1 text-left">
            <label className="text-xs sm:text-[13px] font-semibold text-[#601934] block">
              End Date
            </label>
            <div
              onClick={() => endDateRef.current?.showPicker?.() || endDateRef.current?.focus()}
              className="relative flex items-center justify-between w-full bg-white text-slate-800 border border-slate-300 rounded px-3 py-2 text-sm shadow-sm cursor-pointer hover:border-[#601934] transition"
            >
              <span className="text-slate-800 font-medium">
                {formatDateDisplay(endDate)}
              </span>
              <Calendar className="w-4 h-4 text-slate-700 shrink-0 pointer-events-none" />
              <input
                ref={endDateRef}
                type="date"
                value={endDate}
                min={startDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => setEndDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>
          </div>

          {/* Number of Passengers */}
          <div className="space-y-1 text-left">
            <label className="text-xs sm:text-[13px] font-semibold text-[#601934] block">
              Number of Passengers:
            </label>
            <div className="relative">
              <select
                value={passengers}
                onChange={(e) => handlePassengersChange(Number(e.target.value))}
                className="w-full bg-white text-slate-800 border border-slate-300 rounded px-3 py-2 text-sm font-medium shadow-sm outline-none focus:border-[#601934] focus:ring-1 focus:ring-[#601934] cursor-pointer appearance-none pr-8"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                <ChevronsUpDown className="w-4 h-4 text-slate-600" />
              </div>
            </div>
          </div>

          {/* Dynamic Pax Ages */}
          {paxAges.map((age, idx) => (
            <div key={`pax-age-${idx}`} className="space-y-1 text-left">
              <label className="text-xs sm:text-[13px] font-semibold text-[#601934] block">
                {`Pax ${idx + 1} Age:`}
              </label>
              <div className="relative">
                <select
                  value={age}
                  onChange={(e) => {
                    const newAges = [...paxAges];
                    newAges[idx] = e.target.value;
                    setPaxAges(newAges);
                  }}
                  className="w-full bg-white text-slate-800 border border-slate-300 rounded px-3 py-2 text-sm font-medium shadow-sm outline-none focus:border-[#601934] focus:ring-1 focus:ring-[#601934] cursor-pointer appearance-none pr-8"
                >
                  {AGE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                  <ChevronsUpDown className="w-4 h-4 text-slate-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Action Button Row (aligned under Pax age columns on desktop) */}
        <div className="mt-4 flex justify-end">
          <div className="w-full sm:w-auto lg:w-[38%]">
            <button
              type="submit"
              className="w-full py-2.5 px-8 bg-[#601934] hover:bg-[#782042] text-white font-bold text-sm rounded shadow-md transition transform active:scale-95 text-center tracking-wide"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
