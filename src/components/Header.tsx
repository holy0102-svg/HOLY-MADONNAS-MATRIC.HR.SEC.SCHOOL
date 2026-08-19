import React, { useState, useEffect } from 'react';
import { useSchool } from '../context/SchoolContext';
import { SchoolLogo } from './SchoolLogo';
import { 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  ShieldCheck, 
  GraduationCap, 
  Menu, 
  X, 
  Sparkles, 
  BookOpen, 
  Play, 
  Image as ImageIcon,
  Newspaper,
  Calendar,
  Users,
  Building2,
  ChevronDown,
  Database
} from 'lucide-react';

export const Header: React.FC<{ onOpenAI?: () => void }> = ({ onOpenAI }) => {
  const { language, setLanguage, t, openAdmissionModal, openAdminModal, openAIAssistant, openSEOInspector, openSqlEditor } = useSchool();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.navHome, href: '#home', icon: BookOpen },
    { label: t.navAbout, href: '#about', icon: Building2 },
    { label: t.navPrincipal, href: '#principal', icon: Users },
    { label: t.navAdmissions, href: '#admissions', icon: GraduationCap, highlight: true },
    { label: t.navAcademics, href: '#academics', icon: BookOpen },
    { label: t.navFacilities, href: '#facilities', icon: Building2 },
    { label: t.navGallery, href: '#gallery', icon: ImageIcon },
    { label: t.navVideos, href: '#videos', icon: Play },
    { label: t.navNews, href: '#news', icon: Newspaper },
    { label: t.navContact, href: '#contact', icon: Phone }
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification / Contact Bar */}
      <div id="top-utility-bar" className="bg-[#F5F2ED] text-[#706B63] border-b border-[#E5E0D8] text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Contact snippets */}
          <div className="flex items-center gap-4 flex-wrap text-[#5A5A40] font-medium">
            <a 
              id="top-phone-link"
              href="tel:+919943461787" 
              className="flex items-center gap-1.5 hover:text-[#2C2A26] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>{t.callUs}</span>
            </a>
            <span className="hidden md:inline text-[#D9D3C7]">|</span>
            <a 
              id="top-email-link"
              href="mailto:holylalapet123@gmail.com" 
              className="hidden sm:flex items-center gap-1.5 hover:text-[#2C2A26] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>{t.emailUs}</span>
            </a>
            <span className="hidden lg:inline text-[#D9D3C7]">|</span>
            <div className="hidden lg:flex items-center gap-1.5 text-[#8A847C]">
              <Clock className="w-3.5 h-3.5 text-[#8A847C]" />
              <span>{t.officeHours}</span>
            </div>
          </div>

          {/* Controls: Language toggle + AI Assistant + Admin Login */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Quick Trigger */}
            <button
              id="btn-open-ai-top"
              onClick={openAIAssistant}
              className="flex items-center gap-1 bg-white hover:bg-[#EAE4DC] text-[#5A5A40] border border-[#E5E0D8] px-2.5 py-1 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer"
              title="Madonnas AI School Assistant"
            >
              <Sparkles className="w-3 h-3 text-[#FF6321]" />
              <span className="hidden xs:inline">AI Help Bot</span>
            </button>

            {/* SQL Studio Quick Trigger */}
            <button
              id="btn-open-sql-studio"
              onClick={openSqlEditor}
              className="flex items-center gap-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-800 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="Open Supabase Cloud Database & Interactive SQL Studio"
            >
              <Database className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>SQL Studio</span>
            </button>

            {/* Dynamic SEO Discoverability Trigger */}
            <button
              id="btn-open-seo-top"
              onClick={openSEOInspector}
              className="hidden md:flex items-center gap-1 bg-white hover:bg-[#EAE4DC] text-[#5A5A40] border border-[#E5E0D8] px-2.5 py-1 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer"
              title="View Dynamic SEO & Meta Tags"
            >
              <Globe className="w-3 h-3 text-[#5A5A40]" />
              <span>SEO Meta</span>
            </button>

            {/* Language Switcher */}
            <div id="language-switcher-group" className="flex items-center bg-[#EAE4DC] rounded-full p-0.5 border border-[#E5E0D8]">
              <button
                id="btn-lang-en"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-[#5A5A40] text-white shadow-xs'
                    : 'text-[#5A5A40] hover:text-[#2C2A26]'
                }`}
              >
                EN
              </button>
              <button
                id="btn-lang-ta"
                onClick={() => setLanguage('ta')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                  language === 'ta'
                    ? 'bg-[#5A5A40] text-white shadow-xs'
                    : 'text-[#5A5A40] hover:text-[#2C2A26]'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Admin Dashboard Trigger */}
            <button
              id="btn-admin-portal-login"
              onClick={openAdminModal}
              className="flex items-center gap-1.5 text-[#706B63] hover:text-[#2C2A26] hover:bg-white/80 px-2 py-1 rounded-lg transition-colors text-xs font-medium"
              title="School Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span className="hidden sm:inline">{t.adminLogin}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        id="primary-navigation"
        className={`w-full transition-all duration-200 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E0D8] py-2.5' 
            : 'bg-white border-b border-[#E5E0D8] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo & School Name */}
          <a id="brand-logo-link" href="#home" className="flex items-center gap-3 group">
            {/* School Crest / Emblem Icon */}
            <SchoolLogo size="md" variant="emblem" glow className="group-hover:scale-105 transition-transform" />

            {/* School Title Text */}
            <div className="flex flex-col">
              <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[#2C2A26] font-['Cinzel',serif] uppercase group-hover:text-[#5A5A40] transition-colors leading-tight">
                Holy Madonna's School
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#706B63] uppercase">
                {language === 'ta' ? 'மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி • லாலாபேட்டை' : 'Matriculation Higher Secondary • Lalapet'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#3D3A35]">
            {navLinks.slice(0, 7).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full hover:text-[#5A5A40] hover:bg-[#F5F2ED] transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* More dropdown for remaining sections */}
            <div className="relative">
              <button
                id="btn-nav-more-dropdown"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:text-[#5A5A40] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
              >
                <span>{language === 'ta' ? 'மேலும்' : 'Explore'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {dropdownOpen && (
                <div 
                  id="nav-dropdown-menu"
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute right-0 top-full mt-1 w-52 bg-white border border-[#E5E0D8] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {navLinks.slice(7).map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#3D3A35] hover:text-[#5A5A40] hover:bg-[#F5F2ED] transition-colors"
                      >
                        <Icon className="w-4 h-4 text-[#5A5A40]" />
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                  <div className="border-t border-[#E5E0D8] my-1"></div>
                  <a
                    href="#student-portal"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#5A5A40] hover:bg-[#F5F2ED] transition-colors"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>{t.navStudentPortal}</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Apply CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              id="btn-header-apply-admission"
              onClick={openAdmissionModal}
              className="bg-[#5A5A40] hover:bg-[#484833] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2"
            >
              <GraduationCap className="w-3.5 h-3.5 text-white" />
              <span>{t.applyNow}</span>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-black uppercase bg-[#FF6321] text-white rounded-full">
                26-27
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#3D3A35] hover:bg-[#F5F2ED] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-nav-drawer" className="xl:hidden bg-white border-b border-[#E5E0D8] px-4 py-4 space-y-1 text-sm animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-[#E5E0D8]">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#3D3A35] hover:text-[#5A5A40] hover:bg-[#F5F2ED] text-xs font-medium transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="#student-portal"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-xs font-semibold text-[#5A5A40]"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t.navStudentPortal}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAIAssistant();
                }}
                className="flex items-center justify-center gap-2 w-full py-2 bg-[#5A5A40]/10 border border-[#5A5A40]/20 rounded-xl text-xs font-medium text-[#5A5A40]"
              >
                <Sparkles className="w-4 h-4 text-[#FF6321]" />
                <span>{t.aiAssistantTitle}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
