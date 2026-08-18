import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { GalleryPhoto, VideoItem, NewsItem, AdmissionApplication, Language } from '../types';
import { initialGalleryPhotos, initialVideos, initialNews } from '../data/schoolData';
import { translations } from '../translations/translations';
import { safeLocalStorage, safeSessionStorage } from '../utils/safeStorage';
import { isSupabaseConfigured, supabaseService } from '../lib/supabase';

interface SchoolContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  
  // Data States
  photos: GalleryPhoto[];
  addPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  addPhotoItem: (photo: Omit<GalleryPhoto, 'id'>) => void;
  deletePhoto: (id: string) => void;
  deletePhotoItem: (id: string) => void;
  
  videos: VideoItem[];
  addVideo: (video: Omit<VideoItem, 'id'>) => void;
  addVideoItem: (video: Omit<VideoItem, 'id'>) => void;
  deleteVideo: (id: string) => void;
  deleteVideoItem: (id: string) => void;
  
  news: NewsItem[];
  addNews: (item: Omit<NewsItem, 'id'>) => void;
  addNewsItem: (item: Omit<NewsItem, 'id'>) => void;
  deleteNews: (id: string) => void;
  deleteNewsItem: (id: string) => void;
  
  applications: AdmissionApplication[];
  submitApplication: (appData: Omit<AdmissionApplication, 'id' | 'refNumber' | 'submittedAt' | 'status'>) => string;
  updateApplicationStatus: (id: string, status: AdmissionApplication['status']) => void;
  
  // Supabase Cloud sync state
  isSupabaseEnabled: boolean;
  isSyncing: boolean;
  syncWithSupabase: () => Promise<void>;
  
  // Modals & UI States
  isAdmissionModalOpen: boolean;
  openAdmissionModal: () => void;
  closeAdmissionModal: () => void;
  
  isPhotoModalOpen: boolean;
  activePhoto: GalleryPhoto | null;
  openPhotoModal: (photo: GalleryPhoto) => void;
  closePhotoModal: () => void;
  nextPhoto: () => void;
  prevPhoto: () => void;
  
  isVideoModalOpen: boolean;
  activeVideo: VideoItem | null;
  openVideoModal: (video: VideoItem) => void;
  closeVideoModal: () => void;
  
  isPrincipalModalOpen: boolean;
  openPrincipalModal: () => void;
  closePrincipalModal: () => void;
  
  isAIAssistantOpen: boolean;
  openAIAssistant: () => void;
  closeAIAssistant: () => void;
  
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  
  isSEOInspectorOpen: boolean;
  openSEOInspector: () => void;
  closeSEOInspector: () => void;
  
  isAnnouncementOpen: boolean;
  closeAnnouncement: () => void;
  flashAnnouncement: string;
  setFlashAnnouncement: (msg: string) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = safeLocalStorage.getItem('hms_lang');
    return (saved === 'ta' || saved === 'en') ? saved : 'en';
  });

  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = safeLocalStorage.getItem('hms_photos');
    if (!saved) return initialGalleryPhotos;
    try {
      return JSON.parse(saved);
    } catch {
      return initialGalleryPhotos;
    }
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = safeLocalStorage.getItem('hms_videos');
    if (!saved) return initialVideos;
    try {
      const parsed: VideoItem[] = JSON.parse(saved);
      // Ensure the updated official school video is present
      const hasOfficial = parsed.some(v => v.youtubeId === 'nWLCdVGXRSc');
      if (!hasOfficial) {
        return initialVideos;
      }
      return parsed;
    } catch {
      return initialVideos;
    }
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = safeLocalStorage.getItem('hms_news');
    if (!saved) return initialNews;
    try {
      return JSON.parse(saved);
    } catch {
      return initialNews;
    }
  });

  const [applications, setApplications] = useState<AdmissionApplication[]>(() => {
    const saved = safeLocalStorage.getItem('hms_admissions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall back to defaults
      }
    }
    return [
      {
        id: 'app-demo-1',
        refNumber: 'HMS-2026-0814',
        studentName: 'A. Joseph Daniel',
        gender: 'Male',
        dob: '2019-05-14',
        standard: 'Class I',
        parentName: 'Mr. P. Antonysamy',
        relationship: 'Father',
        mobileNumber: '+91 94432 55101',
        email: 'antonysamy.lalapet@gmail.com',
        address: '14, Church Street, Lalapet, Tamil Nadu 639105',
        previousSchool: 'Holy Angel Nursery School',
        bloodGroup: 'B+',
        hasDocuments: true,
        submittedAt: '2026-08-14 10:30 AM',
        status: 'Shortlisted'
      },
      {
        id: 'app-demo-2',
        refNumber: 'HMS-2026-0819',
        studentName: 'S. Nithya Shree',
        gender: 'Female',
        dob: '2015-11-22',
        standard: 'Class VI',
        parentName: 'Mrs. R. Sangeetha',
        relationship: 'Mother',
        mobileNumber: '+91 98421 99081',
        email: 'sangeetha.s@outlook.com',
        address: '42/B, Railway Feeder Road, Mayanur',
        previousSchool: 'Govt Model Middle School',
        bloodGroup: 'O+',
        hasDocuments: true,
        submittedAt: '2026-08-16 02:15 PM',
        status: 'Reviewing'
      }
    ];
  });

  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  
  const [isPrincipalModalOpen, setIsPrincipalModalOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isSEOInspectorOpen, setIsSEOInspectorOpen] = useState(false);
  
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(() => {
    return !safeSessionStorage.getItem('hms_announcement_dismissed');
  });

  const [flashAnnouncement, setFlashAnnouncement] = useState('🌟 Admissions Open for 2026–2027 Academic Year (Pre-KG to Std XI) • Transport available for all routes • Contact office for details!');

  const isSupabaseEnabled = isSupabaseConfigured();
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync with Supabase on mount and upon manual trigger
  const syncWithSupabase = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    setIsSyncing(true);
    try {
      const [remoteAdmissions, remoteNews, remotePhotos, remoteVideos] = await Promise.all([
        supabaseService.fetchAdmissions(),
        supabaseService.fetchNews(),
        supabaseService.fetchPhotos(),
        supabaseService.fetchVideos()
      ]);

      if (remoteAdmissions && remoteAdmissions.length > 0) {
        setApplications(remoteAdmissions);
      }
      if (remoteNews && remoteNews.length > 0) {
        setNews(remoteNews);
      }
      if (remotePhotos && remotePhotos.length > 0) {
        setPhotos(remotePhotos);
      }
      if (remoteVideos && remoteVideos.length > 0) {
        setVideos(remoteVideos);
      }
    } catch (err) {
      console.warn('Error during Supabase synchronization:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    if (isSupabaseEnabled) {
      syncWithSupabase();
    }
  }, [isSupabaseEnabled, syncWithSupabase]);

  // Sync to local storage
  useEffect(() => {
    safeLocalStorage.setItem('hms_lang', language);
  }, [language]);

  useEffect(() => {
    safeLocalStorage.setItem('hms_photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    safeLocalStorage.setItem('hms_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    safeLocalStorage.setItem('hms_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    safeLocalStorage.setItem('hms_admissions', JSON.stringify(applications));
  }, [applications]);

  const addPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newP: GalleryPhoto = {
      ...photo,
      id: `photo-${Date.now()}`
    };
    setPhotos(prev => [newP, ...prev]);
    if (isSupabaseConfigured()) {
      supabaseService.savePhoto(newP);
    }
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
    if (isSupabaseConfigured()) {
      supabaseService.deletePhoto(id);
    }
  };

  const addVideo = (vid: Omit<VideoItem, 'id'>) => {
    const newV: VideoItem = {
      ...vid,
      id: `vid-${Date.now()}`
    };
    setVideos(prev => [newV, ...prev]);
    if (isSupabaseConfigured()) {
      supabaseService.saveVideo(newV);
    }
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    if (isSupabaseConfigured()) {
      supabaseService.deleteVideo(id);
    }
  };

  const addNews = (item: Omit<NewsItem, 'id'>) => {
    const newN: NewsItem = {
      ...item,
      id: `news-${Date.now()}`
    };
    setNews(prev => [newN, ...prev]);
    if (isSupabaseConfigured()) {
      supabaseService.saveNews(newN);
    }
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
    if (isSupabaseConfigured()) {
      supabaseService.deleteNews(id);
    }
  };

  const submitApplication = (appData: Omit<AdmissionApplication, 'id' | 'refNumber' | 'submittedAt' | 'status'>): string => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const refNumber = `HMS-2026-${randomCode}`;
    const newApp: AdmissionApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      refNumber,
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'Pending'
    };
    setApplications(prev => [newApp, ...prev]);
    if (isSupabaseConfigured()) {
      supabaseService.saveAdmission(newApp);
    }
    return refNumber;
  };

  const updateApplicationStatus = (id: string, status: AdmissionApplication['status']) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
    if (isSupabaseConfigured()) {
      supabaseService.updateAdmissionStatus(id, status);
    }
  };

  const openPhotoModal = (photo: GalleryPhoto) => {
    setActivePhoto(photo);
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
    setActivePhoto(null);
  };

  const nextPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = photos.findIndex(p => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setActivePhoto(photos[nextIndex]);
  };

  const prevPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = photos.findIndex(p => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setActivePhoto(photos[prevIndex]);
  };

  const openVideoModal = (video: VideoItem) => {
    setActiveVideo(video);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setActiveVideo(null);
  };

  const closeAnnouncement = () => {
    setIsAnnouncementOpen(false);
    safeSessionStorage.setItem('hms_announcement_dismissed', 'true');
  };

  const t = translations[language];

  return (
    <SchoolContext.Provider
      value={{
        language,
        setLanguage,
        t,
        photos,
        addPhoto,
        addPhotoItem: addPhoto,
        deletePhoto,
        deletePhotoItem: deletePhoto,
        videos,
        addVideo,
        addVideoItem: addVideo,
        deleteVideo,
        deleteVideoItem: deleteVideo,
        news,
        addNews,
        addNewsItem: addNews,
        deleteNews,
        deleteNewsItem: deleteNews,
        applications,
        submitApplication,
        updateApplicationStatus,
        isSupabaseEnabled,
        isSyncing,
        syncWithSupabase,
        isAdmissionModalOpen,
        openAdmissionModal: () => setIsAdmissionModalOpen(true),
        closeAdmissionModal: () => setIsAdmissionModalOpen(false),
        isPhotoModalOpen,
        activePhoto,
        openPhotoModal,
        closePhotoModal,
        nextPhoto,
        prevPhoto,
        isVideoModalOpen,
        activeVideo,
        openVideoModal,
        closeVideoModal,
        isPrincipalModalOpen,
        openPrincipalModal: () => setIsPrincipalModalOpen(true),
        closePrincipalModal: () => setIsPrincipalModalOpen(false),
        isAIAssistantOpen,
        openAIAssistant: () => setIsAIAssistantOpen(true),
        closeAIAssistant: () => setIsAIAssistantOpen(false),
        isAdminModalOpen,
        openAdminModal: () => setIsAdminModalOpen(true),
        closeAdminModal: () => setIsAdminModalOpen(false),
        isSEOInspectorOpen,
        openSEOInspector: () => setIsSEOInspectorOpen(true),
        closeSEOInspector: () => setIsSEOInspectorOpen(false),
        isAnnouncementOpen,
        closeAnnouncement,
        flashAnnouncement,
        setFlashAnnouncement
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
