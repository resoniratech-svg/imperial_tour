import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does pricing work on Imperial Tours Qatar?',
      a: 'All tour prices are published in QAR (Qatari Riyal). For most tours, prices are PER PERSON based on your selected group size tier (for example, 2 persons at 400 QAR each = 800 QAR total). For select packages like the Water Sports Tour (2,800 QAR for 1–5 persons) or Romantic Dinner Safari (2,250 QAR for 2 persons), the price is a fixed group package total. Our booking engine automatically applies the exact tier based on your guest count.',
    },
    {
      q: 'Where will our guide pick us up?',
      a: 'All our tours include complimentary pickup and drop-off from any hotel, residence, or airport terminal in Doha. During checkout, you can specify your hotel name or address.',
    },
    {
      q: 'Is my booking instantly confirmed?',
      a: 'When you submit a booking request, its status is marked as “Pending”. An Imperial Tours Qatar operations manager reviews vehicle availability and assigns an experienced guide before officially approving the reservation. You will receive email/phone confirmation without any online credit card risk.',
    },
    {
      q: 'What should I wear on a Desert Safari?',
      a: 'We recommend comfortable, loose-fitting cotton clothing and sandals or sports shoes. Sunglasses, sunscreen, and a light jacket are advisable for evening safaris as temperatures drop in the desert after sunset.',
    },
    {
      q: 'Are desert safaris and dune bashing safe for children?',
      a: 'Safety is our absolute priority. Our 4x4 SUVs are fitted with roll cages, safety belts, and full off-road insurance. For families with infants, elderly guests, or pregnant women, our drivers can provide a smooth scenic drive directly to the desert camp without steep dune bashing.',
    },
    {
      q: 'Can we book for large groups of 6 or more persons?',
      a: 'Yes! While standard 4x4 SUVs seat up to 5–6 guests comfortably, we regularly coordinate multiple vehicle convoys for corporate groups, weddings, and large family gatherings. Please submit an inquiry or contact our WhatsApp concierge for custom group quotations.',
    },
    {
      q: 'What is included in the Dhow Cruise dinner tours?',
      a: 'Our Dhow Cruise With Dinner package includes a private wooden dhow, experienced crew, certified English-speaking guide, live open-flame BBQ meal freshly prepared on board, soft drinks, safety gear (life jackets, GPS, first aid), bathroom facilities, and sound system.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20">
      <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-gold-500/20 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Assistance & Guidance</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about preparing for Qatar desert safaris, dhow cruises, city tours, and booking with ITQ.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-serif text-base font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-500 flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">Have a specific question?</h3>
            <p className="text-xs text-slate-400 mt-1">Our Qatar travel concierge is on hand 7 days a week.</p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-gold-glow transition"
          >
            Contact Our Team
          </Link>
        </div>
      </div>
    </div>
  );
};
