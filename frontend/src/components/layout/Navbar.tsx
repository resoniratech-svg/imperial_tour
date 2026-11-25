import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Globe, ChevronDown, Compass, ShieldCheck,
  Calendar, Phone, MessageSquare, Gem, User
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
    ? 'bg-[#020B1A]/95 backdrop-blur-md border-b border-amber-400/40 shadow-md'
    : 'bg-[#020B1A] backdrop-blur-md border-b border-amber-400/40 shadow-xl';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        {/* Top Luxury Midnight Utility Bar */}
        <div className="hidden lg:block border-b border-amber-500/20 text-xs py-2 px-6 bg-[#030914] text-[#CBD5E1]">
          <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 text-white/90 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F1A825]" />
                Licensed Tourism Operator – Qatar
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1.5 text-white/80 font-semibold">
                <Gem className="w-3.5 h-3.5 text-[#F1A825]" />
                Curated Luxury Qatar Experiences & Safaris
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-white/80 font-semibold text-xs cursor-pointer hover:text-amber-300 transition">
                Currency: QAR (Qatari Riyal)
                <ChevronDown className="w-3 h-3 text-white/60" />
              </span>
              <span className="text-white/20">|</span>
              <button
                onClick={() => dispatch(setLanguage(language === 'en' ? 'ar' : 'en'))}
                className="flex items-center gap-1 text-white/90 hover:text-amber-300 font-bold transition"
              >
                <Globe className="w-3.5 h-3.5 text-[#F1A825]" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
              <span className="text-white/20">|</span>
              <Link to="/admin" className="flex items-center gap-1.5 text-white/90 hover:text-amber-300 font-bold transition">
                <User className="w-3.5 h-3.5 text-white/70" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar with Royal Navy & Golden Light Ribbon Wave Overlay */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#020B1A] via-[#051833] to-[#020D22]">
          {/* Luminous Golden Waves & Royal Blue Satin Ribbon Background */}
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/navbar-bg-royal-gold.png"
              alt=""
              className="w-full h-full object-cover object-right mix-blend-screen opacity-95"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[84px] sm:h-[90px] flex items-center justify-between relative z-10">
            <Logo variant="light" size="sm" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              <Link
                to="/"
                className={`relative py-1 font-semibold transition ${
                  location.pathname === '/'
                    ? 'text-amber-400 font-bold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#F1A825] after:rounded-full'
                    : 'text-white/95 hover:text-amber-300'
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
                <button className="flex items-center gap-1.5 text-white/95 hover:text-amber-300 font-semibold transition py-2">
                  <span>Tours</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toursDropdownOpen ? 'rotate-180 text-amber-300' : ''}`} />
                </button>

                {toursDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 bg-[#020B1A]/95 backdrop-blur-xl border border-amber-400/40 rounded-xl shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 duration-150">
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
                  location.pathname === '/about' ? 'text-amber-400 font-bold' : 'text-white/95'
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className={`transition font-semibold hover:text-amber-300 ${
                  location.pathname === '/contact' ? 'text-amber-400 font-bold' : 'text-white/95'
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Right Action Button: Plan Your Trip with Calendar Icon */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/contact"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#F1A825] hover:bg-[#E59F1C] text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-md transition transform hover:scale-105 active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>PLAN YOUR TRIP</span>
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
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#020B1A]/98 backdrop-blur-xl border-t border-amber-400/40 px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl text-white">
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
