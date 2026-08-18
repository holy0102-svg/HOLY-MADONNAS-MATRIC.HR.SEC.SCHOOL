import { AdmissionApplication, GalleryPhoto, NewsItem, VideoItem } from '../types';

// Supabase is explicitly disconnected as per user request
export const supabase = null;

export const isSupabaseConfigured = (): boolean => {
  return false;
};

export const getSupabaseConfig = () => {
  return {
    url: '',
    hasKey: false,
    isConfigured: false,
    status: 'Disconnected'
  };
};

/**
 * Service methods for database operations (Local & Firestore backend active)
 */
export const supabaseService = {
  // --- ADMISSIONS ---
  async fetchAdmissions(): Promise<AdmissionApplication[] | null> {
    return null;
  },

  async saveAdmission(_application: AdmissionApplication): Promise<boolean> {
    return false;
  },

  async updateAdmissionStatus(_id: string, _status: AdmissionApplication['status'], _notes?: string): Promise<boolean> {
    return false;
  },

  // --- NEWS ---
  async fetchNews(): Promise<NewsItem[] | null> {
    return null;
  },

  async saveNews(_item: NewsItem): Promise<boolean> {
    return false;
  },

  async deleteNews(_id: string): Promise<boolean> {
    return false;
  },

  // --- PHOTOS ---
  async fetchPhotos(): Promise<GalleryPhoto[] | null> {
    return null;
  },

  async savePhoto(_photo: GalleryPhoto): Promise<boolean> {
    return false;
  },

  async deletePhoto(_id: string): Promise<boolean> {
    return false;
  },

  // --- VIDEOS ---
  async fetchVideos(): Promise<VideoItem[] | null> {
    return null;
  },

  async saveVideo(_video: VideoItem): Promise<boolean> {
    return false;
  },

  async deleteVideo(_id: string): Promise<boolean> {
    return false;
  }
};

/**
 * SQL Schema definition
 */
export const SUPABASE_SQL_SCHEMA = `-- Holy Madonna's Matriculation Higher Secondary School SQL Schema
-- 1. Admissions Table
CREATE TABLE IF NOT EXISTS hms_admissions (
  id TEXT PRIMARY KEY,
  ref_number TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  dob TEXT NOT NULL,
  standard TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  previous_school TEXT,
  blood_group TEXT,
  special_needs TEXT,
  photo_url TEXT,
  has_documents BOOLEAN DEFAULT false,
  submitted_at TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. News & Circulars Table
CREATE TABLE IF NOT EXISTS hms_news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_ta TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ta TEXT NOT NULL,
  is_urgent BOOLEAN DEFAULT false,
  file_url TEXT,
  file_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Photo Gallery Table
CREATE TABLE IF NOT EXISTS hms_photos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_ta TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  caption_ta TEXT,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Video Wall Table
CREATE TABLE IF NOT EXISTS hms_videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_ta TEXT NOT NULL,
  category TEXT NOT NULL,
  category_ta TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  duration TEXT NOT NULL,
  date TEXT NOT NULL,
  views TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`;
