import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Clock, Shield, ChevronRight,
  Instagram, Facebook, Twitter, Youtube, Crown, Layers, Link as LinkIcon, MessageSquare
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

  return (
    <footer className="relative bg-gradient-to-b from-[#1C0207] via-[#2A050E] to-[#120104] text-slate-200 overflow-hidden pt-0 pb-8">
      {/* 1. Glowing Doha Skyline Silhouette & Full Laser Horizon Line */}
      <div className="relative w-full overflow-hidden flex justify-center items-center py-1 -mt-2 mb-3">
        <img
          src="/skyline-horizon-full.png"
          alt="Doha Skyline Horizon"
          className="w-full max-w-7xl h-auto object-contain filter drop-shadow-[0_0_16px_rgba(245,166,35,0.8)]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-20">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4 max-w-xs">
            <Logo variant="light" size="sm" />
            <p className="text-xs text-slate-300 leading-relaxed mt-3 font-normal">
              Imperial Tours Qatar (ITQ) delivers world-class, bespoke tourism experiences across Qatar. From heart-pumping desert dune bashing and traditional dhow cruises to museum heritage tours and coastal marine adventures.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/60 text-amber-300 text-[11px] font-semibold shadow-xs">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Premium Qatar DMC
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-pink-500/40 text-emerald-400 text-[11px] font-semibold shadow-xs">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                100% Insured Fleet
              </span>
            </div>

            {/* Social Media Links (Admin Configurable) */}
            <div className="pt-2 flex items-center gap-2.5">
              {settings.instagram ? (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-slate-200 transition border border-white/10 shadow-xs"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              ) : null}

              {settings.facebook ? (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-slate-200 transition border border-white/10 shadow-xs"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              ) : null}

              {settings.twitter ? (
                <a
                  href={settings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-slate-200 transition border border-white/10 shadow-xs"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              ) : null}

              {settings.youtube ? (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-slate-200 transition border border-white/10 shadow-xs"
                  aria-label="YouTube"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              ) : null}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 font-sans text-sm font-bold text-amber-400 tracking-wide">
              <LinkIcon className="w-4 h-4 text-amber-400" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-300 hover:text-amber-300 font-medium transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-slate-300 hover:text-amber-300 font-medium transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  All 25 Tours
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-amber-300 font-medium transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-amber-300 font-medium transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-slate-300 hover:text-amber-300 font-medium transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-white font-medium transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tour Categories */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 font-sans text-sm font-bold text-amber-400 tracking-wide">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Tour Categories</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {(categories || []).slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/tours/category/${cat.slug}`}
                    className="text-slate-300 hover:text-amber-300 font-medium transition flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-400" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Inquiries */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 font-sans text-sm font-bold text-amber-400 tracking-wide">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Contact & Inquiries</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              {email ? (
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${email}`} className="hover:text-amber-300 transition">
                    {email}
                  </a>
                </div>
              ) : null}

              {address ? (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>State of Qatar (Doha)</span>
                </div>
              )}

              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Operating 7 Days a Week<br />Pickup from all Doha Hotels</span>
              </div>

              {phone ? (
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <a href={`tel:${phone}`} className="hover:text-amber-300 transition">
                    {phone}
                  </a>
                </div>
              ) : null}

              {/* Direct Message Action Pill Button */}
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-400/80 bg-black/40 hover:bg-amber-400 hover:text-slate-950 text-amber-300 text-xs font-semibold shadow-md transition transform hover:scale-105 active:scale-95 group"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400 group-hover:text-slate-950 transition-colors" />
                  <span>Send a Direct Message →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Flowing Golden Sand Dunes & Camel Caravan at Bottom */}
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none z-0 overflow-hidden flex items-end">
        <img
          src="/footer-dunes-panoramic-alpha.png"
          alt="Desert Dunes with Camel Caravan"
          className="w-full min-w-[1024px] h-auto object-bottom select-none"
        />
      </div>

      {/* 3. Bottom Copyright Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 pr-0 sm:pr-40 md:pr-56">
          <p>
            © {new Date().getFullYear()} Imperial Tours Qatar (ITQ). All Rights Reserved. All prices in Qatari Riyal (QAR).
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-amber-300 transition">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/terms-conditions" className="hover:text-amber-300 transition">
              Terms & Conditions
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-amber-400 font-bold">Qatar Tourism Licensed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
