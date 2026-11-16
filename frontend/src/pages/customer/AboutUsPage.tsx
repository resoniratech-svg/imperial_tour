import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, Car, HeartHandshake, Compass, ArrowRight, Sparkles } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-gold-500/20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600"
            alt="Doha Skyline"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold tracking-widest uppercase border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Excellence in Arabian Hospitality</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            About Imperial Tours Qatar
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Founded with a vision to showcase the extraordinary beauty, rich heritage, and modern dynamism of Qatar to travelers from around the globe.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon">
              Our Heritage & Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Curating Qatar’s Most Luxurious & Authentic Adventures
            </h2>
            <div className="w-20 h-1 bg-gold-500 rounded-full" />
            <p className="text-sm text-slate-600 leading-relaxed">
              Imperial Tours Qatar (ITQ) stands as a premier destination management company rooted in the Arabian Gulf. From the monumental singing dunes of the southern desert to the shimmering futuristic skyline of West Bay and Lusail, our mission is to deliver seamless, unforgettable travel experiences.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you are an individual explorer, a couple seeking a romantic desert escape at Outpost Al Barari, or a family exploring the mangroves of Al Thakira, our personalized service guarantees unmatched comfort, safety, and cultural depth.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <Link
                to="/tours"
                className="px-6 py-3 bg-qatar-maroon hover:bg-qatar-maroon-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition"
              >
                Browse Our 25 Tours
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 bg-white border border-slate-300 hover:border-gold-500 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition"
              >
                Speak with Our Team
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-500/20">
              <img
                src="https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1000"
                alt="Qatar Desert Safari 4x4 Fleet"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl border border-gold-500/30 max-w-xs hidden sm:block">
              <div className="font-serif text-3xl font-bold text-gold-400">100%</div>
              <p className="text-xs text-slate-300 mt-1">
                Licensed guides, inspected off-road vehicles & passenger insurance coverage on all safaris.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="bg-slate-100 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon">
              Quality Assurance
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mt-2">
              The Imperial Standard
            </h2>
            <div className="w-16 h-1 bg-gold-500 mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <ShieldCheck className="w-10 h-10 text-gold-500 mb-2" />
              <h3 className="font-serif text-lg font-bold text-slate-900">Safety & Compliance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our drivers are officially trained and certified in dune recovery and desert navigation. Every vehicle undergoes stringent technical inspections before off-road deployment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <Award className="w-10 h-10 text-gold-500 mb-2" />
              <h3 className="font-serif text-lg font-bold text-slate-900">Transparent Official Pricing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All prices are published in Qatari Riyal (QAR) with dynamic group tier discounts clearly stated. No hidden fuel surcharges or surprise costs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <HeartHandshake className="w-10 h-10 text-gold-500 mb-2" />
              <h3 className="font-serif text-lg font-bold text-slate-900">Authentic Qatari Warmth</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Experience traditional Arabic hospitality, from fresh Arabic coffee (Gahwa) and dates at our desert camps to knowledgeable cultural storytellers on our museum tours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
