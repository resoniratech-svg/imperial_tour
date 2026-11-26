import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, ArrowRight, ShieldCheck, Award, HeartHandshake,
  Car, Users, Headphones, Star, CheckCircle2, Sparkles, MapPin,
  ChevronDown, ChevronUp, Video, Anchor, Plane, Play
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchPublicTours, fetchCategories } from '../../store/slices/tourSlice';
import { TourCard } from '../../components/tours/TourCard';
import {
  DesertSafariIcon,
  DhowCruiseIcon,
  CulturalHeritageIcon,
  LuxuryPrivateIcon,
  GroupToursIcon
} from '../../components/common/CategoryIcons';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { featuredTours, tours, categories, loading } = useSelector(
    (state: RootState) => state.tours
  );

  const [showAllTours, setShowAllTours] = useState(false);
  const [heroCycleKey, setHeroCycleKey] = useState(0);

  // Repeating orderly animation cycle for Hero Section
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroCycleKey((prev) => prev + 1);
    }, 8500); // 8.5 seconds per complete orderly cycle
    return () => clearInterval(timer);
  }, []);

  // Coordinated orderly animation variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22, // Strict orderly step-by-step delay
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -14,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const heroBadgeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  useEffect(() => {
    dispatch(fetchPublicTours({}));
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fallback featured tours if none marked
  const displayFeatured = (featuredTours && featuredTours.length > 0)
    ? featuredTours.slice(0, 6)
    : (tours || []).slice(0, 6);

  const visibleTours = showAllTours
    ? (tours && tours.length > 0 ? tours : displayFeatured)
    : displayFeatured;

  // Gallery items - Real authentic Imperial Tours Qatar photography
  const galleryItems = [
    {
      title: 'Majestic Desert Dunes',
      subtitle: 'Inland Sea & Singing Dunes',
      image: '/tours/half-day-desert-safari.jpg',
    },
    {
      title: 'West Bay Doha Skyline',
      subtitle: 'Modern Architecture & Waterfront',
      image: '/tours/city-tour-speedboat.jpg',
    },
    {
      title: 'Traditional Wooden Dhow',
      subtitle: 'Heritage Sailing on Doha Bay',
      image: '/tours/dhow-cruise-tour.jpg',
    },
    {
      title: 'National Museum of Qatar',
      subtitle: 'Desert Rose Architectural Marvel',
      image: '/tours/museum-tour.jpg',
    },
    {
      title: 'Al Thakira Mangroves',
      subtitle: 'Eco-Kayaking Waterways',
      image: '/tours/kayaking-tour.jpg',
    },
    {
      title: 'Arabian Gulf Watersports',
      subtitle: 'Safliya Island & Adrenaline Adventures',
      image: '/tours/water-sports-tour.jpg',
    },
  ];

  // Why choose ITQ with upgraded vibrant emoji designs & themed badges
  const whyChooseUs = [
    {
      emoji: '🧭',
      title: 'Experienced Tour Guides',
      desc: 'Licensed multilingual cultural guides passionate about sharing Qatar’s authentic history and modern wonders.',
      bgGradient: 'from-amber-400/25 via-orange-400/20 to-yellow-300/25',
      borderColor: 'border-amber-300/60',
      shadowColor: 'shadow-amber-500/15',
      badgeBg: 'bg-amber-500/10',
      badgeText: 'text-amber-800',
      badgeBorder: 'border-amber-300/50',
      tag: 'Licensed Guides',
    },
    {
      emoji: '🚙',
      title: 'Professional Drivers',
      desc: 'Expert desert marshals certified in extreme dune navigation and defensive VIP road transport.',
      bgGradient: 'from-sky-400/25 via-blue-400/20 to-indigo-300/25',
      borderColor: 'border-sky-300/60',
      shadowColor: 'shadow-sky-500/15',
      badgeBg: 'bg-sky-500/10',
      badgeText: 'text-sky-800',
      badgeBorder: 'border-sky-300/50',
      tag: 'Desert Marshals',
    },
    {
      emoji: '🚐',
      title: 'Comfortable Transportation',
      desc: 'Pristine fleet of modern air-conditioned 4x4 SUVs and luxury executive touring coaches.',
      bgGradient: 'from-emerald-400/25 via-teal-400/20 to-emerald-300/25',
      borderColor: 'border-emerald-300/60',
      shadowColor: 'shadow-emerald-500/15',
      badgeBg: 'bg-emerald-500/10',
      badgeText: 'text-emerald-800',
      badgeBorder: 'border-emerald-300/50',
      tag: 'Pristine 4x4 Fleet',
    },
    {
      emoji: '🛡️',
      title: 'Safety First',
      desc: 'Comprehensive off-road insurance, top-tier safety gear, roll cages, satellite GPS, and first-aid kits on every tour.',
      bgGradient: 'from-rose-400/25 via-qatar-maroon/20 to-rose-300/25',
      borderColor: 'border-rose-300/60',
      shadowColor: 'shadow-rose-500/15',
      badgeBg: 'bg-rose-500/10',
      badgeText: 'text-rose-900',
      badgeBorder: 'border-rose-300/50',
      tag: '100% Insured Fleet',
    },
    {
      emoji: '✨',
      title: 'Personalized Experiences',
      desc: 'Tailored itineraries for couples, families, VIP delegations, and corporate gatherings.',
      bgGradient: 'from-purple-400/25 via-fuchsia-400/20 to-pink-300/25',
      borderColor: 'border-purple-300/60',
      shadowColor: 'shadow-purple-500/15',
      badgeBg: 'bg-purple-500/10',
      badgeText: 'text-purple-900',
      badgeBorder: 'border-purple-300/50',
      tag: 'Tailor-Made VIP',
    },
    {
      emoji: '🎧',
      title: 'Excellent Customer Support',
      desc: 'Dedicated concierge team available 7 days a week with rapid response via WhatsApp and phone.',
      bgGradient: 'from-yellow-400/30 via-amber-400/25 to-yellow-300/30',
      borderColor: 'border-yellow-400/60',
      shadowColor: 'shadow-yellow-500/20',
      badgeBg: 'bg-yellow-500/15',
      badgeText: 'text-amber-900',
      badgeBorder: 'border-yellow-400/50',
      tag: '7 Days a Week',
    },
  ];

  const sampleTestimonials = [
    {
      name: 'Sarah Mitchell',
      country: 'United Kingdom',
      tour: 'Full Day Desert Safari',
      rating: 5,
      review:
        'An unforgettable journey across the desert! The dune bashing was exhilarating, and the private camp setup with open buffet BBQ was world-class. Our driver Tariq was a true professional. [Sample Review]',
    },
    {
      name: 'Khalid Al-Marri',
      country: 'UAE',
      tour: 'Dhow Cruise With Dinner (BBQ)',
      rating: 5,
      review:
        'Sailing on Doha Bay at dusk while viewing the lit-up West Bay skyline is magical. Freshly grilled BBQ served right on the dhow. Highly recommended for couples and families! [Sample Review]',
    },
    {
      name: 'Elena Rostova',
      country: 'Germany',
      tour: 'Museum & Cultural Tour',
      rating: 5,
      review:
        'The National Museum of Qatar and Museum of Islamic Art were breathtaking. Imperial Tours made everything seamless from hotel pickup to knowledgeable commentary. [Sample Review]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* SECTION 1: HERO BANNER (Layout Inspired by Travel Vibes Reference) */}
      <section className="relative min-h-[96vh] flex flex-col justify-between pt-32 sm:pt-36 pb-14 z-20">
        {/* Background Image - Clean, bright, and vibrant (isolated overflow-hidden so dropdowns are not cut off) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/hero-banner.jpg"
            alt="Discover Qatar with Imperial Tours"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle top shading for navbar readability, zero heavy black tint over the image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/35" />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 min-h-[420px] flex items-center">
          <AnimatePresence mode="wait">
            {/* Left Hero Content: Staggered Orderly Cascade (Eyebrow -> Headline 1 -> Headline 2 -> Description -> Buttons) */}
            <motion.div
              key={heroCycleKey}
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-2xl text-left text-white space-y-6"
            >
              {/* Step 1: Animated Eyebrow Pill */}
              <motion.div
                variants={heroBadgeVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-yellow-400 text-slate-900 text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-xl"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-600 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Imperial Tours Qatar • Premier Destination Management</span>
              </motion.div>

              {/* Step 2 & 3: Headline with Orderly Slide-Up & Shimmering Gold */}
              <motion.h1
                variants={heroItemVariants}
                className="font-sans text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
              >
                <span className="inline-block">Explore Qatar</span>
                <br />
                <span className="inline-block animate-text-shimmer animate-pulse-glow">
                  With Imperial Tours
                </span>
              </motion.h1>

              {/* Step 4: Subtitle Description */}
              <motion.p
                variants={heroItemVariants}
                className="text-base sm:text-lg text-slate-100 max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
              >
                Discover breathtaking desert dunes, luxury dhow cruises, cultural landmarks, and personalized tours across Qatar. Create unforgettable memories with our hand-crafted experiences.
              </motion.p>

              {/* Step 5: Action Buttons (With Exact Icons from Reference Image) */}
              <motion.div
                variants={heroItemVariants}
                className="pt-2 flex flex-wrap items-center gap-4"
              >
                {/* Primary Button: Book Tour Packages with Plane & Arrow Icons */}
                <Link
                  to="/tours"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#F1A825] hover:bg-[#E59F1C] text-slate-950 font-black text-xs sm:text-sm rounded-full shadow-2xl hover:shadow-yellow-400/60 transition transform hover:-translate-y-1 hover:scale-105 active:scale-95 group tracking-wide relative overflow-hidden"
                >
                  {/* Continuous luxury light sheen sweep */}
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] animate-button-sheen pointer-events-none" />
                  <Plane className="w-4 h-4 fill-slate-950 text-slate-950 -rotate-45 relative z-10 flex-shrink-0" />
                  <span className="relative z-10">Book Tour Packages</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 inline-block"
                  >
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.8]" />
                  </motion.span>
                </Link>

                {/* Secondary Button: PLAN YOUR TRIP with Play Icon & Uppercase Typography */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-black/40 hover:bg-black/60 text-white font-bold text-xs uppercase tracking-wider rounded-full border border-white/80 hover:border-yellow-400 shadow-lg transition backdrop-blur-sm hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <Play className="w-3 h-3 fill-white text-white flex-shrink-0" />
                  <span>PLAN YOUR TRIP</span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Curved Golden Wave & 5 Luxury Categories Ribbon (Matching Reference Design) */}
        <div className="relative z-30 w-full mt-auto">
          {/* Sweeping Golden Wave Divider */}
          <div className="w-full overflow-hidden leading-none -mb-[1px]">
            <svg
              viewBox="0 0 1440 50"
              fill="none"
              className="w-full h-8 sm:h-11 md:h-14 block"
              preserveAspectRatio="none"
            >
              {/* Warm Ivory fill below wave */}
              <path
                d="M0,32 Q320,6 720,14 T1440,8 L1440,50 L0,50 Z"
                fill="#FAF6EF"
              />
              {/* Glowing Golden Wave Border Line */}
              <path
                d="M0,32 Q320,6 720,14 T1440,8"
                stroke="#E5A83B"
                strokeWidth="3.5"
                fill="none"
                className="filter drop-shadow-[0_0_8px_rgba(229,168,59,0.5)]"
              />
            </svg>
          </div>

          {/* 5 Luxury Categories Horizontal Ribbon Bar */}
          <div className="bg-[#FAF6EF] border-b border-[#E6D9C8] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E2D5C3]">
                {/* 1. Desert Safari Adventures */}
                <Link
                  to="/tours/category/desert-safari"
                  className="flex items-center gap-3 py-2 px-3 hover:bg-[#F3EBE0]/70 rounded-xl transition group"
                >
                  <DesertSafariIcon className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="leading-tight select-none">
                    <span className="block text-xs sm:text-[13px] font-extrabold text-[#1E293B] group-hover:text-[#7A421D] transition-colors">
                      Desert Safari
                    </span>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-[#1E293B] group-hover:text-[#7A421D] transition-colors">
                      Adventures
                    </span>
                  </div>
                </Link>

                {/* 2. Dhow Cruise Experiences */}
                <Link
                  to="/tours/category/cruise-tours"
                  className="flex items-center gap-3 py-2 px-3 hover:bg-[#F3EBE0]/70 rounded-xl transition group"
                >
                  <DhowCruiseIcon className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="leading-tight select-none">
                    <span className="block text-xs sm:text-[13px] font-extrabold text-[#1E293B] group-hover:text-[#7A421D] transition-colors">
                      Dhow Cruise
                    </span>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-[#1E293B] group-hover:text-[#7A421D] transition-colors">
                      Experiences
                    </span>
                  </div>
                </Link>

                {/* 3. Cultural & Heritage Tours */}
                <Link
                  to="/tours/category/cultural-historical-tours"
                  className="flex items-center gap-3 py-2 px-3 hover:bg-[#F3EBE0]/70 rounded-xl transition group"
                >
                  <CulturalHeritageIcon className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="leading-tight select-none">
                    <span className="block text-xs sm:text-[13px] font-extrabold text-[#1E293B] group-hover:text-[#7A421D] transition-colors">
                      Cultural &
                    </span>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-[#1E293B] group-hover:text-[#7A421D] transition-colors">
                      Heritage Tours
                    </span>
                  </div>
                </Link>

                {/* 4. Luxury & Private Tours */}
                <Link
                  to="/tours"
                  className="flex items-center gap-3 py-2 px-3 hover:bg-[#F3EBE0]/70 rounded-xl transition group"
                >
                  <LuxuryPrivateIcon className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="leading-tight select-none">
                    <span className="block text-xs sm:text-[13px] font-extrabold text-[#1E293B] group-hover:text-[#7A421D] transition-colors">
                      Luxury &
                    </span>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-[#1E293B] group-hover:text-[#7A421D] transition-colors">
                      Private Tours
                    </span>
                  </div>
                </Link>

                {/* 5. Custom Tours for Groups */}
                <Link
                  to="/contact"
                  className="flex items-center gap-3 py-2 px-3 hover:bg-[#F3EBE0]/70 rounded-xl transition group"
                >
                  <GroupToursIcon className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="leading-tight select-none">
                    <span className="block text-xs sm:text-[13px] font-extrabold text-[#1E293B] group-hover:text-[#7A421D] transition-colors">
                      Custom Tours
                    </span>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-[#1E293B] group-hover:text-[#7A421D] transition-colors">
                      for Groups
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED TOURS */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-200/50">
        {/* Khor Al Adaid (Inland Sea) Background - Full clarity & vibrant */}
        <div className="absolute inset-0 z-0">
          <img
            src="/featured-bg.jpg"
            alt="Qatar Inland Sea Khor Al Adaid Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient feather at top and bottom borders only */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/40 via-transparent to-[#FAF9F6]/50 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 bg-white/85 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/90 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon bg-white/95 px-3.5 py-1 rounded-full border border-qatar-maroon/20 shadow-sm inline-block">
                Handcrafted Itineraries
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-3 drop-shadow-sm">
                Featured Tours
              </h2>
              <div className="w-20 h-1 bg-gold-500 mt-3 rounded-full" />
            </div>
            <Link
              to="/tours"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <span>View All 25 Packages</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(visibleTours || []).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}

          {/* View More / Show Less Button */}
          {!loading && (tours || []).length > 6 && (
            <div className="mt-12 text-center">
              {!showAllTours ? (
                <button
                  type="button"
                  onClick={() => setShowAllTours(true)}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-full shadow-lg hover:shadow-yellow-400/50 transition transform hover:-translate-y-0.5"
                >
                  <span>View More</span>
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAllTours(false)}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-yellow-400 font-extrabold text-xs uppercase tracking-wider rounded-full shadow-lg transition transform hover:-translate-y-0.5"
                >
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: POPULAR TOUR CATEGORIES */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-200/50">
        {/* Desert Pattern Wallpaper Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/categories-bg.jpg"
            alt="Qatar Desert Heritage Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle warm overlay to blend seamlessly with hero and surrounding sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FCDAB4]/60 via-transparent to-[#FCDAB4]/70 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon bg-white/70 px-3.5 py-1 rounded-full border border-qatar-maroon/20 shadow-sm inline-block">
              Curated Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-3 drop-shadow-sm">
              Popular Tour Categories
            </h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
            <p className="text-sm text-slate-800 font-medium mt-4 max-w-xl mx-auto">
              Select from our signature travel styles across Qatar’s coastal cities, inland seas, and golden sands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(categories || [])
              .filter((cat) => cat.slug !== 'adventure-activities' && !cat.name.toLowerCase().includes('adventure activities'))
              .map((cat) => (
              <Link
                key={cat.id}
                to={`/tours/category/${cat.slug}`}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-xl border-2 border-white/80 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <img
                  src={cat.image || '/tours/half-day-desert-safari.jpg'}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/50 transition-colors" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400">
                    Category
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold-300 transition mt-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gold-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: CINEMATIC VIDEO SHOWCASE - QATAR IN MOTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF9F6] via-[#F4ECE1] to-[#FAF9F6] border-y border-amber-200/60 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-qatar-maroon/10 border border-qatar-maroon/25 text-qatar-maroon text-xs font-bold tracking-widest uppercase shadow-xs mb-3">
              <Video className="w-3.5 h-3.5 text-qatar-maroon" />
              <span>Cinematic Experience • Qatar In Motion</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Sailing the Turquoise Waters of Doha Bay
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-slate-700 mt-4 leading-relaxed font-normal">
              Experience the timeless harmony of Qatar’s maritime heritage and modern grandeur. Glide peacefully along the Corniche on a traditional handcrafted wooden dhow as the iconic West Bay skyline rises on the horizon.
            </p>
          </div>

          {/* Luxury Video Cinema Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(59,8,20,0.35)] border-2 border-amber-400/40 bg-slate-950 group">
            {/* 4K Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>4K Ultra HD • Traditional Dhow Heritage</span>
            </div>

            {/* Video Element */}
            <video
              src="/14326077_3840_2160_30fps.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full max-h-[640px] aspect-video object-cover rounded-3xl shadow-2xl"
            >
              Your browser does not support the video tag.
            </video>

            {/* Bottom Floating CTA Bar */}
            <div className="p-6 sm:p-8 bg-slate-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-yellow-400">Authentic Qatari Journey</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">Traditional Dhow Cruise & Skyline Tour</h3>
                <p className="text-xs text-slate-300 max-w-lg">Private charters, sunset voyages with open buffet BBQ, and serene coastal sightseeing.</p>
              </div>

              <Link
                to="/tours/dhow-cruise-tour"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xl transition transform hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <span>Book Dhow Cruise</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Three Feature Highlights Under Video */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-amber-300/40 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0 text-amber-700">
                <Anchor className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-slate-900 text-base">Handcrafted Wooden Dhows</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">Centuries of Qatari maritime heritage preserved in authentic, fully restored wooden vessels.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-amber-300/40 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-qatar-maroon/10 border border-qatar-maroon/20 flex items-center justify-center flex-shrink-0 text-qatar-maroon">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-slate-900 text-base">Spectacular Skyline Views</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">Front-row panoramas of the iconic Doha West Bay skyline, Museum of Islamic Art, and Corniche.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-amber-300/40 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-700">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-slate-900 text-base">Sunset & Dinner Cruises</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">Unwind at dusk with freshly prepared BBQ, traditional Arabic hospitality, and gentle sea waves.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE IMPERIAL TOURS QATAR? */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-200/50">
        {/* Full-width Golden Dunes Sunset Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/why-choose-bg.jpg"
            alt="Qatar Golden Desert Dunes Sunset"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle warm desert overlay for seamless contrast while preserving the vibrant dunes */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/60 via-transparent to-[#FFFDF9]/60 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 bg-white/85 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/90 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon bg-white/95 px-3.5 py-1 rounded-full border border-qatar-maroon/20 shadow-sm inline-block">
              The ITQ Distinction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-3 drop-shadow-sm">
              Why Choose Imperial Tours Qatar?
            </h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
            <p className="text-sm text-slate-800 font-medium mt-4 leading-relaxed">
              We hold ourselves to the highest standards of luxury hospitality, vehicle safety, and local cultural authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-white/90 hover:border-yellow-400 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle top accent highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent group-hover:via-yellow-400 transition-all duration-300" />

                <div>
                  {/* Header row with themed emoji design and pill badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} flex items-center justify-center shadow-md ${feature.shadowColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <span className="text-3xl select-none filter drop-shadow-sm">{feature.emoji}</span>
                    </div>
                    <span
                      className={`text-[10.5px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${feature.badgeBg} ${feature.badgeText} border ${feature.badgeBorder}`}
                    >
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-3 group-hover:text-qatar-maroon transition">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: QATAR EXPERIENCES GALLERY */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden text-slate-900 border-y border-slate-200">
        {/* Beach & Skyline Background - Vibrant, clean, and fully visible */}
        <div className="absolute inset-0 z-0">
          <img
            src="/gallery-bg.jpg"
            alt="Qatar Beach and Skyline Heritage Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient feather at the top and bottom borders only */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/40 via-transparent to-[#FAF9F6]/40 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 bg-white/85 backdrop-blur-md px-6 py-5 rounded-3xl border border-white/90 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon bg-white/95 px-3.5 py-1 rounded-full border border-qatar-maroon/20 shadow-sm inline-block">
              Visual Splendor
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2 drop-shadow-sm">
              Qatar Experiences Gallery
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mt-3 rounded-full" />
            <p className="text-sm text-slate-800 font-medium mt-3 max-w-xl mx-auto">
              A glimpse into Qatar’s desert dunes, Doha skyline, traditional dhow boats, museums, beaches, and mangrove wetlands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative h-64 rounded-2xl overflow-hidden border-2 border-white/90 shadow-xl hover:border-yellow-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-300 flex items-center gap-1 drop-shadow">
                    <MapPin className="w-3 h-3 text-yellow-400" />
                    {item.subtitle}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white mt-1 drop-shadow">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CUSTOMER TESTIMONIALS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon">
            Guest Feedback
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            What Our Travelers Say
          </h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
          <p className="text-xs text-slate-500 mt-3 italic">
            * Sample verified reviews shown below for demonstration until live client reviews are published.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleTestimonials.map((review, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed mb-6">
                  "{review.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{review.name}</h4>
                  <p className="text-[11px] text-slate-500">{review.country}</p>
                </div>
                <span className="text-[10px] font-semibold text-gold-600 bg-gold-50 px-2 py-0.5 rounded border border-gold-200">
                  {review.tour}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: CALL TO ACTION */}
      <section className="relative pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#020B1A] via-[#051630] to-[#020B1A] text-white overflow-hidden text-center">
        {/* Ambient Warm Golden Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[680px] h-[340px] bg-amber-500/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
            Unforgettable Memories in the Arabian Gulf
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Your Qatar Adventure Starts Here
          </h2>
          <div className="space-y-1 text-xs sm:text-sm text-slate-300/90 max-w-xl mx-auto leading-relaxed">
            <p>Reserve your desert safari, private dhow dinner, or cultural city tour today.</p>
            <p>Instant online request submission with personalized assistance.</p>
          </div>

          <div className="pt-4 flex flex-row items-center justify-center gap-4">
            <Link
              to="/tours"
              className="px-8 py-3.5 bg-[#F1A825] hover:bg-[#E59F1C] text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-2xl transition transform hover:scale-105 active:scale-95"
            >
              Explore Our Tours
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-black/30 hover:bg-white/10 text-white border border-white/80 font-bold text-xs uppercase tracking-wider rounded-full transition backdrop-blur-sm hover:scale-105 active:scale-95"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
