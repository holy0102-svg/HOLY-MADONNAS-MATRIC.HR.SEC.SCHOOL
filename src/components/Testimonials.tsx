import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { testimonialsList } from '../data/schoolData';
import { 
  MessageSquareQuote, 
  Star, 
  Quote, 
  CheckCircle2, 
  Sparkles,
  Heart
} from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { language, t } = useSchool();

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white text-[#3D3A35] border-b border-[#E5E0D8] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-3 border border-[#5A5A40]/20">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>{language === 'ta' ? 'பெற்றோரின் நற்சான்றுகள்' : 'Parent & Community Voices'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {t.testimonialsHeading}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {t.testimonialsSubHeading}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonials Grid */}
        <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsList.map((test) => {
            const cleanName = test.parentName.replace(/^(Mr\.|Mrs\.|Dr\.|Sr\.)\s*/, '');
            const initials = cleanName
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map(n => n[0])
              .join('')
              .toUpperCase();

            return (
              <div
                key={test.id}
                id={`testimonial-card-${test.id}`}
                className="bg-[#F5F2ED] rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] hover:border-[#5A5A40]/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
              >
                <Quote className="w-10 h-10 text-[#5A5A40]/20 absolute top-6 right-6 rotate-180 group-hover:text-[#5A5A40]/40 transition-colors" />

                <div>
                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 mb-4 text-[#5A5A40]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#5A5A40]" />
                    ))}
                    <span className="text-xs font-bold text-[#706B63] ml-1.5">5.0 / 5.0</span>
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm sm:text-base text-[#3D3A35] italic leading-relaxed mb-6 font-['Cinzel',serif]">
                    "{language === 'ta' ? test.quoteTa : test.quote}"
                  </p>
                </div>

                {/* Author Row with Initials Badge */}
                <div className="pt-4 border-t border-[#E5E0D8] flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#5A5A40] text-white flex items-center justify-center font-bold text-sm font-['Cinzel',serif] shadow-xs shrink-0">
                    {initials || 'HM'}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C2A26] text-sm font-['Cinzel',serif]">
                      {language === 'ta' ? test.parentNameTa : test.parentName}
                    </h4>
                    <p className="text-xs text-[#5A5A40] font-semibold">
                      {language === 'ta' ? test.studentClassTa : test.studentClass}
                    </p>
                    <span className="text-[10px] text-[#8A847C] flex items-center gap-1 font-normal mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                      <span>{language === 'ta' ? 'உறுதிப்படுத்தப்பட்ட பெற்றோர்' : 'Verified Parent'} • {test.year}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
