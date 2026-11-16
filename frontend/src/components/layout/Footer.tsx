import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Clock, ShieldCheck, ChevronRight,
  Instagram, Facebook, Twitter, Youtube, Award
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const Footer: React.FC = () => {
  const { settings } = useSelector((state: RootState) => state.settings);
  const { categories } = useSelector((state: RootState) => state.tours);

  const phone = settings.phone || '';
  const email = settings.email || 'info@imperialhospitality.com.qa';
  const address = settings.address || '';
  const whatsapp = settings.whatsapp || '';

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-gold-500/20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-3">
              Imperial Tours Qatar (ITQ) delivers world-class, bespoke tourism experiences across Qatar. From heart-pumping desert dune bashing and traditional dhow cruises to museum heritage tours and coastal marine adventures.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                Premium Qatar DMC
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-qatar-maroon/20 border border-qatar-maroon/40 text-rose-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Insured Fleet
              </span>
            </div>

            {/* Social Media Links (Admin Configurable) */}
            <div className="pt-4 flex items-center gap-3">
              {settings.instagram ? (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-gold-500/20 text-slate-400 hover:text-gold-400 transition border border-slate-800"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              ) : null}

              {settings.facebook ? (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-gold-500/20 text-slate-400 hover:text-gold-400 transition border border-slate-800"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              ) : null}

              {settings.twitter ? (
                <a
                  href={settings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-gold-500/20 text-slate-400 hover:text-gold-400 transition border border-slate-800"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              ) : null}

              {settings.youtube ? (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-gold-500/20 text-slate-400 hover:text-gold-400 transition border border-slate-800"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              ) : null}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-gold-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-gold-500" />
                  All 25 Tours
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-gold-500" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-gold-500" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-gold-500" />
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-gold-400 transition flex items-center gap-1.5 text-slate-400">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tour Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Tour Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/tours/category/${cat.slug}`}
                    className="hover:text-gold-400 transition flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-gold-500" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office (Admin Configurable) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Contact & Inquiries
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              {phone ? (
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                  <a href={`tel:${phone}`} className="hover:text-gold-400 transition">
                    {phone}
                  </a>
                </div>
              ) : null}

              {email ? (
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${email}`} className="hover:text-gold-400 transition">
                    {email}
                  </a>
                </div>
              ) : null}

              {address ? (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
              ) : (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>State of Qatar (Doha)</span>
                </div>
              )}

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Operating 7 Days a Week<br />Pickup from all Doha Hotels</span>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-block text-xs font-bold text-gold-400 hover:text-gold-300 underline underline-offset-4"
                >
                  Send a Direct Message →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} Imperial Tours Qatar (ITQ). All Rights Reserved. All prices in Qatari Riyal (QAR).
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-gold-400 transition">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-gold-400 transition">
              Terms & Conditions
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-gold-500/80">Qatar Tourism Licensed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
