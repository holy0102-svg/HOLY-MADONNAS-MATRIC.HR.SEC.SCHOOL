import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { SchoolLogo } from './SchoolLogo';
import { 
  GraduationCap, 
  Play, 
  Phone, 
  Sparkles, 
  Award, 
  BookOpen, 
  Users, 
  Calendar,
  CheckCircle2,
  MapPin
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, language, openAdmissionModal, openVideoModal, videos } = useSchool();

  const featuredVideo = videos.find(v => v.isFeatured) || videos[0];

  const stats = [
    { number: '500+', label: t.statStudents, icon: Users, color: 'from-amber-500 to-amber-600' },
    { number: '50+', label: t.statTeachers, icon: BookOpen, color: 'from-sky-500 to-blue-600' },
    { number: '25+', label: t.statYears, icon: Award, color: 'from-emerald-500 to-teal-600' },
    { number: '100%', label: t.statPassRate, icon: CheckCircle2, color: 'from-rose-500 to-red-600' },
    { number: '100+', label: t.statAchievements, icon: Award, color: 'from-purple-500 to-indigo-600' },
    { number: '20+', label: t.statEvents, icon: Calendar, color: 'from-amber-400 to-orange-500' }
  ];

  return (
    <section id="home" className="relative min-h-[88vh] flex flex-col justify-between overflow-hidden bg-[#FCFAF7] text-[#2C2A26] border-b border-[#E5E0D8]">
      {/* Background Image with Warm Organic Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=85"
          alt="Holy Madonnas School Campus Lalapet"
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000 opacity-20 filter brightness-95 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF7] via-[#FCFAF7]/90 to-[#F5F2ED]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#5A5A40]/10 via-transparent to-transparent" />
      </div>

      {/* Decorative Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E0D8_1px,transparent_1px),linear-gradient(to_bottom,#E5E0D8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-12 sm:pt-16 pb-12 my-auto w-full">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Official School Crest & Admissions Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
            <div className="p-1.5 rounded-full bg-white/90 shadow-md border border-[#E5E0D8] backdrop-blur-xs">
              <SchoolLogo size="lg" variant="emblem" glow className="hover:rotate-3 transition-transform duration-300" />
            </div>

            <div 
              id="hero-admission-badge"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6321] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm animate-bounce"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{t.heroBadge}</span>
            </div>
          </div>

          {/* School Name Title with Royal Serif Display */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2C2A26] font-['Cinzel',serif] uppercase leading-[1.1]">
            {t.heroTitle}
          </h1>

          <h2 className="text-sm sm:text-lg md:text-xl font-bold tracking-widest text-[#5A5A40] uppercase mt-2 sm:mt-3 font-['Plus_Jakarta_Sans',sans-serif]">
            {t.heroSubTitle}
          </h2>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#706B63] bg-[#F5F2ED] px-3.5 py-1.5 rounded-full border border-[#E5E0D8] mt-3 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>{t.location} • {language === 'ta' ? 'தமிழ்நாடு' : 'Tamil Nadu'}</span>
            <span className="text-[#D9D3C7]">|</span>
            <span className="text-[#8A847C] text-[11px]">{language === 'ta' ? 'இருபாலர் பள்ளி' : 'Co-Ed Matriculation'}</span>
          </div>

          {/* Core Motto Ribbon */}
          <div className="my-6 py-2.5 px-6 rounded-2xl bg-[#5A5A40]/10 border-y border-[#5A5A40]/20">
            <p className="text-lg sm:text-2xl md:text-3xl font-semibold italic text-[#5A5A40] tracking-wide font-['Cinzel',serif]">
              {t.motto}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-[#706B63] max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            {t.heroDesc}
          </p>

          {/* 3 Main Action Buttons */}
          <div id="hero-action-buttons-group" className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-xl">
            {/* 1. Admissions Open */}
            <button
              id="hero-btn-admissions-open"
              onClick={openAdmissionModal}
              className="flex-1 min-w-[180px] sm:min-w-[200px] flex items-center justify-center gap-2 bg-[#FF6321] hover:bg-[#E25213] text-white font-bold px-6 py-3.5 rounded-full shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-white" />
              <span>{t.btnAdmissionsOpen}</span>
            </button>

            {/* 2. Watch Our Videos */}
            <button
              id="hero-btn-watch-videos"
              onClick={() => {
                if (featuredVideo) {
                  openVideoModal(featuredVideo);
                } else {
                  const el = document.getElementById('videos');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-white hover:bg-[#F5F2ED] text-[#2C2A26] border border-[#E5E0D8] font-bold px-5 py-3.5 rounded-full shadow-xs hover:border-[#5A5A40] transition-all text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-[#FF6321] fill-[#FF6321]" />
              <span>{t.btnWatchVideos}</span>
            </button>

            {/* 3. Contact School */}
            <a
              id="hero-btn-contact-school"
              href="#contact"
              className="min-w-[140px] flex items-center justify-center gap-2 bg-[#F5F2ED] hover:bg-[#EAE4DC] text-[#3D3A35] border border-[#E5E0D8] font-bold px-5 py-3.5 rounded-full hover:text-[#2C2A26] transition-all text-xs sm:text-sm uppercase tracking-wider"
            >
              <Phone className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>{t.btnContactSchool}</span>
            </a>
          </div>

          {/* Quick Notice Ticker underneath buttons */}
          <div className="mt-8 flex items-center gap-2 text-xs text-[#706B63] bg-white px-4 py-2 rounded-full border border-[#E5E0D8] max-w-lg shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#FF6321] animate-ping" />
            <span className="truncate">
              {language === 'ta' 
                ? '📢 நேரடி சேர்க்கை மற்றும் பேருந்து பதிவு அலுவலகத்தில் நடைபெறுகிறது'
                : '📢 Direct admissions & bus registrations active in school admin office'}
            </span>
          </div>

        </div>
      </div>

      {/* Animated Counter Stats Bar */}
      <div id="hero-stats-bar" className="relative z-10 w-full bg-white border-t border-[#E5E0D8] py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                id={`stat-card-${index}`}
                className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D8] hover:border-[#5A5A40]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#5A5A40] flex items-center justify-center text-white mb-2 shadow-xs">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-black text-[#5A5A40] tracking-tight font-['Cinzel',serif]">
                  {stat.number}
                </span>
                <span className="text-[10px] sm:text-xs text-[#8A847C] font-semibold uppercase tracking-wider mt-0.5 leading-tight">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
