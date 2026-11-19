import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Globe, ChevronDown, Compass, ShieldCheck,
  Calendar, Phone, MessageSquare
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setLanguage } from '../../store/slices/settingsSlice';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toursDropdownOpen, setToursDropdownOpen] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.tours);
  const { language } = useSelector((state: RootState) => state.settings);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setToursDropdownOpen(false);
  }, [location.pathname]);

  const navBg = isHome && !isScrolled
    ? 'bg-gradient-to-r from-[#FFF1B4] via-[#FED0D2] to-[#FFB0F2] backdrop-blur-md border-b border-[#fed0d2]/70 shadow-sm'
    : 'bg-gradient-to-r from-[#FFF1B4] via-[#FED0D2] to-[#FFB0F2] backdrop-blur-md border-b border-[#fed0d2] shadow-md';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        {/* Top utility bar */}
        <div className="hidden lg:block border-b border-slate-900/10 text-xs py-1.5 px-6 text-slate-700 bg-white/30 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-amber-800 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Licensed Tourism Operator – Qatar
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-700 font-medium">Curated Luxury Qatar Experiences & Safaris</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-amber-900 font-semibold bg-white/70 px-2.5 py-0.5 rounded border border-amber-300 shadow-2xs">
                Currency: QAR (Qatari Riyal)
              </span>
              <button
                onClick={() => dispatch(setLanguage(language === 'en' ? 'ar' : 'en'))}
                className="flex items-center gap-1 text-slate-700 hover:text-qatar-maroon font-semibold transition"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
              <Link to="/admin" className="text-slate-600 hover:text-slate-950 font-medium transition">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[88px] sm:h-[96px] flex items-center justify-between">
          <Logo variant="dark" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className={`relative py-1 font-semibold transition ${
                location.pathname === '/'
                  ? 'text-qatar-maroon font-bold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2.5px] after:bg-qatar-maroon after:rounded-full'
                  : 'text-slate-800 hover:text-qatar-maroon'
              }`}
            >
              Home
            </Link>

            {/* Tours Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToursDropdownOpen(true)}
              onMouseLeave={() => setToursDropdownOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-slate-800 hover:text-qatar-maroon font-semibold transition py-2">
                <span>Tours</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toursDropdownOpen ? 'rotate-180 text-qatar-maroon' : ''}`} />
              </button>

              {toursDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white/95 backdrop-blur-md border border-[#fed0d2] rounded-xl shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/tours"
                    className="block p-2.5 rounded-lg bg-gradient-to-r from-[#FFF1B4] to-[#FED0D2] border border-amber-300/60 text-slate-900 font-bold mb-2 hover:opacity-90 transition text-sm"
                  >
                    View All 25 Tours & Packages →
                  </Link>
                  <div className="space-y-1 text-xs">
                    {(categories || []).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/tours/category/${cat.slug}`}
                        className="block px-3 py-2 rounded-md text-slate-700 hover:text-qatar-maroon hover:bg-[#FED0D2]/30 font-medium transition"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`transition font-semibold hover:text-qatar-maroon ${
                location.pathname === '/about' ? 'text-qatar-maroon font-bold' : 'text-slate-800'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`transition font-semibold hover:text-qatar-maroon ${
                location.pathname === '/contact' ? 'text-qatar-maroon font-bold' : 'text-slate-800'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/tours"
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-950 hover:bg-slate-900 text-yellow-400 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg hover:shadow-slate-950/30 transition transform hover:-translate-y-0.5"
            >
              <span>Plan Your Trip</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-900 hover:text-qatar-maroon transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gradient-to-b from-[#FFF1B4] via-[#FED0D2] to-[#FFB0F2] border-t border-[#fed0d2] px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl">
            <Link
              to="/"
              className="block text-base font-semibold text-slate-900 hover:text-qatar-maroon py-1"
            >
              Home
            </Link>

            <div className="border-t border-slate-900/10 pt-3">
              <div className="text-xs uppercase font-bold text-qatar-maroon tracking-wider mb-2">
                Tour Categories
              </div>
              <div className="space-y-2 pl-2">
                <Link
                  to="/tours"
                  className="block text-sm font-bold text-slate-900 hover:text-qatar-maroon"
                >
                  All Tours (25 Packages)
                </Link>
                {(categories || []).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/tours/category/${cat.slug}`}
                    className="block text-sm text-slate-700 hover:text-qatar-maroon font-medium"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-900/10 pt-3 space-y-2">
              <Link
                to="/about"
                className="block text-base font-semibold text-slate-800 hover:text-qatar-maroon"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block text-base font-semibold text-slate-800 hover:text-qatar-maroon"
              >
                Contact Us
              </Link>
              <Link
                to="/faqs"
                className="block text-base font-semibold text-slate-800 hover:text-qatar-maroon"
              >
                FAQs
              </Link>
            </div>

            <div className="border-t border-slate-900/10 pt-4 flex flex-col gap-3">
              <Link
                to="/tours"
                className="w-full text-center py-3 bg-slate-950 text-yellow-400 font-bold uppercase tracking-wider text-xs rounded-lg shadow-md transition"
              >
                Book Your Experience
              </Link>
              <Link
                to="/admin"
                className="text-center text-xs text-slate-600 hover:text-slate-950 font-medium py-1"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
