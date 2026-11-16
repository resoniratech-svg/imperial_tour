import React, { useEffect, useState } from 'react';
import {
  Compass, PlusCircle, Edit, Trash2, CheckCircle2, XCircle,
  Search, SlidersHorizontal, AlertCircle, Save, X
} from 'lucide-react';
import { tourService, categoryService } from '../../services/api';
import { Tour, TourCategory } from '../../types';
import { formatCurrency } from '../../utils/pricing';

export const AdminToursPage: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [categories, setCategories] = useState<TourCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');

  // Edit / Create modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Partial<Tour> | null>(null);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [toursData, catsData] = await Promise.all([
        tourService.getAllTours(),
        categoryService.getAllCategories(),
      ]);
      setTours(toursData);
      setCategories(catsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      await tourService.toggleTourStatus(id);
      loadData();
    } catch (err) {
      console.error(err);
      alert('Failed to toggle status');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await tourService.deleteTour(id);
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete tour');
    }
  };

  const handleOpenEdit = (tour: Tour) => {
    setEditingTour({ ...tour });
    setModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingTour({
      title: '',
      shortDesc: '',
      description: '',
      duration: '',
      availability: '',
      categoryId: categories[0]?.id || '',
      coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800',
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      isActive: true,
      pricingTiers: [
        { id: '', tourId: '', minPersons: 1, maxPersons: 1, pricePerPerson: 700, isTotal: false },
        { id: '', tourId: '', minPersons: 2, maxPersons: 2, pricePerPerson: 400, isTotal: false },
      ],
      inclusions: [],
      exclusions: [],
    });
    setModalOpen(true);
  };

  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTour) return;

    try {
      setSaving(true);
      if (editingTour.id) {
        await tourService.updateTour(editingTour.id, editingTour);
      } else {
        await tourService.createTour(editingTour);
      }
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save tour');
    } finally {
      setSaving(false);
    }
  };

  // Filter
  const filtered = tours.filter((t) => {
    if (selectedCat && t.categoryId !== selectedCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Tour Packages Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete inventory of all 25 tours across Qatar. Configure prices, inclusions, and active status.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Tour</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tours..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-gold-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none focus:border-gold-500"
          >
            <option value="">All Categories ({tours.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">
            Showing {filtered.length} tours
          </span>
        </div>
      </div>

      {/* Tours Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">Tour Title & Image</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Pricing Type</th>
                <th className="py-3.5 px-4">Base Starting Rate</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filtered.map((t, idx) => {
                const baseTier = t.pricingTiers[0];
                return (
                  <tr key={t.id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3.5 px-4 text-slate-500">{t.sortOrder || idx + 1}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.coverImage || 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=200'}
                          alt={t.title}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="max-w-xs">
                          <div className="font-bold text-white truncate">{t.title}</div>
                          <div className="text-[11px] text-slate-400 truncate">{t.shortDesc}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-gold-400">
                        {t.category?.name || 'Unassigned'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {t.duration || 'Flexible'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${t.pricingType === 'fixed_group' ? 'bg-purple-900/40 text-purple-300' : 'bg-emerald-900/40 text-emerald-300'}`}>
                        {t.pricingType === 'fixed_group' ? 'Fixed Group' : 'Per Person'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {baseTier ? formatCurrency(baseTier.pricePerPerson) : 'Not configured'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(t.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${
                          t.isActive
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}
                        title="Click to toggle active status"
                      >
                        {t.isActive ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(t)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-gold-500/20 text-slate-300 hover:text-gold-400 transition"
                          title="Edit Tour"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id, t.title)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition"
                          title="Delete Tour"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && editingTour && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="font-serif text-xl font-bold text-white">
                {editingTour.id ? `Edit Tour: ${editingTour.title}` : 'Add New Tour'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTour} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Tour Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTour.title || ''}
                    onChange={(e) => setEditingTour({ ...editingTour, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Category *
                  </label>
                  <select
                    value={editingTour.categoryId || ''}
                    onChange={(e) => setEditingTour({ ...editingTour, categoryId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Duration (e.g. 4 hours, 20:00–00:00)
                  </label>
                  <input
                    type="text"
                    value={editingTour.duration || ''}
                    onChange={(e) => setEditingTour({ ...editingTour, duration: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Availability (e.g. Every Saturday and Monday)
                  </label>
                  <input
                    type="text"
                    value={editingTour.availability || ''}
                    onChange={(e) => setEditingTour({ ...editingTour, availability: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Pricing Type
                  </label>
                  <select
                    value={editingTour.pricingType || 'per_person'}
                    onChange={(e) => setEditingTour({ ...editingTour, pricingType: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                  >
                    <option value="per_person">Per Person (Based on Group Size)</option>
                    <option value="fixed_group">Fixed Group Rate (Total for Group)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={editingTour.coverImage || ''}
                    onChange={(e) => setEditingTour({ ...editingTour, coverImage: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Short Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingTour.shortDesc || ''}
                    onChange={(e) => setEditingTour({ ...editingTour, shortDesc: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-gold-500 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Full Tour Description *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={editingTour.description || ''}
                    onChange={(e) => setEditingTour({ ...editingTour, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-gold-500 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save Tour Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
