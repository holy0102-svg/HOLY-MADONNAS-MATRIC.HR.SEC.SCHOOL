import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { NewsItem } from '../types';
import { safeCopyToClipboard } from '../utils/safeStorage';
import { 
  Newspaper, 
  Bell, 
  Calendar, 
  Download, 
  AlertTriangle, 
  Sparkles, 
  ChevronRight, 
  FileText,
  Search,
  CheckCircle2,
  Globe,
  Share2,
  Check
} from 'lucide-react';

export const NewsNoticeBoard: React.FC = () => {
  const { news, language, t, openAdmissionModal, openSEOInspector } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareSection = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://holymadonnasschool.edu.in';
    const url = `${origin}/#news`;
    await safeCopyToClipboard(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const categories = [
    { id: 'all', label: language === 'ta' ? 'அனைத்து செய்திகள்' : 'All Updates' },
    { id: 'admissions', label: language === 'ta' ? 'சேர்க்கை' : 'Admissions' },
    { id: 'events', label: language === 'ta' ? 'நிகழ்வுகள்' : 'Events' },
    { id: 'academics', label: language === 'ta' ? 'கல்வி & தேர்வுகள்' : 'Academics' },
    { id: 'circular', label: language === 'ta' ? 'சுற்றறிக்கைகள்' : 'Official Circulars' }
  ];

  const filteredNews = news.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       item.titleTa.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && titleMatch;
  });

  return (
    <section id="news" className="py-16 sm:py-24 bg-white border-b border-[#E5E0D8] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider border border-[#5A5A40]/20">
              <Bell className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>{language === 'ta' ? 'அறிவிப்பு பலகை' : 'Notice Board & Press'}</span>
            </div>

            <button
              onClick={openSEOInspector}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2ED] hover:bg-[#EAE5DC] text-[#5A5A40] text-[11px] font-semibold border border-[#D5CEC2] shadow-2xs transition-all cursor-pointer"
              title="Inspect dynamic SEO meta tags & NewsArticle structured data"
            >
              <Globe className="w-3 h-3 text-[#5A5A40]" />
              <span>{language === 'ta' ? 'செய்தி SEO & Schema' : 'News SEO & Schema'}</span>
            </button>

            <button
              onClick={handleShareSection}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2ED] hover:bg-[#EAE5DC] text-[#706B63] hover:text-[#2C2A26] text-[11px] font-semibold border border-[#D5CEC2] shadow-2xs transition-all cursor-pointer"
              title="Copy canonical section link"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
              <span>{copiedLink ? (language === 'ta' ? 'நகலெடுக்கப்பட்டது' : 'Copied Link') : (language === 'ta' ? 'பகிர்' : 'Share #news')}</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {t.newsHeading}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {t.newsSubHeading}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* Live News Marquee Ticker */}
        <div id="live-news-ticker" className="mb-10 bg-[#F5F2ED] rounded-3xl p-3.5 shadow-xs text-[#2C2A26] flex items-center gap-3 border border-[#E5E0D8] overflow-hidden">
          <div className="bg-[#FF6321] text-white font-bold px-3 py-1 rounded-full text-xs shrink-0 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>{language === 'ta' ? 'முக்கிய செய்தி' : 'FLASH NEWS'}</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="inline-block animate-marquee text-xs sm:text-sm text-[#3D3A35] font-medium">
              📢 <strong className="text-[#5A5A40]">Admissions 2026–27:</strong> Online applications open for Pre-KG to Std XI. • 
              🇮🇳 <strong className="text-[#5A5A40]">Independence Day:</strong> Grand 79th celebration successfully completed. • 
              🏆 <strong className="text-[#5A5A40]">Board Results:</strong> 100% pass percentage with 14 centum scores! • 
              📅 <strong className="text-[#5A5A40]">Exam Circular:</strong> First Mid-Term begins August 24, 2026.
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`news-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-[#5A5A40] text-white border-[#484833] shadow-xs'
                    : 'bg-[#F5F2ED] text-[#3D3A35] border-[#E5E0D8] hover:bg-[#EAE4DC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#8A847C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'ta' ? 'செய்திகளைத் தேடு...' : 'Search circulars...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-full border border-[#E5E0D8] bg-white text-xs text-[#2C2A26] outline-none focus:border-[#5A5A40] focus:ring-1 focus:ring-[#5A5A40]"
            />
          </div>
        </div>

        {/* News Cards Grid */}
        <div id="news-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              id={`news-card-${item.id}`}
              onClick={() => setSelectedNews(item)}
              className="bg-[#F5F2ED] rounded-3xl p-6 border border-[#E5E0D8] shadow-xs hover:shadow-md hover:border-[#5A5A40]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header row: category + date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    item.isUrgent
                      ? 'bg-[#FF6321]/15 text-[#FF6321] border border-[#FF6321]/30'
                      : 'bg-white text-[#5A5A40] border border-[#E5E0D8]'
                  }`}>
                    {item.isUrgent ? t.urgentBadge : item.category}
                  </span>
                  
                  <div className="flex items-center gap-1 text-[#8A847C] text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#2C2A26] font-['Cinzel',serif] mb-2 leading-snug hover:text-[#5A5A40] transition-colors">
                  {language === 'ta' ? item.titleTa : item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#706B63] line-clamp-3 leading-relaxed font-normal">
                  {language === 'ta' ? item.descriptionTa : item.description}
                </p>
              </div>

              {/* Bottom footer with attachment indicator */}
              <div className="mt-4 pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-xs">
                {item.fileName ? (
                  <span className="flex items-center gap-1 text-[#5A5A40] font-semibold truncate max-w-[180px]">
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.fileName}</span>
                  </span>
                ) : (
                  <span className="text-[#8A847C] text-[11px]">Notice Circular</span>
                )}

                <span className="text-[#5A5A40] font-bold flex items-center gap-0.5">
                  <span>{language === 'ta' ? 'படிக்க' : 'Read'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div
          id="news-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2A26]/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5E0D8] text-[#2C2A26]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 mb-4">
              <span className="text-xs font-bold text-[#5A5A40] uppercase bg-[#F5F2ED] px-3 py-0.5 rounded-full border border-[#E5E0D8]">
                {selectedNews.category}
              </span>
              <span className="text-xs text-[#8A847C] font-medium">{selectedNews.date}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-['Cinzel',serif] text-[#2C2A26] mb-3">
              {language === 'ta' ? selectedNews.titleTa : selectedNews.title}
            </h3>

            <p className="text-sm text-[#3D3A35] leading-relaxed">
              {language === 'ta' ? selectedNews.descriptionTa : selectedNews.description}
            </p>

            {selectedNews.fileName && (
              <div className="mt-4 p-4 bg-[#F5F2ED] border border-[#E5E0D8] rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2C2A26]">
                  <FileText className="w-4 h-4 text-[#5A5A40]" />
                  <span>{selectedNews.fileName}</span>
                </div>
                <button
                  onClick={() => alert(`Simulated Download: ${selectedNews.fileName}`)}
                  className="px-4 py-1.5 bg-[#5A5A40] text-white font-bold rounded-full text-xs flex items-center gap-1 hover:bg-[#484833] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.downloadPdf}</span>
                </button>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[#E5E0D8] flex justify-end gap-3">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-5 py-2 bg-[#F5F2ED] hover:bg-[#EAE4DC] text-[#3D3A35] font-semibold rounded-full text-xs uppercase"
              >
                {t.closeModal}
              </button>
              {selectedNews.category === 'admissions' && (
                <button
                  onClick={() => {
                    setSelectedNews(null);
                    openAdmissionModal();
                  }}
                  className="px-5 py-2 bg-[#FF6321] hover:bg-[#E25213] text-white font-bold rounded-full text-xs uppercase shadow-sm"
                >
                  {t.applyNow}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
