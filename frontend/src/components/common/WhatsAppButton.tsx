import React from 'react';
import { MessageCircle } from 'lucide-react';
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
  const { settings } = useSelector((state: RootState) => state.settings);

  const rawNumber = settings.whatsapp || '+974 3374 5324';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '') || '97433745324';

  const buildPrefilledMessage = () => {
    let msg = 'Hello Imperial Tours Qatar, I am interested in booking an experience in Qatar.';
    if (tourName) msg += `\n• Tour: ${tourName}`;
    if (travelDate) msg += `\n• Travel Date: ${travelDate}`;
    if (numberOfGuests) msg += `\n• Guests: ${numberOfGuests} Person(s)`;
    if (estimatedPrice) msg += `\n• Estimated Price: ${estimatedPrice} QAR`;
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${buildPrefilledMessage()}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white/20"
        aria-label="Chat on WhatsApp (+974 3374 5324)"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
      </a>
    </div>
  );
};
