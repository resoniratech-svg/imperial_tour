import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Search, Globe, ChevronDown, Compass, ShieldCheck,
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
  const [thingsToDoOpen, setThingsToDoOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    setThingsToDoOpen(false);
  }, [location.pathname]);

  const navBg = isHome && !isScrolled
    ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
    : 'bg-slate-900/95 backdrop-blur-md border-b border-gold-500/20 shadow-lg';

  const thingsToDoItems = [
    { name: 'Desert Dune Bashing', slug: 'desert-safari', desc: '4x4 thrill in the singing dunes' },
    { name: 'Traditional Dhow Cruises', slug: 'cruise-tours', desc: 'Sunset & BBQ sailing on Doha bay' },
    { name: 'Mangrove Kayaking', slug: 'water-sports-adventure', desc: 'Paddle through Al Thakira mangroves' },
    { name: 'Museums & Heritage', slug: 'cultural-historical-tours', desc: 'NMOQ, MIA & historic forts' },
    { name: 'Doha City Landmarks', slug: 'city-tours', desc: 'Katara, The Pearl, Lusail & Souq' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        {/* Top utility bar */}
        <div className="hidden lg:block border-b border-white/10 text-xs py-1.5 px-6 text-slate-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-gold-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Licensed Tourism Operator – Qatar
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300">Curated Luxury Qatar Experiences & Safaris</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gold-400 font-semibold bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/30">
                Currency: QAR (Qatari Riyal)
              </span>
              <button
                onClick={() => dispatch(setLanguage(language === 'en' ? 'ar' : 'en'))}
                className="flex items-center gap-1 text-slate-300 hover:text-gold-400 transition"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
              <Link to="/admin" className="text-slate-400 hover:text-white transition">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo variant="light" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className={`transition hover:text-gold-400 ${
                location.pathname === '/' ? 'text-gold-400 font-semibold' : 'text-slate-100'
              }`}
            >
              Home
            </Link>

            {/* Things To Do Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setThingsToDoOpen(true)}
              onMouseLeave={() => setThingsToDoOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-slate-100 hover:text-gold-400 transition py-2">
                <span>Things To Do</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${thingsToDoOpen ? 'rotate-180 text-gold-400' : ''}`} />
              </button>

              {thingsToDoOpen && (
                <div className="absolute top-full left-0 w-80 bg-slate-900 border border-gold-500/30 rounded-xl shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="space-y-1">
                    {thingsToDoItems.map((item) => (
                      <Link
                        key={item.name}
                        to={`/tours/category/${item.slug}`}
                        className="block p-2.5 rounded-lg hover:bg-gold-500/10 group transition"
                      >
                        <div className="text-slate-200 font-medium group-hover:text-gold-400 transition">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-400">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tours Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToursDropdownOpen(true)}
              onMouseLeave={() => setToursDropdownOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-slate-100 hover:text-gold-400 transition py-2">
                <span>Tours</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toursDropdownOpen ? 'rotate-180 text-gold-400' : ''}`} />
              </button>

              {toursDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-slate-900 border border-gold-500/30 rounded-xl shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/tours"
                    className="block p-2.5 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400 font-semibold mb-2 hover:bg-gold-500/20 transition"
                  >
                    View All 25 Tours & Packages →
                  </Link>
                  <div className="space-y-1 text-xs">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/tours/category/${cat.slug}`}
                        className="block px-3 py-2 rounded-md text-slate-300 hover:text-gold-400 hover:bg-white/5 transition"
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
              className={`transition hover:text-gold-400 ${
                location.pathname === '/about' ? 'text-gold-400 font-semibold' : 'text-slate-100'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`transition hover:text-gold-400 ${
                location.pathname === '/contact' ? 'text-gold-400 font-semibold' : 'text-slate-100'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2.5 text-slate-300 hover:text-gold-400 hover:bg-white/5 rounded-full transition"
              title="Search Tours"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/tours"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-gold-glow transition transform hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Tours</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-slate-300 hover:text-gold-400"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-gold-400 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-gold-500/20 px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <Link
              to="/"
              className="block text-base font-medium text-slate-200 hover:text-gold-400 py-1"
            >
              Home
            </Link>

            <div className="border-t border-white/10 pt-3">
              <div className="text-xs uppercase font-bold text-gold-400 tracking-wider mb-2">
                Tour Categories
              </div>
              <div className="space-y-2 pl-2">
                <Link
                  to="/tours"
                  className="block text-sm font-semibold text-white hover:text-gold-400"
                >
                  All Tours (25 Packages)
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/tours/category/${cat.slug}`}
                    className="block text-sm text-slate-300 hover:text-gold-400"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 space-y-2">
              <Link
                to="/about"
                className="block text-base font-medium text-slate-200 hover:text-gold-400"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block text-base font-medium text-slate-200 hover:text-gold-400"
              >
                Contact Us
              </Link>
              <Link
                to="/faqs"
                className="block text-base font-medium text-slate-200 hover:text-gold-400"
              >
                FAQs
              </Link>
            </div>

            <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
              <Link
                to="/tours"
                className="w-full text-center py-3 bg-gold-500 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg"
              >
                Book Your Experience
              </Link>
              <Link
                to="/admin"
                className="text-center text-xs text-slate-400 hover:text-gold-400 py-1"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-slate-900 border border-gold-500/30 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-xl font-bold text-white mb-2">Search Qatar Tours</h3>
            <p className="text-xs text-slate-400 mb-4">Find desert safaris, dhow cruises, city tours & water sports</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchModalOpen(false);
                window.location.href = `/tours?search=${encodeURIComponent(searchQuery)}`;
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="E.g. Desert Safari, Kayaking, Dhow Cruise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-slate-800 border border-slate-700 focus:border-gold-500 rounded-lg px-4 py-3 text-white text-sm outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-sm rounded-lg"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
