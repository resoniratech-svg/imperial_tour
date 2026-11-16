import React from 'react';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon">Service Agreement</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-400">Effective Date: November 2026</p>
          <div className="w-16 h-1 bg-gold-500 rounded-full" />

          <h2 className="font-serif text-lg font-bold text-slate-900 pt-4">1. Booking & Reservation Policy</h2>
          <p>
            Submission of an online booking request through the Imperial Tours Qatar platform does not constitute an instant binding contract until formally approved by an authorized administrator. Bookings are held in "Pending" status pending vehicle, guide, and slot confirmation.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900 pt-4">2. Pricing & Currency</h2>
          <p>
            All rates are stated in Qatari Riyal (QAR). Dynamic tiered rates are calculated on a per-person basis for the specified group size unless explicitly identified as a fixed group total (e.g. Water Sports Tour, Romantic Safari Dinner). Group sizes exceeding standard tiers require custom pricing quotation.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900 pt-4">3. Cancellations & Amendments</h2>
          <p>
            Cancellations submitted at least 24 hours prior to the scheduled departure time may be refunded or rescheduled without penalty. Cancellations within 24 hours of departure or failure to arrive for scheduled pickup may incur cancellation charges.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900 pt-4">4. Safety & Guest Responsibility</h2>
          <p>
            All off-road safaris, water sports, and boat cruises are conducted under strict maritime and desert safety regulations. Guests are required to follow guide instructions, wear seatbelts / life jackets, and notify our team of any medical conditions or mobility limitations in advance.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900 pt-4">5. Governing Law</h2>
          <p>
            These terms are governed by the applicable commercial and tourism regulations of the State of Qatar.
          </p>
        </div>
      </div>
    </div>
  );
};
