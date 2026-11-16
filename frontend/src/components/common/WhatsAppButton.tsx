import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface WhatsAppButtonProps {
  tourName?: string;
  travelDate?: string;
  numberOfGuests?: number;
  estimatedPrice?: number;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  tourName,
  travelDate,
  numberOfGuests,
  estimatedPrice,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const { settings } = useSelector((state: RootState) => state.settings);

  const rawNumber = settings.whatsapp || '';
  // Clean phone number (remove spaces, dashes, plus)
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');

  const buildPrefilledMessage = () => {
    let msg = 'Hello Imperial Tours Qatar (ITQ),\nI am interested in booking an experience in Qatar:';
    if (tourName) msg += `\n• Tour: ${tourName}`;
    if (travelDate) msg += `\n• Travel Date: ${travelDate}`;
    if (numberOfGuests) msg += `\n• Guests: ${numberOfGuests} Person(s)`;
    if (estimatedPrice) msg += `\n• Estimated Price: ${estimatedPrice} QAR`;
    if (customMsg) msg += `\n\nNotes: ${customMsg}`;
    msg += '\n\nPlease advise on availability and pickup arrangements. Thank you!';
    return encodeURIComponent(msg);
  };

  const handleOpenWhatsApp = () => {
    if (!cleanNumber) {
      alert('WhatsApp inquiry number is currently being configured by our team. Please use our Contact Us form for immediate assistance!');
      return;
    }
    const url = `https://wa.me/${cleanNumber}?text=${buildPrefilledMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Popover inquiry box */}
      {isOpen && (
        <div className="mb-3 w-80 bg-slate-900 border border-gold-500/30 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                ITQ WhatsApp Concierge
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs text-slate-300 mb-3">
            {tourName ? (
              <div className="bg-slate-800 p-2 rounded border border-slate-700">
                <p className="font-semibold text-gold-400">{tourName}</p>
                {numberOfGuests && <p>Guests: {numberOfGuests} Person(s)</p>}
                {estimatedPrice && <p>Estimated: {estimatedPrice} QAR</p>}
              </div>
            ) : (
              <p>Chat directly with our Qatar luxury tour specialists via WhatsApp.</p>
            )}

            <textarea
              placeholder="Any special requests (hotel pickup, timing, dietary)?"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 focus:border-gold-500 rounded p-2 text-white text-xs outline-none resize-none h-16"
            />
          </div>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Launch WhatsApp Chat</span>
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20"
        aria-label="WhatsApp Inquiry"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
      </button>
    </div>
  );
};
