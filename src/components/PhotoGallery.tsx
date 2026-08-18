import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { GalleryCategory, GalleryPhoto } from '../types';
import { safeCopyToClipboard } from '../utils/safeStorage';
import { 
  Image as ImageIcon, 
  Sparkles, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Calendar, 
  ZoomIn,
  Eye,
  Globe,
  Share2,
  Check
} from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const { 
    photos, 
    language, 
    t, 
    isPhotoModalOpen, 
    activePhoto, 
    openPhotoModal, 
    closePhotoModal, 
    nextPhoto, 
    prevPhoto,
    openSEOInspector
  } = useSchool();

  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareSection = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://holymadonnasschool.edu.in';
    const url = `${origin}/#gallery`;
    await safeCopyToClipboard(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const categories: { id: GalleryCategory; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'campus', label: t.filterCampus },
    { id: 'celebrations', label: t.filterCelebrations },
    { id: 'independence_day', label: t.filterIndependence },
    { id: 'school_mass', label: t.filterSchoolMass },
    { id: 'sports_day', label: t.filterSports },
    { id: 'cultural_events', label: t.filterCultural },
    { id: 'science_exhibition', label: t.filterScience },
    { id: 'prize_distribution', label: t.filterPrize },
    { id: 'students', label: t.filterStudents },
    { id: 'teachers', label: t.filterTeachers },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white text-[#2C2A26] relative overflow-hidden border-b border-[#E5E0D8]">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#F5F2ED] rounded-full blur-3xl pointer-events-none opacity-70" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#F5F2ED] rounded-full blur-3xl pointer-events-none opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider border border-[#5A5A40]/20">
              <ImageIcon className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>{language === 'ta' ? 'பள்ளி நினைவுகள்' : 'Visual Highlights'}</span>
            </div>

            <button
              onClick={openSEOInspector}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2ED] hover:bg-[#EAE5DC] text-[#5A5A40] text-[11px] font-semibold border border-[#D5CEC2] shadow-2xs transition-all cursor-pointer"
              title="Inspect dynamic SEO meta tags & ImageGallery structured data"
            >
              <Globe className="w-3 h-3 text-[#5A5A40]" />
              <span>{language === 'ta' ? 'கேலரி SEO & Schema' : 'Gallery SEO & Schema'}</span>
            </button>

            <button
              onClick={handleShareSection}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2ED] hover:bg-[#EAE5DC] text-[#706B63] hover:text-[#2C2A26] text-[11px] font-semibold border border-[#D5CEC2] shadow-2xs transition-all cursor-pointer"
              title="Copy canonical section link"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
              <span>{copiedLink ? (language === 'ta' ? 'நகலெடுக்கப்பட்டது' : 'Copied Link') : (language === 'ta' ? 'பகிர்' : 'Share #gallery')}</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {t.galleryHeading}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {t.gallerySubHeading}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Pills (Filter) */}
        <div id="gallery-category-filters" className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none px-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`gallery-filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#5A5A40] text-white border-[#484833] shadow-sm scale-102'
                  : 'bg-[#F5F2ED] text-[#3D3A35] border-[#E5E0D8] hover:bg-[#EAE4DC] hover:text-[#2C2A26]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div 
          id="gallery-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              id={`photo-card-${photo.id}`}
              onClick={() => openPhotoModal(photo)}
              className="group relative h-64 rounded-3xl overflow-hidden bg-[#E5E0D8] border border-[#E5E0D8] shadow-xs hover:shadow-md hover:border-[#5A5A40]/50 transition-all duration-300 cursor-pointer flex flex-col justify-end"
            >
              {/* Photo Image */}
              <img
                src={photo.imageUrl}
                alt={language === 'ta' ? photo.titleTa : photo.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A26]/90 via-[#2C2A26]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Floating Expand Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#2C2A26]/70 backdrop-blur-md flex items-center justify-center text-[#D9D3C7] opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all border border-[#3D3A35]">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Date Badge */}
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#2C2A26]/80 backdrop-blur-sm text-[10px] font-semibold text-[#D9D3C7] border border-[#3D3A35] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D9D3C7]" />
                <span>{photo.date}</span>
              </div>

              {/* Text Caption Container */}
              <div className="relative z-10 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h3 className="text-sm font-bold text-white font-['Cinzel',serif] line-clamp-2 group-hover:text-[#D9D3C7] transition-colors">
                  {language === 'ta' ? photo.titleTa : photo.title}
                </h3>
                <p className="text-[11px] text-[#E5E0D8] line-clamp-1 mt-1 opacity-90 group-hover:opacity-100">
                  {language === 'ta' ? photo.captionTa : photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Helper Note */}
        <div className="mt-8 text-center text-xs text-[#706B63] flex items-center justify-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-[#5A5A40]" />
          <span>{t.clickToEnlarge}</span>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isPhotoModalOpen && activePhoto && (
        <div 
          id="photo-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C2A26]/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={closePhotoModal}
        >
          {/* Close Button */}
          <button
            id="btn-close-photo-modal"
            onClick={closePhotoModal}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-[#2C2A26]/80 text-[#D9D3C7] hover:text-white hover:bg-[#FF6321] transition-colors border border-[#3D3A35] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Photo Button */}
          <button
            id="btn-prev-photo"
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/90 hover:bg-[#5A5A40] hover:text-white text-[#2C2A26] transition-all border border-[#E5E0D8] shadow-lg cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Photo Button */}
          <button
            id="btn-next-photo"
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/90 hover:bg-[#5A5A40] hover:text-white text-[#2C2A26] transition-all border border-[#E5E0D8] shadow-lg cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#3D3A35] shadow-2xl bg-black max-h-[75vh]">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            {/* Photo Details Banner */}
            <div className="mt-4 bg-white border border-[#E5E0D8] rounded-2xl p-5 text-center max-w-2xl w-full shadow-lg">
              <div className="flex items-center justify-center gap-2 text-xs text-[#5A5A40] font-bold uppercase tracking-wider mb-1">
                <span>{activePhoto.date}</span>
                <span>•</span>
                <span>{activePhoto.category.replace('_', ' ')}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#2C2A26] font-['Cinzel',serif]">
                {language === 'ta' ? activePhoto.titleTa : activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#706B63] mt-1">
                {language === 'ta' ? activePhoto.captionTa : activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
