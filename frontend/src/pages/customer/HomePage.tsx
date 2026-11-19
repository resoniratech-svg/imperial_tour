import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, ArrowRight, ShieldCheck, Award, HeartHandshake,
  Car, Users, Headphones, Star, CheckCircle2, Sparkles, MapPin,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchPublicTours, fetchCategories } from '../../store/slices/tourSlice';
import { TourCard } from '../../components/tours/TourCard';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { featuredTours, tours, categories, loading } = useSelector(
    (state: RootState) => state.tours
  );

  const [showAllTours, setShowAllTours] = useState(false);

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
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
          {/* Left Hero Content: Headline, Subtitle & Action Buttons */}
          <div className="max-w-2xl text-left text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-yellow-400 text-slate-900 text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
              <span>Imperial Tours Qatar • Premier Destination Management</span>
            </div>

            <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Explore Qatar <br />
              <span className="text-yellow-400 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
                With Imperial Tours
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Discover breathtaking desert dunes, luxury dhow cruises, cultural landmarks, and personalized tours across Qatar. Create unforgettable memories with our hand-crafted experiences.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/tours"
                className="inline-flex items-center gap-3 px-9 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm sm:text-base rounded-full shadow-2xl hover:shadow-yellow-400/50 transition transform hover:-translate-y-0.5 group tracking-wide"
              >
                <span>Book Tour Packages</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-black/40 hover:bg-black/60 text-white font-bold text-xs uppercase tracking-wider rounded-full border border-white/70 shadow-lg transition backdrop-blur-sm hover:-translate-y-0.5"
              >
                <span>Plan Your Trip</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Smooth Curved Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            className="relative block w-full h-8 sm:h-12 text-[#FAF9F6]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C200,80 400,-20 600,45 C800,110 1000,15 1200,40 L1200,120 L0,120 Z"></path>
          </svg>
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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-950 via-qatar-maroon-dark to-slate-950 text-white overflow-hidden text-center border-t border-gold-500/30">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-gold-400">
            Unforgettable Memories in the Arabian Gulf
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Your Qatar Adventure Starts Here
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Reserve your desert safari, private dhow dinner, or cultural city tour today. Instant online request submission with personalized assistance.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/tours"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl shadow-xl transition transform hover:scale-105"
            >
              Explore Our Tours
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded-xl transition"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
