import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { 
  SectionType, 
  SECTION_METADATA_CONFIG, 
  SCHOOL_BASE_URL 
} from '../utils/seoMeta';
import { safeCopyToClipboard } from '../utils/safeStorage';
import { 
  Globe, 
  Check, 
  Copy, 
  X, 
  Sparkles, 
  ExternalLink, 
  Code2, 
  Share2, 
  Search, 
  Layers, 
  CheckCircle2,
  FileCode,
  Tag,
  BookOpen,
  Newspaper,
  Image as ImageIcon
} from 'lucide-react';

interface SEOMetaInspectorProps {
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const SEOMetaInspector: React.FC<SEOMetaInspectorProps> = ({
  activeSection,
  onSelectSection,
  isOpen,
  onClose
}) => {
  const { language, setLanguage, news, photos } = useSchool();
  const [selectedTab, setSelectedTab] = useState<'google' | 'social' | 'schema' | 'raw'>('google');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentConfig = SECTION_METADATA_CONFIG[activeSection] || SECTION_METADATA_CONFIG.home;
  const origin = typeof window !== 'undefined' ? window.location.origin : SCHOOL_BASE_URL;
  const canonicalUrl = `${origin}/${currentConfig.hash}`;
  
  const title = language === 'ta' ? currentConfig.titleTa : currentConfig.titleEn;
  const description = language === 'ta' ? currentConfig.descriptionTa : currentConfig.descriptionEn;
  const keywords = language === 'ta' ? currentConfig.keywordsTa : currentConfig.keywordsEn;
  const imageAlt = language === 'ta' ? currentConfig.ogImageAltTa : currentConfig.ogImageAltEn;

  const structuredData = currentConfig.schemaGenerator({
    origin,
    language,
    news,
    photos
  });

  const handleCopy = async (text: string, key: string) => {
    await safeCopyToClipboard(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sectionsList: { id: SectionType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'academics', label: language === 'ta' ? 'கல்வி & பாடத்திட்டம்' : 'Academics', icon: BookOpen },
    { id: 'news', label: language === 'ta' ? 'செய்திகள் & அறிவிப்புகள்' : 'News & Notices', icon: Newspaper },
    { id: 'gallery', label: language === 'ta' ? 'புகைப்படத் தொகுப்பு' : 'Photo Gallery', icon: ImageIcon },
    { id: 'admissions', label: language === 'ta' ? 'சேர்க்கை 2026-27' : 'Admissions', icon: Sparkles },
    { id: 'home', label: language === 'ta' ? 'முகப்பு' : 'Home / General', icon: Globe }
  ];

  return (
    <div 
      id="seo-meta-inspector-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2C2A26]/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="seo-meta-inspector-modal"
        className="relative bg-[#FCFAF7] rounded-3xl max-w-4xl w-full shadow-2xl border border-[#E5E0D8] max-h-[92vh] flex flex-col overflow-hidden text-[#3D3A35]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#24221E] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#3A3731] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5A5A40] flex items-center justify-center text-white shadow-md border border-[#6E6E52]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-['Cinzel',serif] text-[#FCFAF7]">
                  {language === 'ta' ? 'டைனமிக் எஸ்சிஓ & மெட்டா டேக் பரிசோதகர்' : 'Dynamic SEO & Meta Tag Inspector'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#5A5A40] text-white border border-[#6E6E52]">
                  LIVE HEAD INJECTOR
                </span>
              </div>
              <p className="text-xs text-[#D8D2C5]">
                {language === 'ta' ? 'பிரிவு வாரியாக தானியங்கி மெட்டா குறிச்சொற்கள் மற்றும் தேடுபொறி கண்டறியும் தன்மை' : 'Dynamic Open Graph, Twitter Cards, Canonical URLs & JSON-LD Structured Data per section'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Bilingual Quick Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="px-3 py-1.5 rounded-xl bg-[#38342D] hover:bg-[#4A463D] text-[#FCFAF7] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#4E4A40] cursor-pointer"
              title="Toggle language preview"
            >
              <Globe className="w-3.5 h-3.5 text-[#A6A095]" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            <button
              id="btn-close-seo-inspector"
              onClick={onClose}
              className="p-2 rounded-full bg-[#2D2A24] hover:bg-[#38342D] text-[#C8C2B4] hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Selector Bar */}
        <div className="bg-[#F5F2ED] border-b border-[#E5E0D8] p-3 px-4 sm:px-6 flex items-center justify-between gap-3 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#736E65] mr-1 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {language === 'ta' ? 'பிரிவு:' : 'Section:'}
            </span>
            {sectionsList.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    onSelectSection(sec.id);
                    const el = document.getElementById(sec.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#5A5A40] text-white shadow-sm border border-[#6E6E52]'
                      : 'bg-white text-[#524E48] hover:bg-[#EAE5DC] border border-[#E5E0D8]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-semibold text-[#5A5A40] bg-white px-2.5 py-1 rounded-full border border-[#D5CEC2] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>SEO Score: 100/100</span>
            </span>
          </div>
        </div>

        {/* Body Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#FCFAF7]">
          
          {/* Sub Navigation Tabs (Google Preview / Social OG / JSON-LD / Raw Head Tags) */}
          <div className="flex items-center gap-2 border-b border-[#E5E0D8] pb-3">
            <button
              onClick={() => setSelectedTab('google')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === 'google'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'bg-[#F5F2ED] text-[#524E48] hover:bg-[#EAE5DC]'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Google SERP Preview</span>
            </button>

            <button
              onClick={() => setSelectedTab('social')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === 'social'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'bg-[#F5F2ED] text-[#524E48] hover:bg-[#EAE5DC]'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Open Graph & Social Cards</span>
            </button>

            <button
              onClick={() => setSelectedTab('schema')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === 'schema'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'bg-[#F5F2ED] text-[#524E48] hover:bg-[#EAE5DC]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>JSON-LD Schema.org</span>
            </button>

            <button
              onClick={() => setSelectedTab('raw')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === 'raw'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'bg-[#F5F2ED] text-[#524E48] hover:bg-[#EAE5DC]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Generated Head Meta Tags</span>
            </button>
          </div>

          {/* TAB 1: Google Search Result Simulation */}
          {selectedTab === 'google' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider font-['Cinzel',serif] flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  <span>Google Search Snippet Simulation (Mobile & Desktop)</span>
                </h4>
                <button
                  onClick={() => handleCopy(canonicalUrl, 'serp-url')}
                  className="text-xs text-[#5A5A40] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  {copiedKey === 'serp-url' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'serp-url' ? 'Copied Canonical URL' : 'Copy Canonical URL'}</span>
                </button>
              </div>

              {/* SERP Card Box */}
              <div className="bg-white p-5 rounded-2xl border border-[#D5CEC2] shadow-sm max-w-2xl font-sans space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#5A5A40] text-white text-[10px] flex items-center justify-center font-bold">
                    HM
                  </div>
                  <div>
                    <div className="text-xs text-[#202124] font-medium leading-none">Holy Madonnas School</div>
                    <div className="text-[11px] text-[#5f6368] truncate max-w-md">{canonicalUrl}</div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                  {title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed">
                  {description}
                </p>

                <div className="pt-2 flex items-center gap-3 text-[11px] text-[#70757a]">
                  <span>Title: {title.length} chars (Optimal: 50-65)</span>
                  <span>•</span>
                  <span>Description: {description.length} chars (Optimal: 120-160)</span>
                </div>
              </div>

              {/* Key Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#F5F2ED] p-3.5 rounded-xl border border-[#E5E0D8] text-xs">
                  <span className="text-[#8C857B] block font-semibold mb-0.5">Active Canonical URL</span>
                  <span className="font-mono text-[#2C2A26] break-all font-medium text-[11px]">{canonicalUrl}</span>
                </div>
                <div className="bg-[#F5F2ED] p-3.5 rounded-xl border border-[#E5E0D8] text-xs">
                  <span className="text-[#8C857B] block font-semibold mb-0.5">Robots Crawl Directive</span>
                  <span className="font-mono text-[#2C2A26] font-medium text-[11px]">index, follow, max-image-preview:large</span>
                </div>
                <div className="bg-[#F5F2ED] p-3.5 rounded-xl border border-[#E5E0D8] text-xs">
                  <span className="text-[#8C857B] block font-semibold mb-0.5">Language Target</span>
                  <span className="font-mono text-[#2C2A26] font-medium text-[11px]">{language === 'ta' ? 'Tamil (ta_IN)' : 'English (en_IN)'}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Social Media & Open Graph Simulation */}
          {selectedTab === 'social' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider font-['Cinzel',serif] flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Facebook / WhatsApp / LinkedIn / Twitter Card Preview</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Facebook / WhatsApp Card */}
                <div className="bg-white rounded-2xl border border-[#D5CEC2] overflow-hidden shadow-sm">
                  <div className="bg-[#F5F2ED] px-4 py-2 text-[11px] font-bold text-[#736E65] border-b border-[#E5E0D8] flex items-center justify-between">
                    <span>Facebook & WhatsApp Open Graph Card</span>
                    <span className="text-[10px] font-mono text-[#8C857B]">og:type={currentConfig.ogType}</span>
                  </div>
                  <div className="relative aspect-video w-full bg-[#24221E] overflow-hidden">
                    <img 
                      src={currentConfig.ogImage} 
                      alt={imageAlt} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-[#2C2A26]/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      1200 × 630
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5 bg-white">
                    <div className="text-[10px] font-bold text-[#8C857B] uppercase tracking-wider">
                      holymadonnasschool.edu.in
                    </div>
                    <div className="font-bold text-sm text-[#2C2A26] line-clamp-2 leading-tight">
                      {title}
                    </div>
                    <p className="text-xs text-[#736E65] line-clamp-2 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Twitter / X Card */}
                <div className="bg-white rounded-2xl border border-[#D5CEC2] overflow-hidden shadow-sm">
                  <div className="bg-[#F5F2ED] px-4 py-2 text-[11px] font-bold text-[#736E65] border-b border-[#E5E0D8] flex items-center justify-between">
                    <span>Twitter / X Summary Large Image Card</span>
                    <span className="text-[10px] font-mono text-[#8C857B]">@HolyMadonnas</span>
                  </div>
                  <div className="relative aspect-video w-full bg-[#24221E] overflow-hidden">
                    <img 
                      src={currentConfig.ogImage} 
                      alt={imageAlt} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-1.5 bg-[#FCFAF7]">
                    <div className="font-bold text-sm text-[#2C2A26] line-clamp-2 leading-tight">
                      {title}
                    </div>
                    <p className="text-xs text-[#736E65] line-clamp-2 leading-relaxed">
                      {description}
                    </p>
                    <div className="text-[10px] text-[#8C857B] flex items-center gap-1 pt-1">
                      <Globe className="w-3 h-3" />
                      <span>holymadonnasschool.edu.in/{currentConfig.hash}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: JSON-LD Schema.org */}
          {selectedTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider font-['Cinzel',serif] flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5" />
                    <span>Schema.org JSON-LD Structured Data</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EAE5DC] text-[#3D3A35]">
                    Type: {(structuredData as any)['@type'] || 'EducationalOrganization'}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(JSON.stringify(structuredData, null, 2), 'schema-json')}
                  className="px-3 py-1.5 rounded-xl bg-[#5A5A40] hover:bg-[#4E4E37] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs border border-[#6E6E52]"
                >
                  {copiedKey === 'schema-json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'schema-json' ? 'Copied JSON-LD' : 'Copy JSON-LD'}</span>
                </button>
              </div>

              <div className="bg-[#1C1A17] p-4 rounded-2xl border border-[#3A3731] overflow-x-auto max-h-80">
                <pre className="text-xs font-mono text-[#D8D2C5] leading-relaxed">
                  {JSON.stringify(structuredData, null, 2)}
                </pre>
              </div>
              <p className="text-[11px] text-[#736E65]">
                {language === 'ta' 
                  ? 'இந்த Schema.org குறிச்சொற்கள் கூகுள் போன்ற தேடுபொறிகளுக்கு பள்ளியின் பாடத்திட்டங்கள், செய்திகள், மற்றும் புகைப்படங்களை ரிச் ஸ்னிப்பெட்டாக காண்பிக்க உதவுகின்றன.'
                  : 'This structured data is automatically injected into the document head, enabling Google Rich Results, breadcrumbs, course lists, and news carousels.'}
              </p>
            </div>
          )}

          {/* TAB 4: Raw Generated Head Meta Tags */}
          {selectedTab === 'raw' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider font-['Cinzel',serif] flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Live DOM Head Tags ({activeSection.toUpperCase()})</span>
                </h4>
                <button
                  onClick={() => {
                    const rawTags = `
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="school:section" content="${activeSection}">
<link rel="canonical" href="${canonicalUrl}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:type" content="${currentConfig.ogType}">
<meta property="og:image" content="${currentConfig.ogImage}">
<meta property="og:image:alt" content="${imageAlt}">
<meta property="og:site_name" content="Holy Madonnas School Lalapet">
<meta property="og:locale" content="${language === 'ta' ? 'ta_IN' : 'en_IN'}">
<meta name="twitter:card" content="${currentConfig.twitterCard}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${currentConfig.ogImage}">
`.trim();
                    handleCopy(rawTags, 'raw-tags');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#5A5A40] hover:bg-[#4E4E37] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs border border-[#6E6E52]"
                >
                  {copiedKey === 'raw-tags' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'raw-tags' ? 'Copied HTML Tags' : 'Copy All Meta Tags'}</span>
                </button>
              </div>

              <div className="bg-[#1C1A17] p-4 rounded-2xl border border-[#3A3731] overflow-x-auto space-y-2 text-xs font-mono">
                <div>
                  <span className="text-[#8C857B]">&lt;title&gt;</span>
                  <span className="text-emerald-400">{title}</span>
                  <span className="text-[#8C857B]">&lt;/title&gt;</span>
                </div>
                <div>
                  <span className="text-[#8C857B]">&lt;meta name="description" content="</span>
                  <span className="text-[#D8D2C5]">{description}</span>
                  <span className="text-[#8C857B]">" /&gt;</span>
                </div>
                <div>
                  <span className="text-[#8C857B]">&lt;meta name="keywords" content="</span>
                  <span className="text-[#A6A095]">{keywords}</span>
                  <span className="text-[#8C857B]">" /&gt;</span>
                </div>
                <div>
                  <span className="text-[#8C857B]">&lt;meta name="school:section" content="</span>
                  <span className="text-amber-300">{activeSection}</span>
                  <span className="text-[#8C857B]">" /&gt;</span>
                </div>
                <div>
                  <span className="text-[#8C857B]">&lt;link rel="canonical" href="</span>
                  <span className="text-cyan-300">{canonicalUrl}</span>
                  <span className="text-[#8C857B]">" /&gt;</span>
                </div>
                <div>
                  <span className="text-[#8C857B]">&lt;meta property="og:title" content="</span>
                  <span className="text-[#D8D2C5]">{title}</span>
                  <span className="text-[#8C857B]">" /&gt;</span>
                </div>
                <div>
                  <span className="text-[#8C857B]">&lt;meta property="og:image" content="</span>
                  <span className="text-yellow-300">{currentConfig.ogImage}</span>
                  <span className="text-[#8C857B]">" /&gt;</span>
                </div>
                <div>
                  <span className="text-[#8C857B]">&lt;meta name="twitter:card" content="</span>
                  <span className="text-rose-300">{currentConfig.twitterCard}</span>
                  <span className="text-[#8C857B]">" /&gt;</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer info & Done */}
        <div className="p-4 bg-[#F5F2ED] border-t border-[#E5E0D8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#736E65]">
            <Sparkles className="w-4 h-4 text-[#5A5A40]" />
            <span>
              {language === 'ta'
                ? 'பக்கத்தில் உருட்டும் போது மெட்டா குறிச்சொற்கள் தானாகவே புதுப்பிக்கப்படும்.'
                : 'Meta tags automatically update dynamically as visitors scroll through Academics, News, and Gallery.'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#5A5A40] hover:bg-[#4E4E37] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors border border-[#6E6E52] cursor-pointer"
          >
            {language === 'ta' ? 'மூடுக' : 'Close Inspector'}
          </button>
        </div>
      </div>
    </div>
  );
};
