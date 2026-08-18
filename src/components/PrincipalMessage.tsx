import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { SchoolLogo } from './SchoolLogo';
import principalImg from '../assets/images/regenerated_image_1787059291175.png';
import { 
  Quote, 
  Sparkles, 
  Award, 
  Heart, 
  BookCheck, 
  Compass, 
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  GraduationCap,
  Crown,
  Lightbulb,
  Compass as GuideIcon
} from 'lucide-react';

export const PrincipalMessage: React.FC = () => {
  const { t, language, isPrincipalModalOpen, openPrincipalModal, closePrincipalModal, openAdmissionModal } = useSchool();

  const leadershipPillars = [
    {
      title: language === 'ta' ? 'தொலைநோக்குச் சிந்தனையாளர்' : 'VISIONARY',
      subtitle: language === 'ta' ? 'தெளிவான தொலைநோக்கு மற்றும் இலக்குடன் வழிநடத்துதல்' : 'Leading us with vision and purpose',
      icon: Lightbulb,
      badgeColor: 'bg-amber-500/15 text-amber-800 border-amber-300'
    },
    {
      title: language === 'ta' ? 'சிறந்த கல்வியாளர்' : 'EDUCATOR',
      subtitle: language === 'ta' ? 'இளைய தலைமுறையின் சிந்தனையைத் தூண்டி எதிர்காலத்தை செதுக்குதல்' : 'Inspiring minds and shaping the future',
      icon: GraduationCap,
      badgeColor: 'bg-blue-500/15 text-blue-800 border-blue-300'
    },
    {
      title: language === 'ta' ? 'வழிகாட்டி' : 'GUIDE',
      subtitle: language === 'ta' ? 'வெற்றிப் பாதையில் மாணவர்களை திறம்பட வழிநடத்துதல்' : 'Steering us on the path of success',
      icon: GuideIcon,
      badgeColor: 'bg-emerald-500/15 text-emerald-800 border-emerald-300'
    },
    {
      title: language === 'ta' ? 'சிறந்த தலைவர்' : 'LEADER',
      subtitle: language === 'ta' ? 'அனைவரையும் ஊக்கப்படுத்தி, ஆதரவளித்து சாதிக்க வைத்தல்' : 'Encouraging, supporting and empowering all',
      icon: Crown,
      badgeColor: 'bg-purple-500/15 text-purple-800 border-purple-300'
    }
  ];

  return (
    <section id="principal" className="py-16 sm:py-24 bg-white border-b border-[#E5E0D8] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5F2ED] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-70" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5F2ED] rounded-full blur-3xl pointer-events-none -ml-20 -mb-20 opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-3 border border-[#5A5A40]/20">
            <Award className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>{language === 'ta' ? 'பள்ளித் தலைமை & பெருமை' : 'Leadership & Dedication'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {language === 'ta' ? 'எங்கள் முதல்வர், எங்கள் பெருமை' : 'Welcome From the Principal'}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {language === 'ta' ? 'உங்கள் தொலைநோக்கு பார்வை, வழிகாட்டுதல் மற்றும் அர்ப்பணிப்பிற்கு மனமார்ந்த நன்றிகள்.' : 'Thank you for your vision, guidance and dedication.'}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* Main Principal Feature Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#F5F2ED] rounded-3xl p-6 sm:p-10 border border-[#E5E0D8] shadow-sm">
          
          {/* Photo & Badge Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2.5 bg-gradient-to-tr from-[#5A5A40] to-amber-600/40 rounded-3xl blur-sm opacity-70 group-hover:opacity-100 transition duration-500" />
              
              {/* Principal Photo Container */}
              <div className="relative w-64 h-80 sm:w-76 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#2C2A26]">
                <img
                  src={principalImg}
                  alt="Our Principal, Our Pride"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E1B] via-transparent to-transparent" />
                
                {/* Embedded Ribbon Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-[#1F1E1B]/85 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-400/40 uppercase tracking-widest shadow-md">
                    OUR PRINCIPAL, OUR PRIDE
                  </span>
                </div>

                {/* Embedded Name Card on Image bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-center bg-[#1F1E1B]/95 backdrop-blur-md py-2.5 px-3 rounded-xl border border-amber-500/30 shadow-lg flex items-center justify-center gap-2.5">
                  <SchoolLogo size="xs" variant="emblem" />
                  <div>
                    <h3 className="text-sm font-bold text-white font-['Cinzel',serif] leading-tight">
                      {t.principalName}
                    </h3>
                    <p className="text-[10px] font-semibold text-amber-300">
                      {t.principalTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Respect & Gratitude Ribbon */}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E0D8] text-[11px] font-bold text-[#5A5A40] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>RESPECT • GRATITUDE • INSPIRATION</span>
              </div>
            </div>
          </div>

          {/* Message & Core Statement Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            
            {/* Quote Icon & Big Quote Statement */}
            <div className="relative pl-6 border-l-4 border-[#5A5A40]">
              <Quote className="w-8 h-8 text-[#5A5A40]/30 absolute -top-4 -left-2 rotate-180" />
              <blockquote className="text-lg sm:text-xl md:text-2xl font-bold text-[#2C2A26] font-['Cinzel',serif] italic leading-relaxed">
                {t.principalQuote}
              </blockquote>
            </div>

            {/* Short paragraphs */}
            <p className="text-[#3D3A35] text-sm sm:text-base leading-relaxed font-normal">
              {t.principalParagraph1}
            </p>

            <p className="text-[#706B63] text-sm sm:text-base leading-relaxed font-normal">
              {t.principalParagraph2}
            </p>

            {/* 4 Leadership Core Pills */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {leadershipPillars.map((pil, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-[#E5E0D8]">
                  <pil.icon className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[11px] font-bold text-[#2C2A26] uppercase tracking-wider">{pil.title}</h5>
                    <p className="text-[10px] text-[#706B63] leading-tight line-clamp-1">{pil.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions: Read Full Message + Apply */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="btn-principal-read-more"
                onClick={openPrincipalModal}
                className="inline-flex items-center gap-2 bg-[#5A5A40] hover:bg-[#484833] text-white font-semibold px-5 py-2.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <span>{t.readMoreMessage}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                id="btn-principal-apply-cta"
                onClick={openAdmissionModal}
                className="inline-flex items-center gap-2 bg-[#FF6321] hover:bg-[#E25213] text-white font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>{t.applyNow}</span>
              </button>
            </div>

          </div>

        </div>

        {/* 4 Educational Pillars Grid */}
        <div id="about-pillars" className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                id={`pillar-card-${idx}`}
                className="bg-white p-6 rounded-3xl border border-[#E5E0D8] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-[#F5F2ED] border border-[#E5E0D8] text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#2C2A26] font-['Cinzel',serif] mb-1.5">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#706B63] leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Full Message Modal */}
      {isPrincipalModalOpen && (
        <div 
          id="principal-message-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2A26]/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closePrincipalModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5E0D8] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#5A5A40] shrink-0">
                  <img
                    src={principalImg}
                    alt="Principal"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-[#2C2A26] text-lg font-['Cinzel',serif]">{t.principalName}</h3>
                  <p className="text-xs text-[#5A5A40] font-semibold">{t.principalTitle}</p>
                </div>
              </div>
              <button
                onClick={closePrincipalModal}
                className="text-[#8A847C] hover:text-[#2C2A26] text-xl font-bold p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#3D3A35] leading-relaxed">
              <p className="font-semibold text-[#2C2A26] italic text-base">
                {t.principalQuote}
              </p>
              <p>
                {t.principalParagraph1}
              </p>
              <p>
                {t.principalParagraph2}
              </p>
              <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E5E0D8] my-3">
                <h4 className="font-bold text-[#2C2A26] mb-1">
                  {language === 'ta' ? 'எங்களின் குறிக்கோள்:' : 'Our Foundational Promise to Parents:'}
                </h4>
                <ul className="space-y-1.5 text-xs text-[#5A5A40]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>{language === 'ta' ? 'அனைத்து மாணவர்களுக்கும் சமமான அன்பும் தனிநபர் கவனமும்' : 'Equal love, personal attention and guidance to every student'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>{language === 'ta' ? 'பாடப்புத்தகங்களை தாண்டிய ஒழுக்கமும் தலைமைப்பண்பும்' : 'Character building, discipline and moral conviction for life'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>{language === 'ta' ? 'அறிவியல், கணிதம் மற்றும் மொழித்திறனில் தன்னிறைவு' : 'Excellence in STEM, languages, public speaking, and digital literacy'}</span>
                  </li>
                </ul>
              </div>
              <p>
                {language === 'ta' 
                  ? 'எமது பள்ளியில் சேர்க்கை பெற விரும்பும் அனைத்து பெற்றோர்களையும், மாணவச் செல்வங்களையும் இருகரம் நீட்டி அன்புடன் வரவேற்கிறோம். இறைவனின் அருளும் ஆசீரும் உங்கள் இல்லங்களில் நிறைந்து வழிவதாக!'
                  : 'We warmly welcome all prospective parents and students to join the Holy Madonnas family. May the Divine blessings illuminate your child’s educational journey with happiness and victory!'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E0D8] flex justify-end gap-3">
              <button
                onClick={closePrincipalModal}
                className="px-4 py-2 bg-[#F5F2ED] hover:bg-[#EAE4DC] text-[#3D3A35] font-semibold rounded-full text-xs uppercase"
              >
                {t.closeModal}
              </button>
              <button
                onClick={() => {
                  closePrincipalModal();
                  openAdmissionModal();
                }}
                className="px-5 py-2 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold rounded-full text-xs uppercase flex items-center gap-1.5 shadow-sm"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t.applyNow}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
