import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { SchoolLogo } from './SchoolLogo';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Youtube, 
  Facebook, 
  Instagram, 
  Lock, 
  Heart,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Globe,
  Database
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t, openAdminModal, openAdmissionModal, openSEOInspector, openSqlEditor } = useSchool();

  return (
    <footer className="bg-[#24221E] text-white border-t border-[#3A3731] relative overflow-hidden">
      
      {/* Top accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#5A5A40] via-[#8C857B] to-[#5A5A40]" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: School Identity & Crest (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <SchoolLogo size="lg" variant="emblem" glow className="bg-white/10 p-1 rounded-full border border-white/20" />
              <div>
                <h3 className="text-base sm:text-lg font-bold font-['Cinzel',serif] text-[#FCFAF7] leading-tight">
                  HOLY MADONNA'S
                </h3>
                <p className="text-xs text-[#D8D2C5] font-semibold tracking-wider">
                  MATRICULATION HIGHER SECONDARY SCHOOL
                </p>
                <p className="text-[11px] text-[#A6A095]">Lalapet, Tamil Nadu</p>
              </div>
            </div>

            <p className="text-xs text-[#B8B2A7] leading-relaxed">
              {language === 'ta'
                ? 'ஹோலி மடோனாஸ் பள்ளி ஒழுக்கம், நற்பண்புகள், ஆன்மீக விழுமியங்கள் மற்றும் கல்விச் சிறப்பை மாணவர்களிடையே வளர்த்தெடுக்கும் சிறந்த கல்வி நிறுவனம்.'
                : 'Dedicated to sculpting young minds through holistic education, ethical values, modern digital pedagogy, and steadfast character building.'}
            </p>

            <div className="bg-[#2D2A24] border border-[#423E37] p-3.5 rounded-2xl">
              <span className="text-[10px] font-bold text-[#C8C2B4] uppercase tracking-widest block mb-1">
                {language === 'ta' ? 'பள்ளியின் தாரக மந்திரம்' : 'OUR SACRED MOTTO'}
              </span>
              <p className="text-xs font-semibold text-[#FCFAF7] italic font-['Cinzel',serif]">
                “{t.schoolMotto}”
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com/@holymadonnas?si=taqDqAepGtJbZYV2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#2D2A24] border border-[#423E37] hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white text-[#C8C2B4] flex items-center justify-center transition-colors"
                title="Watch @holymadonnas on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-9 h-9 rounded-xl bg-[#2D2A24] border border-[#423E37] hover:bg-[#5A5A40] hover:text-white text-[#C8C2B4] flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-9 h-9 rounded-xl bg-[#2D2A24] border border-[#423E37] hover:bg-[#5A5A40] hover:text-white text-[#C8C2B4] flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold font-['Cinzel',serif] text-[#FCFAF7] uppercase tracking-wider border-b border-[#3A3731] pb-2">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-[#B8B2A7]">
              <li>
                <a href="#home" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3 h-3 text-[#8C857B]" />
                  <span>{t.navHome}</span>
                </a>
              </li>
              <li>
                <a href="#principal" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3 h-3 text-[#8C857B]" />
                  <span>{t.navPrincipal}</span>
                </a>
              </li>
              <li>
                <a href="#admissions" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3 h-3 text-[#8C857B]" />
                  <span>{t.navAdmissions} (2026–27)</span>
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3 h-3 text-[#8C857B]" />
                  <span>{t.navAcademics}</span>
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3 h-3 text-[#8C857B]" />
                  <span>{t.navFacilities}</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3 h-3 text-[#8C857B]" />
                  <span>{t.navGallery}</span>
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3 h-3 text-[#8C857B]" />
                  <span>{t.navVideos}</span>
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3 h-3 text-[#8C857B]" />
                  <span>{t.navNews}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Wings & Portals (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold font-['Cinzel',serif] text-[#FCFAF7] uppercase tracking-wider border-b border-[#3A3731] pb-2">
              Academic Wings
            </h4>
            <ul className="space-y-2 text-xs text-[#B8B2A7]">
              <li><a href="#academics" className="hover:text-white">Pre-Primary (Pre-KG/UKG)</a></li>
              <li><a href="#academics" className="hover:text-white">Primary (Classes 1 - 5)</a></li>
              <li><a href="#academics" className="hover:text-white">Middle School (6 - 8)</a></li>
              <li><a href="#academics" className="hover:text-white">High School (9 - 10)</a></li>
              <li><a href="#academics" className="hover:text-white">Higher Sec (11 - 12)</a></li>
              <li><a href="#student-portal" className="hover:text-white">Bus Routes & Stops</a></li>
              <li><a href="#student-portal" className="hover:text-white">Exam Timetables</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Helpdesk (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold font-['Cinzel',serif] text-[#FCFAF7] uppercase tracking-wider border-b border-[#3A3731] pb-2">
              {t.footerContactInfo}
            </h4>
            
            <div className="space-y-2.5 text-xs text-[#B8B2A7]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8C2B4] shrink-0 mt-0.5" />
                <span>{t.schoolAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#C8C2B4] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href="tel:+919943461787" className="block hover:text-white font-semibold text-white">+91 99434 61787 <span className="text-[10px] text-[#A8A295] font-normal">(School / WhatsApp)</span></a>
                  <a href="tel:+919629978066" className="block hover:text-white text-[#C8C2B4]">+91 96299 78066 <span className="text-[10px] text-[#8A847C]">(Principal)</span></a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8C2B4] shrink-0" />
                <a href="mailto:holylalapet123@gmail.com" className="hover:text-white">holylalapet123@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C8C2B4] shrink-0" />
                <span>Mon - Sat: 8:30 AM - 4:30 PM</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={openAdmissionModal}
                className="w-full py-2.5 bg-[#5A5A40] hover:bg-[#4E4E37] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md border border-[#6E6E52]"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t.applyNow} (2026–27)</span>
              </button>

              <button
                onClick={openAdminModal}
                className="w-full py-2 bg-[#2D2A24] hover:bg-[#38342D] text-[#C8C2B4] hover:text-white border border-[#423E37] rounded-xl text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#8C857B]" />
                <span>Staff & Admin Portal Login</span>
              </button>

              <button
                onClick={openSqlEditor}
                className="w-full py-2 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 hover:text-emerald-200 border border-emerald-600/40 rounded-xl text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>⚡ Supabase SQL Studio & Cloud DB</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Recognition & Copyright */}
        <div className="mt-12 pt-6 border-t border-[#3A3731] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C857B]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5A5A40]" />
            <span>Recognized by Department of School Education, Govt. of Tamil Nadu</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openSEOInspector}
              className="flex items-center gap-1.5 text-[#C8C2B4] hover:text-white px-2.5 py-1 rounded-lg bg-[#2D2A24] border border-[#423E37] text-[11px] transition-colors cursor-pointer"
              title="Inspect Dynamic SEO, Open Graph & JSON-LD Structured Data"
            >
              <Globe className="w-3.5 h-3.5 text-[#A6A095]" />
              <span>SEO & Schema Inspector</span>
            </button>

            <p className="text-center sm:text-right">
              © {new Date().getFullYear()} Holy Madonnas Matriculation Higher Secondary School, Lalapet.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
