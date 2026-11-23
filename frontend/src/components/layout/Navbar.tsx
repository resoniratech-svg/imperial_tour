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
    ? 'bg-[#3B0814]/90 backdrop-blur-md border-b border-amber-400/30 shadow-sm'
    : 'bg-[#3B0814] backdrop-blur-md border-b border-amber-400/30 shadow-xl';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        {/* Top utility bar */}
        <div className="hidden lg:block border-b border-white/10 text-xs py-1.5 px-6 text-slate-300 bg-black/25 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Licensed Tourism Operator – Qatar
              </span>
              <span className="text-white/30">|</span>
              <span className="text-slate-200 font-medium">Curated Luxury Qatar Experiences & Safaris</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-amber-300 font-semibold bg-white/10 px-2.5 py-0.5 rounded border border-amber-400/30 shadow-2xs">
                Currency: QAR (Qatari Riyal)
              </span>
              <button
                onClick={() => dispatch(setLanguage(language === 'en' ? 'ar' : 'en'))}
                className="flex items-center gap-1 text-slate-200 hover:text-amber-300 font-semibold transition"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
              <Link to="/admin" className="text-slate-300 hover:text-white font-medium transition">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[88px] sm:h-[96px] flex items-center justify-between">
          <Logo variant="light" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className={`relative py-1 font-semibold transition ${
                location.pathname === '/'
                  ? 'text-amber-300 font-bold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2.5px] after:bg-amber-400 after:rounded-full'
                  : 'text-white/90 hover:text-amber-300'
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
              <button className="flex items-center gap-1.5 text-white/90 hover:text-amber-300 font-semibold transition py-2">
                <span>Tours</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toursDropdownOpen ? 'rotate-180 text-amber-300' : ''}`} />
              </button>

              {toursDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-[#2D060F] backdrop-blur-md border border-amber-400/30 rounded-xl shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/tours"
                    className="block p-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold mb-2 hover:opacity-95 transition text-sm shadow-md"
                  >
                    View All 25 Tours & Packages →
                  </Link>
                  <div className="space-y-1 text-xs">
                    {(categories || []).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/tours/category/${cat.slug}`}
                        className="block px-3 py-2 rounded-md text-slate-200 hover:text-amber-300 hover:bg-white/10 font-medium transition"
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
              className={`transition font-semibold hover:text-amber-300 ${
                location.pathname === '/about' ? 'text-amber-300 font-bold' : 'text-white/90'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`transition font-semibold hover:text-amber-300 ${
                location.pathname === '/contact' ? 'text-amber-300 font-bold' : 'text-white/90'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/tours"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg hover:shadow-amber-400/30 transition transform hover:-translate-y-0.5"
            >
              <span>Plan Your Trip</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-amber-300 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#2D060F] border-t border-amber-400/30 px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl text-white">
            <Link
              to="/"
              className="block text-base font-semibold text-white hover:text-amber-300 py-1"
            >
              Home
            </Link>

            <div className="border-t border-white/10 pt-3">
              <div className="text-xs uppercase font-bold text-amber-300 tracking-wider mb-2">
                Tour Categories
              </div>
              <div className="space-y-2 pl-2">
                <Link
                  to="/tours"
                  className="block text-sm font-bold text-amber-400 hover:text-amber-200"
                >
                  All Tours (25 Packages)
                </Link>
                {(categories || []).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/tours/category/${cat.slug}`}
                    className="block text-sm text-slate-200 hover:text-amber-300 font-medium"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 space-y-2">
              <Link
                to="/about"
                className="block text-base font-semibold text-slate-200 hover:text-amber-300"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block text-base font-semibold text-slate-200 hover:text-amber-300"
              >
                Contact Us
              </Link>
              <Link
                to="/faqs"
                className="block text-base font-semibold text-slate-200 hover:text-amber-300"
              >
                FAQs
              </Link>
            </div>

            <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
              <Link
                to="/tours"
                className="w-full text-center py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg shadow-md transition"
              >
                Book Your Experience
              </Link>
              <Link
                to="/admin"
                className="text-center text-xs text-slate-300 hover:text-white font-medium py-1"
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
