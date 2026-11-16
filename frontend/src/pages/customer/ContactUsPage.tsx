import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { contentService } from '../../services/api';

export const ContactUsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { settings } = useSelector((state: RootState) => state.settings);

  const initialSubject = searchParams.get('subject') || '';
  const initialGuests = searchParams.get('guests') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(
    initialSubject ? `${initialSubject} (${initialGuests} Guests)` : ''
  );
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setSubmitting(true);
      await contentService.sendContactMessage({
        name,
        email,
        phone: phone || undefined,
        subject: subject || undefined,
        message,
      });
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const cleanWhatsApp = (settings.whatsapp || '').replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-gold-500/20 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Contact Imperial Tours Qatar
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Have a question about a safari, custom itinerary, or group booking? Our Doha-based concierge team is here to assist you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="bg-slate-950 text-white rounded-3xl p-8 border border-gold-500/30 shadow-2xl space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                Direct Contact
              </span>
              <h2 className="font-serif text-2xl font-bold text-white mt-1">
                Office & Concierge
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Available 7 days a week for reservations, private transfers, and bespoke travel inquiries.
              </p>
            </div>

            <div className="space-y-6 text-xs text-slate-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-0.5">Headquarters</h4>
                  <p>{settings.address || 'State of Qatar, Doha'}</p>
                </div>
              </div>

              {settings.phone ? (
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-0.5">Phone Inquiries</h4>
                    <a href={`tel:${settings.phone}`} className="hover:text-gold-400 transition">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              ) : null}

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-0.5">Email</h4>
                  <a href={`mailto:${settings.email || 'info@imperialhospitality.com.qa'}`} className="hover:text-gold-400 transition">
                    {settings.email || 'info@imperialhospitality.com.qa'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-0.5">Operating Hours</h4>
                  <p>Sunday – Saturday: 08:00 – 22:00 (GMT+3)</p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action */}
            {cleanWhatsApp ? (
              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/${cleanWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            ) : null}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              Send an Online Inquiry
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your details below and an ITQ specialist will contact you promptly.
            </p>

            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Thank you! Your message has been sent. We will respond within a few hours.</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Contact Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+974 5555 1234"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Custom Private Safari"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your requested dates, group size, or questions..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-gold-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 bg-qatar-maroon hover:bg-qatar-maroon-dark text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
