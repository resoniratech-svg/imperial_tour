import React, { useEffect, useState } from 'react';
import { Settings, Save, CheckCircle2, MessageCircle, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { contentService } from '../../services/api';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({
    site_name: 'Imperial Tours Qatar',
    site_tagline: 'Discover Qatar With Imperial Tours',
    currency: 'QAR',
    currency_symbol: 'QAR',
    phone: '',
    email: 'info@imperialhospitality.com.qa',
    address: '',
    whatsapp: '',
    google_maps_url: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    tiktok: '',
    linkedin: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    contentService.getAllSettings()
      .then((data) => {
        const map: Record<string, string> = {};
        data.forEach((s: any) => { map[s.key] = s.value; });
        setSettings((prev) => ({ ...prev, ...map }));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccess(false);

      const payload = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        group: key.startsWith('face') || key.startsWith('insta') || key.startsWith('twit') || key.startsWith('you') || key.startsWith('tik') || key.startsWith('link')
          ? 'social'
          : key === 'phone' || key === 'email' || key === 'address' || key === 'whatsapp' || key === 'google_maps_url'
          ? 'contact'
          : 'general',
      }));

      await contentService.updateSettings(payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Business Information & Integrations</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure official company coordinates, WhatsApp concierge number, and social profiles.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Business settings successfully saved and updated across the website!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        {/* Contact Coordinates */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-gold-500" />
            Official Contact Coordinates
          </h2>
          <p className="text-slate-400 text-xs">
            These coordinates appear in the header, footer, contact page, and WhatsApp concierge button.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                WhatsApp Inquiry Number (with country code)
              </label>
              <div className="relative">
                <MessageCircle className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="+974 5555 1234"
                  value={settings.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-gold-500"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Powers the floating WhatsApp chat with prefilled tour inquiries.
              </span>
            </div>

            <div>
              <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Business Phone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="+974 4444 1234"
                  value={settings.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Official Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="info@imperialhospitality.com.qa"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Google Maps Location URL
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="https://maps.google.com/?q=..."
                  value={settings.google_maps_url}
                  onChange={(e) => handleChange('google_maps_url', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Physical Office Address in Qatar
              </label>
              <input
                type="text"
                placeholder="Lusail Marina Promenade, Building 14, Doha, State of Qatar"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media Profiles */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-gold-500" />
            Social Media Handles & Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">Instagram URL</label>
              <input
                type="text"
                placeholder="https://instagram.com/imperialtoursqatar"
                value={settings.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">Facebook URL</label>
              <input
                type="text"
                placeholder="https://facebook.com/imperialtoursqatar"
                value={settings.facebook}
                onChange={(e) => handleChange('facebook', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">Twitter / X URL</label>
              <input
                type="text"
                placeholder="https://x.com/imperialtoursqa"
                value={settings.twitter}
                onChange={(e) => handleChange('twitter', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">YouTube Channel URL</label>
              <input
                type="text"
                placeholder="https://youtube.com/@imperialtoursqatar"
                value={settings.youtube}
                onChange={(e) => handleChange('youtube', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings Changes'}</span>
        </button>
      </form>
    </div>
  );
};
