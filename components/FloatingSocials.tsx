
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

const FloatingSocials: React.FC = () => {
  return (
    <>
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
        {/* WhatsApp */}
        <a
          href="https://wa.me/556899688695"
          target="_blank"
          rel="noopener noreferrer"
          data-tooltip-id="global-social-tooltip"
          data-tooltip-content="Falar no WhatsApp"
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <MessageCircle size={28} />
        </a>
      </div>

      <Tooltip 
        id="global-social-tooltip" 
        place="left" 
        className="cvp-tooltip"
        noArrow={false}
        offset={15}
      />
    </>
  );
};

export default FloatingSocials;
