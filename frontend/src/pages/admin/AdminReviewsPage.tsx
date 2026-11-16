import React, { useEffect, useState } from 'react';
import { Star, Check, X, Trash2, Plus, MessageSquare } from 'lucide-react';
import { contentService } from '../../services/api';
import { Testimonial } from '../../types';

export const AdminReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await contentService.getAllTestimonials();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleApproved = async (review: Testimonial) => {
    try {
      await contentService.updateTestimonial(review.id, { isApproved: !review.isApproved });
      loadReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    try {
      await contentService.deleteTestimonial(id);
      loadReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Reviews & Testimonials Management</h1>
        <p className="text-xs text-slate-400 mt-1">
          Approve or curate verified guest reviews appearing on the homepage and tour listings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    r.isApproved ? 'bg-emerald-900/40 text-emerald-300' : 'bg-amber-900/40 text-amber-300'
                  }`}
                >
                  {r.isApproved ? 'Approved' : 'Pending'}
                </span>
              </div>
              <p className="text-xs text-slate-300 italic mb-4">"{r.comment}"</p>
              <div className="text-xs font-bold text-white">{r.name}</div>
              <div className="text-[11px] text-slate-500">{r.country} • {r.tourName}</div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleToggleApproved(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  r.isApproved
                    ? 'bg-amber-600/20 text-amber-300 hover:bg-amber-600/30'
                    : 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30'
                }`}
              >
                {r.isApproved ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                <span>{r.isApproved ? 'Unpublish' : 'Approve'}</span>
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
