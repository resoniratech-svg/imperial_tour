import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <span className="text-xs font-bold uppercase tracking-widest text-qatar-maroon">Legal & Trust</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">Effective Date: November 2026</p>
          <div className="w-16 h-1 bg-gold-500 rounded-full" />

          <h2 className="font-serif text-lg font-bold text-slate-900 pt-4">1. Information We Collect</h2>
          <p>
            When booking an experience with Imperial Tours Qatar (ITQ), we collect contact information including your full name, email address, telephone/WhatsApp number, country of residence, and hotel pickup location. This information is strictly utilized to coordinate tour logistics and passenger communication.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900 pt-4">2. Use of Information</h2>
          <p>
            Your details are used solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process, review, and confirm your tour reservations.</li>
            <li>Coordinate driver dispatch and hotel pickup schedules in Doha.</li>
            <li>Maintain customer booking history for verification and quality control.</li>
            <li>Comply with Qatar Tourism safety regulations and passenger manifest requirements.</li>
          </ul>

          <h2 className="font-serif text-lg font-bold text-slate-900 pt-4">3. Data Security & Storage</h2>
          <p>
            All booking records and communications are securely maintained within protected database systems. We do not store credit card details on our servers. We never sell, rent, or disclose personal customer data to unauthorized third parties.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900 pt-4">4. Contacting Us Regarding Your Data</h2>
          <p>
            If you wish to update, review, or delete your contact records with Imperial Tours Qatar, please reach out through our official Contact Us channel.
          </p>
        </div>
      </div>
    </div>
  );
};
