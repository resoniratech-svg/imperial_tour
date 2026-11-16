import React, { useEffect, useState } from 'react';
import { Layers, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { categoryService } from '../../services/api';
import { TourCategory } from '../../types';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<TourCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Partial<TourCategory> | null>(null);
  const [saving, setSaving] = useState(false);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenCreate = () => {
    setEditingCat({ name: '', description: '', image: '', sortOrder: categories.length + 1, isActive: true });
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: TourCategory) => {
    setEditingCat({ ...cat });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      await categoryService.deleteCategory(id);
      loadCategories();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Cannot delete category with associated tours');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCat) return;
    try {
      setSaving(true);
      if (editingCat.id) {
        await categoryService.updateCategory(editingCat.id, editingCat);
      } else {
        await categoryService.createCategory(editingCat);
      }
      setModalOpen(false);
      loadCategories();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Categories Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize tourism experiences across Desert Safaris, Cruises, City Tours, and Water Sports.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="h-40 rounded-xl overflow-hidden bg-slate-900 mb-4">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600'}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-lg font-bold text-white">{cat.name}</h3>
                <span className="text-[10px] font-mono text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded">
                  {cat._count?.tours || 0} tours
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">{cat.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => handleOpenEdit(cat)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-gold-500/20 text-slate-300 hover:text-gold-400 transition"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && editingCat && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingCat.id ? 'Edit Category' : 'Create Category'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCat.name || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={editingCat.image || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingCat.description || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-gold-500 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-gold-500 text-slate-950 font-bold uppercase tracking-wider"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
