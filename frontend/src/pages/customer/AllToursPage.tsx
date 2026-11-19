import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Compass, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchPublicTours, fetchCategories } from '../../store/slices/tourSlice';
import { TourCard } from '../../components/tours/TourCard';
import { Tour } from '../../types';

export const AllToursPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams<{ categorySlug?: string }>();

  const { tours, categories, loading } = useSelector((state: RootState) => state.tours);

  const initialCat = categorySlug || searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'duration'>('recommended');

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchPublicTours({}));
    dispatch(fetchCategories());
  }, [dispatch]);

  // Update selectedCategory if route changes
  useEffect(() => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    }
  }, [categorySlug]);

  // Filter tours
  const filteredTours = (tours || []).filter((tour: Tour) => {
    // Category match
    if (selectedCategory && tour.category?.slug !== selectedCategory) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = tour.title.toLowerCase().includes(q);
      const matchDesc = tour.shortDesc.toLowerCase().includes(q) || tour.description.toLowerCase().includes(q);
      const matchCat = tour.category?.name.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }
    return true;
  });

  // Sort tours
  const sortedTours = [...filteredTours].sort((a, b) => {
    const priceA = a.pricingTiers[0]?.pricePerPerson || 0;
    const priceB = b.pricingTiers[0]?.pricePerPerson || 0;

    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'duration') return (a.duration || '').localeCompare(b.duration || '');
    return a.sortOrder - b.sortOrder;
  });

  // Category title display
  const currentCategoryObj = categories.find((c) => c.slug === selectedCategory);
  const pageTitle = currentCategoryObj ? currentCategoryObj.name : 'All Qatar Tours & Safaris';
  const pageDesc = currentCategoryObj
    ? currentCategoryObj.description
    : 'Browse all 25 premier tourism packages across Qatar. Dynamic group pricing, licensed guides, and seamless booking.';

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-gold-400 uppercase tracking-widest font-semibold mb-2">
            <Compass className="w-4 h-4" />
            <span>Imperial Tours Qatar Catalogue</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            {pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3 leading-relaxed">
            {pageDesc}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Filters & Search Header */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by tour name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-gold-500 transition"
              />
            </div>

            {/* Sort & Count */}
            <div className="w-full md:w-auto flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-500">
                Showing <strong className="text-slate-900">{sortedTours.length}</strong> of {tours.length} tours
              </span>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-gold-500"
                >
                  <option value="recommended">Featured & Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === ''
                  ? 'bg-slate-900 text-gold-400 shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Packages (25)
            </button>
            {(categories || []).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat.slug
                    ? 'bg-slate-900 text-gold-400 shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tours Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : sortedTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-slate-800 mb-2">No Tours Match Your Search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              Try adjusting your category filter or search keywords to view our available Qatar tour packages.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-qatar-maroon text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
