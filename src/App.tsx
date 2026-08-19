import React, { useState } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PrincipalMessage } from './components/PrincipalMessage';
import { AdmissionsHub } from './components/AdmissionsHub';
import { AcademicsSection } from './components/AcademicsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { VideoWall } from './components/VideoWall';
import { PhotoGallery } from './components/PhotoGallery';
import { AchievementsSection } from './components/AchievementsSection';
import { NewsNoticeBoard } from './components/NewsNoticeBoard';
import { Testimonials } from './components/Testimonials';
import { StudentParentPortal } from './components/StudentParentPortal';
import { ContactSection } from './components/ContactSection';
import { FloatingActions } from './components/FloatingActions';
import { AnnouncementPopup } from './components/AnnouncementPopup';
import { AdmissionFormModal } from './components/AdmissionFormModal';
import { AdminPortal } from './components/AdminPortal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { SupabaseSqlEditor } from './components/SupabaseSqlEditor';
import { Footer } from './components/Footer';
import { DynamicSEOHead } from './components/DynamicSEOHead';
import { SEOMetaInspector } from './components/SEOMetaInspector';
import { SectionType } from './utils/seoMeta';

const SchoolApp: React.FC = () => {
  const { 
    isSEOInspectorOpen, 
    closeSEOInspector, 
    isAIAssistantOpen, 
    closeAIAssistant, 
    openAIAssistant,
    isSqlEditorOpen,
    closeSqlEditor
  } = useSchool();
  const [activeSection, setActiveSection] = useState<SectionType>('home');

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#3D3A35] font-sans selection:bg-[#5A5A40] selection:text-white">
      {/* Dynamic SEO Meta Tag & Structured Data Injector */}
      <DynamicSEOHead onSectionChange={setActiveSection} />

      {/* 1. Header (Sticky navigation, language switcher, quick contacts) */}
      <Header onOpenAI={openAIAssistant} />

      <main>
        {/* 2. Hero / Main Banner */}
        <Hero />

        {/* 3. Admissions 2026-27 Hub & Flowchart */}
        <AdmissionsHub />

        {/* 4. Welcome From the Principal */}
        <PrincipalMessage />

        {/* 5. Academics (Pre-KG to Std XII streams) */}
        <AcademicsSection />

        {/* 6. School Facilities & Amenities */}
        <FacilitiesSection />

        {/* 7. YouTube Video Wall */}
        <VideoWall />

        {/* 8. Live Photo Gallery with Lightbox */}
        <PhotoGallery />

        {/* 9. Achievements & Toppers Hall of Fame */}
        <AchievementsSection />

        {/* 10. School News, Notices & Press Releases */}
        <NewsNoticeBoard />

        {/* 11. Parent Testimonials & Reviews */}
        <Testimonials />

        {/* 14. Student & Parent Services (Timetables, Fees, Bus Routes, Downloads) */}
        <StudentParentPortal />

        {/* 15. Contact & Embedded Google Map */}
        <ContactSection />
      </main>

      {/* 16. Rich Footer */}
      <Footer />

      {/* 17. Floating Contact & Action Buttons */}
      <FloatingActions onOpenAI={openAIAssistant} />

      {/* 18. Admissions Open Initial Announcement Popup */}
      <AnnouncementPopup />

      {/* 19. Interactive Online Admission Application Form Modal */}
      <AdmissionFormModal />

      {/* 20. Admin Management Dashboard Portal */}
      <AdminPortal />

      {/* 21. Madonnas AI Bilingual School Assistant */}
      <AIAssistantModal 
        isOpen={isAIAssistantOpen} 
        onClose={closeAIAssistant} 
      />

      {/* 22. Dynamic SEO & Meta Tag Inspector Modal */}
      <SEOMetaInspector
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        isOpen={isSEOInspectorOpen}
        onClose={closeSEOInspector}
      />

      {/* 23. Direct Supabase Cloud SQL Editor & Studio Modal */}
      {isSqlEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-6xl h-[90vh] bg-[#121210] rounded-3xl border border-[#2B2925] shadow-2xl overflow-hidden flex flex-col">
            <SupabaseSqlEditor onClose={closeSqlEditor} />
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <SchoolApp />
    </SchoolProvider>
  );
}
