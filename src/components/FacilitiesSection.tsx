import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { schoolFacilities } from '../data/schoolData';
import { Facility } from '../types';
import { 
  Building2, 
  FlaskConical, 
  Laptop, 
  Tv, 
  BookOpen, 
  Trophy, 
  Bus, 
  Church, 
  Droplets, 
  HeartPulse, 
  CheckCircle2, 
  X,
  Sparkles,
  Layers
} from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  const { t, language } = useSchool();
  const [activeFacility, setActiveFacility] = useState<Facility | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'FlaskConical': return FlaskConical;
      case 'Laptop': return Laptop;
      case 'Tv': return Tv;
      case 'BookOpen': return BookOpen;
      case 'Trophy': return Trophy;
      case 'Bus': return Bus;
      case 'Church': return Church;
      case 'Droplets': return Droplets;
      case 'HeartPulse': return HeartPulse;
      default: return Building2;
    }
  };

  return (
    <section id="facilities" className="py-16 sm:py-24 bg-white text-[#2C2A26] border-b border-[#E5E0D8] relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F5F2ED] rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#F5F2ED] rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-3 border border-[#5A5A40]/20">
            <Building2 className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>{language === 'ta' ? 'உயர் கட்டமைப்பு வசதிகள்' : 'Infrastructure & Amenities'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {t.facilitiesHeading}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {t.facilitiesSubHeading}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* Facilities Grid */}
        <div id="facilities-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {schoolFacilities.map((fac) => {
            const Icon = getIcon(fac.iconName);
            return (
              <div
                key={fac.id}
                id={`facility-card-${fac.id}`}
                onClick={() => setActiveFacility(fac)}
                className="group bg-[#F5F2ED] rounded-3xl p-6 sm:p-7 border border-[#E5E0D8] hover:border-[#5A5A40]/60 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Category Tag Header */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#5A5A40] text-white flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-[#484833] transition-all">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E0D8] text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-[#5A5A40]" />
                      <span>{language === 'ta' ? 'உயர் வசதி' : 'Campus Amenity'}</span>
                    </span>
                  </div>

                  {/* Facility Details */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#2C2A26] font-['Cinzel',serif] group-hover:text-[#5A5A40] transition-colors leading-snug">
                    {language === 'ta' ? fac.titleTa : fac.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#706B63] mt-2.5 line-clamp-3 leading-relaxed">
                    {language === 'ta' ? fac.descriptionTa : fac.description}
                  </p>

                  {/* Feature Highlights Badges */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-[#E5E0D8]/80">
                    {(language === 'ta' ? fac.featuresTa : fac.features).slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#3D3A35]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-3 flex items-center justify-between text-xs font-bold text-[#5A5A40] group-hover:text-[#2C2A26] transition-colors">
                  <span>{language === 'ta' ? 'முழு விபரம் காண்க' : 'View Full Details & Amenities'}</span>
                  <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#E5E0D8] shadow-2xs group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Facility Detail Modal */}
      {activeFacility && (
        <div
          id="facility-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2A26]/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveFacility(null)}
        >
          <div
            className="bg-white border border-[#E5E0D8] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl text-[#2C2A26]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header without photos */}
            <div className="bg-[#5A5A40] text-white p-6 sm:p-8 flex items-center justify-between relative">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                  {React.createElement(getIcon(activeFacility.iconName), { className: 'w-7 h-7 text-white' })}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9D3C7] block">
                    {language === 'ta' ? 'பள்ளி கட்டமைப்பு வசதி' : 'Campus Infrastructure Spec'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-['Cinzel',serif] text-white">
                    {language === 'ta' ? activeFacility.titleTa : activeFacility.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveFacility(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <p className="text-sm text-[#706B63] leading-relaxed">
                {language === 'ta' ? activeFacility.descriptionTa : activeFacility.description}
              </p>

              <div className="bg-[#F5F2ED] p-5 rounded-2xl border border-[#E5E0D8] space-y-3">
                <h4 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  {language === 'ta' ? 'அம்சங்கள் & உபகரணங்கள்:' : 'Key Infrastructure Highlights:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#3D3A35]">
                  {(language === 'ta' ? activeFacility.featuresTa : activeFacility.features).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveFacility(null)}
                  className="px-6 py-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold rounded-full uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {language === 'ta' ? 'மூடுக' : 'Close Details'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
