import React, { useEffect, useState } from 'react';
import { Image, Plus, Trash2, Save, X } from 'lucide-react';
import { contentService } from '../../services/api';

export const AdminGalleryPage: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({ url: '', title: '', description: '', category: 'Desert' });
  const [saving, setSaving] = useState(false);

  const loadGallery = async () => {
    try {
      const data = await contentService.getAllGallery();
      setImages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await contentService.createGalleryImage(newImage);
      setModalOpen(false);
      setNewImage({ url: '', title: '', description: '', category: 'Desert' });
      loadGallery();
    } catch (err) {
      alert('Failed to add gallery photo');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    try {
      await contentService.deleteGalleryImage(id);
      loadGallery();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Visual Gallery Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Curate luxury Qatar tourism photography for the homepage and showcase sections.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-square shadow-lg">
            <img src={img.url} alt={img.title || 'Qatar Experience'} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <span className="text-[10px] text-gold-400 font-bold uppercase">{img.category}</span>
              <p className="text-xs font-bold text-white">{img.title}</p>
              <button
                onClick={() => handleDelete(img.id)}
                className="mt-2 text-rose-400 hover:text-rose-300 text-[11px] flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">Add Photo to Gallery</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newImage.url}
                  onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">Title / Caption</label>
                <input
                  type="text"
                  placeholder="e.g. Sunset Dune Bashing"
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">Category</label>
                <select
                  value={newImage.category}
                  onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                >
                  <option value="Desert">Desert Safari</option>
                  <option value="Dhow">Dhow Cruise</option>
                  <option value="City">Doha City</option>
                  <option value="Culture">Culture & Museums</option>
                  <option value="Water">Water Sports</option>
                </select>
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
                  {saving ? 'Adding...' : 'Add Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
