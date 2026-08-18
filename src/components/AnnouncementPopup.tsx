import React, { useState, useEffect } from 'react';
import { useSchool } from '../context/SchoolContext';
import { safeSessionStorage } from '../utils/safeStorage';
import { 
  X, 
  GraduationCap, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export const AnnouncementPopup: React.FC = () => {
  const { openAdmissionModal, language } = useSchool();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 1.5 seconds if not closed in this session
    const timer = setTimeout(() => {
      const dismissed = safeSessionStorage.getItem('hms_popup_dismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    safeSessionStorage.setItem('hms_popup_dismissed', 'true');
  };

  const handleApplyClick = () => {
    handleDismiss();
    openAdmissionModal();
  };

  if (!isVisible) return null;

  return (
    <div 
      id="announcement-popup-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2A26]/75 backdrop-blur-sm animate-in fade-in duration-300"
    >
      <div 
        id="announcement-popup-card"
        className="relative bg-[#FCFAF7] rounded-3xl max-w-lg w-full overflow-hidden border border-[#E5E0D8] shadow-2xl text-[#3D3A35] text-center"
      >
        {/* Top Close Button */}
        <button
          id="btn-close-announcement-popup"
          onClick={handleDismiss}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-[#2C2A26]/80 text-[#FCFAF7] hover:bg-[#2C2A26] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Banner Image with Gradient */}
        <div className="relative h-44 w-full bg-[#5A5A40] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
            alt="Admissions Open"
            className="w-full h-full object-cover mix-blend-overlay opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF7] via-transparent to-transparent" />
          
          <div className="absolute bottom-2 left-0 right-0 px-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A5A40] text-white text-xs font-bold uppercase tracking-wider shadow-lg border border-[#6E6E52]">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'ta' ? 'சேர்க்கை அறிவிப்பு 2026–27' : 'ADMISSIONS OPEN 2026–27'}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
              Holy Madonnas School, Lalapet
            </h3>
            <p className="text-xs text-[#5A5A40] font-semibold mt-0.5">
              Matriculation Higher Secondary School
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#736E65] leading-relaxed">
            {language === 'ta'
              ? 'மழலையர் வகுப்பு (Pre-KG) முதல் 12-ஆம் வகுப்பு வரை புதிய கல்வி ஆண்டிற்கான சேர்க்கை நடைபெறுகிறது. உங்கள் குழந்தையின் சிறந்த எதிர்காலத்திற்கு இன்றே விண்ணப்பியுங்கள்!'
              : 'Admissions are currently underway for Pre-KG through Class XII. Limited seats available in Science & Commerce streams. Secure your seat now!'}
          </p>

          <div className="bg-[#F5F2ED] p-3 rounded-xl border border-[#E5E0D8] text-xs text-[#524E48] flex items-center justify-around">
            <div className="flex items-center gap-1 text-[#5A5A40] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Smart Classrooms</span>
            </div>
            <div className="flex items-center gap-1 text-[#5A5A40] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Board Results</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="btn-popup-apply-now"
              onClick={handleApplyClick}
              className="flex-1 py-3 bg-[#5A5A40] hover:bg-[#4E4E37] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#6E6E52]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{language === 'ta' ? 'இப்போதே விண்ணப்பிக்க' : 'Apply Online Now'}</span>
            </button>

            <button
              onClick={handleDismiss}
              className="px-5 py-3 bg-[#EAE5DC] hover:bg-[#DDD7CC] text-[#3D3A35] font-semibold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer border border-[#D5CEC2]"
            >
              {language === 'ta' ? 'பிறகு பார்க்க' : 'Remind Later'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
