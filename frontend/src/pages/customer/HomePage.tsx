import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, ArrowRight, ShieldCheck, Award, HeartHandshake,
  Car, Users, Headphones, Star, CheckCircle2, Sparkles, MapPin
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchPublicTours, fetchCategories } from '../../store/slices/tourSlice';
import { SearchFilterBar } from '../../components/common/SearchFilterBar';
import { TourCard } from '../../components/tours/TourCard';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { featuredTours, tours, categories, loading } = useSelector(
    (state: RootState) => state.tours
  );

  useEffect(() => {
    dispatch(fetchPublicTours({}));
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fallback featured tours if none marked
  const displayFeatured = featuredTours.length > 0 ? featuredTours.slice(0, 6) : tours.slice(0, 6);

  // Gallery items
  const galleryItems = [
    {
      title: 'Majestic Desert Dunes',
      subtitle: 'Inland Sea & Singing Dunes',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800',
    },
    {
      title: 'West Bay Doha Skyline',
      subtitle: 'Modern Architecture & Waterfront',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    },
    {
      title: 'Traditional Wooden Dhow',
      subtitle: 'Heritage Sailing on Doha Bay',
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800',
    },
    {
      title: 'National Museum of Qatar',
      subtitle: 'Desert Rose Architectural Marvel',
      image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800',
    },
    {
      title: 'Al Thakira Mangroves',
      subtitle: 'Eco-Kayaking Waterways',
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800',
    },
    {
      title: 'Arabian Gulf Watersports',
      subtitle: 'Safliya Island & Adrenaline Adventures',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    },
  ];

  // Why choose ITQ
  const whyChooseUs = [
    {
      icon: <Users className="w-8 h-8 text-gold-500" />,
      title: 'Experienced Tour Guides',
      desc: 'Licensed multilingual cultural guides passionate about sharing Qatar’s authentic history and modern wonders.',
    },
    {
      icon: <Car className="w-8 h-8 text-gold-500" />,
      title: 'Professional Drivers',
      desc: 'Expert desert marshals certified in extreme dune navigation and defensive VIP road transport.',
    },
    {
      icon: <Award className="w-8 h-8 text-gold-500" />,
      title: 'Comfortable Transportation',
      desc: 'Pristine fleet of modern air-conditioned 4x4 SUVs and luxury executive touring coaches.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-gold-500" />,
      title: 'Safety First',
      desc: 'Comprehensive off-road insurance, top-tier safety gear, roll cages, satellite GPS, and first-aid kits on every tour.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-gold-500" />,
      title: 'Personalized Experiences',
      desc: 'Tailored itineraries for couples, families, VIP delegations, and corporate gatherings.',
    },
    {
      icon: <Headphones className="w-8 h-8 text-gold-500" />,
      title: 'Excellent Customer Support',
      desc: 'Dedicated concierge team available 7 days a week with rapid response via WhatsApp and phone.',
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
      {/* SECTION 1: HERO BANNER */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with luxury dark gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&q=85"
            alt="Qatar Desert Golden Dunes"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Imperial Tours Qatar • Premier Destination Management</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-6">
            DISCOVER QATAR WITH <br />
            <span className="gold-text-gradient">IMPERIAL TOURS</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed mb-8">
            Explore the beauty of Qatar with unforgettable desert adventures, luxury cruises, cultural experiences, and personalized tours.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/tours"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl shadow-2xl hover:shadow-gold-glow transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Tours</span>
            </Link>

            <Link
              to="/tours"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-widest rounded-xl backdrop-blur-md transition flex items-center justify-center gap-2"
            >
              <span>Book Your Experience</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </div>

          {/* Tour Search Interface */}
          <div className="max-w-4xl mx-auto">
            <SearchFilterBar isHero={true} />
          </div>
        </div>
      </section>

      {/* SECTION 2: POPULAR TOUR CATEGORIES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon">
            Curated Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            Popular Tour Categories
          </h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-600 mt-4">
            Select from our 6 signature travel styles across Qatar’s coastal cities, inland seas, and golden sands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/tours/category/${cat.slug}`}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800'}
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
      </section>

      {/* SECTION 3: FEATURED TOURS */}
      <section className="py-20 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon">
                Handcrafted Itineraries
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
                Featured Tours & Adventures
              </h2>
              <div className="w-20 h-1 bg-gold-500 mt-3 rounded-full" />
            </div>
            <Link
              to="/tours"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-qatar-maroon hover:text-gold-600 transition"
            >
              <span>View All 25 Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayFeatured.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE IMPERIAL TOURS QATAR? */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon">
            The ITQ Distinction
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            Why Choose Imperial Tours Qatar?
          </h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-600 mt-4 leading-relaxed">
            We hold ourselves to the highest standards of luxury hospitality, vehicle safety, and local cultural authenticity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-gold-500/40 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-3 group-hover:text-qatar-maroon transition">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: QATAR EXPERIENCES GALLERY */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Visual Splendor
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
              Qatar Experiences Gallery
            </h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
            <p className="text-sm text-slate-400 mt-4">
              A glimpse into Qatar’s desert dunes, Doha skyline, traditional dhow boats, museums, beaches, and mangrove wetlands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative h-64 rounded-2xl overflow-hidden border border-gold-500/20"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.subtitle}
                  </span>
                  <h4 className="font-serif text-base font-bold text-white mt-0.5">
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
