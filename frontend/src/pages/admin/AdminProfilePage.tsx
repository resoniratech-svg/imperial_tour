import React, { useState } from 'react';
import { User, Lock, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { authService } from '../../services/api';

export const AdminProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      setSaving(true);
      await authService.updateProfile({
        name: name || undefined,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update admin profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Administrator Profile</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your account credentials and system display name.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
              Admin Email
            </label>
            <input
              type="text"
              disabled
              value={user?.email || 'admin@imperialtours.qa'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
              Display Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="font-bold text-slate-300 uppercase tracking-wider block">
              Change Password (Leave blank to keep current)
            </span>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Required to set new password"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold uppercase tracking-wider rounded-xl shadow flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Updating...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
