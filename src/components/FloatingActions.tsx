import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { 
  Phone, 
  MessageCircle, 
  Youtube, 
  GraduationCap, 
  Bot, 
  ArrowUp,
  Sparkles
} from 'lucide-react';

export const FloatingActions: React.FC<{ onOpenAI?: () => void }> = ({ onOpenAI }) => {
  const { openAdmissionModal, language } = useSchool();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating Right Action Panel */}
      <div id="desktop-floating-actions" className="hidden md:flex fixed right-4 bottom-6 z-40 flex-col gap-2.5 items-end">
        
        {/* AI Assistant Quick Button */}
        {onOpenAI && (
          <button
            id="btn-floating-ai-assistant"
            onClick={onOpenAI}
            className="flex items-center gap-2 bg-[#2C2A26] hover:bg-[#3D3A35] text-[#FCFAF7] px-4 py-2.5 rounded-full shadow-xl border border-[#5A5A40] hover:scale-105 transition-all text-xs font-bold cursor-pointer group"
          >
            <Bot className="w-4 h-4 text-[#C8C2B4]" />
            <span>{language === 'ta' ? 'பள்ளி AI உதவியாளர்' : 'School AI Helper'}</span>
          </button>
        )}

        {/* WhatsApp Direct Chat */}
        <a
          id="btn-floating-whatsapp"
          href="https://wa.me/919629978066?text=Hello%20Holy%20Madonnas%20School%2C%20I%20would%20like%20to%20know%20about%20Admissions%202026-27"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#5A5A40] hover:bg-[#4E4E37] text-white px-4 py-2.5 rounded-full shadow-xl border border-[#6E6E52] hover:scale-105 transition-all text-xs font-bold group"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{language === 'ta' ? 'வாட்ஸ்அப் உதவி' : 'WhatsApp Chat'}</span>
        </a>

        {/* Quick Apply Badge */}
        <button
          id="btn-floating-apply-badge"
          onClick={openAdmissionModal}
          className="flex items-center gap-2 bg-[#EAE5DC] hover:bg-[#DDD7CC] text-[#2C2A26] px-4 py-2.5 rounded-full shadow-xl border border-[#C5BEB2] hover:scale-105 transition-all text-xs font-bold cursor-pointer"
        >
          <GraduationCap className="w-4 h-4 text-[#5A5A40]" />
          <span>{language === 'ta' ? 'சேர்க்கை விண்ணப்பம்' : 'Apply Online'}</span>
        </button>

        {/* Scroll To Top */}
        <button
          id="btn-scroll-top"
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#2C2A26] text-[#C8C2B4] hover:text-white hover:bg-[#3D3A35] border border-[#4A4740] shadow-md flex items-center justify-center transition-all cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div id="mobile-sticky-bottom-bar" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#24221E]/95 backdrop-blur-md border-t border-[#3A3731] p-2.5 flex items-center justify-around gap-2 text-white">
        
        {/* Call Button */}
        <a
          href="tel:+919629978066"
          className="flex-1 py-2 px-2 rounded-xl bg-[#2D2A24] hover:bg-[#38342D] border border-[#423E37] flex flex-col items-center justify-center text-[10px] font-bold text-[#D8D2C5]"
        >
          <Phone className="w-4 h-4 text-[#C8C2B4] mb-0.5" />
          <span>{language === 'ta' ? 'அழைக்க' : 'Call School'}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919629978066?text=Hello%20Holy%20Madonnas%20School"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-2 rounded-xl bg-[#5A5A40] hover:bg-[#4E4E37] border border-[#6E6E52] flex flex-col items-center justify-center text-[10px] font-bold text-white shadow-sm"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Apply Now Primary Button */}
        <button
          onClick={openAdmissionModal}
          className="flex-2 py-2 px-3 rounded-xl bg-[#EAE5DC] text-[#2C2A26] border border-[#C5BEB2] flex flex-col items-center justify-center text-[11px] font-extrabold shadow-md"
        >
          <GraduationCap className="w-4 h-4 text-[#5A5A40] mb-0.5" />
          <span>{language === 'ta' ? 'சேர்க்கை பதிவு' : 'Apply 2026–27'}</span>
        </button>

        {/* AI Helper Button */}
        {onOpenAI && (
          <button
            onClick={onOpenAI}
            className="flex-1 py-2 px-2 rounded-xl bg-[#2D2A24] hover:bg-[#38342D] border border-[#423E37] flex flex-col items-center justify-center text-[10px] font-bold text-[#D8D2C5]"
          >
            <Bot className="w-4 h-4 text-[#C8C2B4] mb-0.5" />
            <span>AI Bot</span>
          </button>
        )}

      </div>
    </>
  );
};
