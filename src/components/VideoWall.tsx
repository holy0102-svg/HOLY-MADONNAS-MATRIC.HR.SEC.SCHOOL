import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { VideoItem } from '../types';
import { 
  Play, 
  Tv, 
  ExternalLink, 
  Sparkles, 
  Eye, 
  Clock, 
  X,
  Youtube,
  Share2,
  ThumbsUp
} from 'lucide-react';

export const VideoWall: React.FC = () => {
  const { 
    videos, 
    language, 
    t, 
    isVideoModalOpen, 
    activeVideo, 
    openVideoModal, 
    closeVideoModal 
  } = useSchool();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t.videoCategories.all },
    { id: 'Independence Day', label: t.videoCategories.independence },
    { id: 'School Mass', label: t.videoCategories.mass },
    { id: 'Student Dance', label: t.videoCategories.dance },
    { id: 'Drill Performance', label: t.videoCategories.drill },
    { id: 'Mime Performance', label: t.videoCategories.mime },
    { id: 'School Events', label: t.videoCategories.events }
  ];

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(v => v.category === selectedCategory);

  return (
    <section id="videos" className="py-16 sm:py-24 bg-[#FCFAF7] text-[#2C2A26] relative overflow-hidden border-b border-[#E5E0D8]">
      
      {/* Glow Effects */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#F5F2ED] rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#F5F2ED] rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-3 border border-[#5A5A40]/20">
            <Tv className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>{language === 'ta' ? 'காணொளி தொகுப்பு' : 'Live Campus Telecast'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {t.videoHeading}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {t.videoSubHeading}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* YouTube Subscribe Banner as requested */}
        <div 
          id="youtube-subscribe-banner"
          className="mb-10 bg-[#5A5A40] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left border border-[#484833]"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#FF0000] shrink-0 shadow-md">
              <Youtube className="w-8 h-8 fill-[#FF0000]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold tracking-wider mb-1">
                <span>@holymadonnas</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase">Official Channel</span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-white font-['Cinzel',serif] tracking-wide">
                {t.subscribeYouTube}
              </h3>
              <p className="text-xs text-white/80 mt-0.5 font-normal max-w-xl">
                {language === 'ta'
                  ? 'ஹோலி மடோனாஸ் பள்ளியின் அதிகாரப்பூர்வ யூடியூப் சேனல் (@holymadonnas) - கலை நிகழ்ச்சிகள், சுதந்திர தின விழா மற்றும் பிரார்த்தனை நிகழ்வுகளை உடனுக்குடன் காணுங்கள்'
                  : 'Watch school celebrations, annual day specials, drills, mass ceremonies & student talent shows on our official @holymadonnas YouTube channel'}
              </p>
            </div>
          </div>

          <a
            id="btn-subscribe-yt-channel"
            href="https://youtube.com/@holymadonnas?si=taqDqAepGtJbZYV2"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#FF0000] hover:bg-[#D90000] text-white font-bold rounded-full text-xs sm:text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2 shrink-0 cursor-pointer uppercase tracking-wider"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>{language === 'ta' ? 'யூடியூப் சேனல் செல்ல' : 'Watch on YouTube'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </a>
        </div>

        {/* Video Category Filter Buttons */}
        <div id="video-category-filter-buttons" className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`video-filter-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#5A5A40] text-white border-[#484833] shadow-sm scale-102'
                  : 'bg-white text-[#3D3A35] border-[#E5E0D8] hover:bg-[#F5F2ED] hover:text-[#2C2A26]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video Cards Grid */}
        <div id="video-cards-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              id={`video-card-${video.id}`}
              onClick={() => openVideoModal(video)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E5E0D8] hover:border-[#5A5A40]/50 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Thumbnail Container with Play Icon */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#2C2A26]">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#2C2A26]/30 group-hover:bg-[#2C2A26]/15 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-[#FF0000] group-hover:bg-[#D90000] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-0.5 text-white" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-[#2C2A26]/80 text-[10px] font-bold text-white flex items-center gap-1 backdrop-blur-xs">
                  <Clock className="w-3 h-3 text-[#D9D3C7]" />
                  <span>{video.duration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#5A5A40] text-[10px] font-bold text-white uppercase shadow-xs">
                  {language === 'ta' ? video.categoryTa : video.category}
                </div>
              </div>

              {/* Video Info Body */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#2C2A26] font-['Cinzel',serif] group-hover:text-[#5A5A40] transition-colors line-clamp-2 leading-snug">
                    {language === 'ta' ? video.titleTa : video.title}
                  </h3>
                </div>

                <div className="mt-3 pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-[#8A847C]">
                  <span>{video.date}</span>
                  <span className="flex items-center gap-1 text-[#5A5A40] font-semibold">
                    <Eye className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>{video.views || 'Official Video'}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Player Modal */}
      {isVideoModalOpen && activeVideo && (
        <div 
          id="video-player-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C2A26]/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={closeVideoModal}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden border border-[#E5E0D8] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-[#F5F2ED] border-b border-[#E5E0D8]">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-[#FF6321]" />
                <h3 className="font-bold text-[#2C2A26] text-sm sm:text-base truncate max-w-md">
                  {language === 'ta' ? activeVideo.titleTa : activeVideo.title}
                </h3>
              </div>
              <button
                id="btn-close-video-modal"
                onClick={closeVideoModal}
                className="p-1.5 rounded-full bg-white text-[#706B63] hover:text-[#2C2A26] border border-[#E5E0D8] transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded 16:9 Video Frame */}
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-[#F5F2ED] flex flex-wrap items-center justify-between gap-3 text-xs text-[#706B63]">
              <div>
                <span className="font-semibold text-[#2C2A26]">{activeVideo.category}</span>
                <span className="mx-2">•</span>
                <span>{activeVideo.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://youtube.com/@holymadonnas?si=taqDqAepGtJbZYV2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-white hover:bg-[#EAE4DC] text-[#2C2A26] border border-[#E5E0D8] font-bold px-3.5 py-2 rounded-full transition-colors uppercase tracking-wider text-[11px]"
                >
                  <Youtube className="w-3.5 h-3.5 fill-[#FF0000] text-[#FF0000]" />
                  <span>@holymadonnas Channel</span>
                </a>
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#FF0000] hover:bg-[#D90000] text-white font-bold px-4 py-2 rounded-full transition-colors uppercase tracking-wider text-[11px] shadow-sm"
                >
                  <span>{t.watchOnYouTube}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
