import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AdmissionApplication, GalleryPhoto, NewsItem, VideoItem } from '../types';
import { safeLocalStorage } from '../utils/safeStorage';

const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Fallback to locally saved credentials if user sets them in Admin/Vercel settings
const getStoredUrl = () => safeLocalStorage.getItem('hms_supabase_url') || envUrl;
const getStoredKey = () => safeLocalStorage.getItem('hms_supabase_key') || envKey;

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  const url = getStoredUrl();
  const key = getStoredKey();

  if (!url || !key) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseInstance;
};

export const supabase = getSupabaseClient();

export const isSupabaseConfigured = (): boolean => {
  const url = getStoredUrl();
  const key = getStoredKey();
  return Boolean(url && key && url.startsWith('http'));
};

export const getSupabaseConfig = () => {
  const url = getStoredUrl();
  const key = getStoredKey();
  return {
    url: url ? url.replace(/^(https?:\/\/[^/]+).*/, '$1') : 'https://your-project.supabase.co',
    hasKey: Boolean(key && key.length > 10),
    isConfigured: isSupabaseConfigured(),
    status: isSupabaseConfigured() ? 'Connected' : 'Configured (Awaiting Keys)'
  };
};

export const setCustomSupabaseCredentials = (url: string, key: string) => {
  if (url && key) {
    safeLocalStorage.setItem('hms_supabase_url', url.trim());
    safeLocalStorage.setItem('hms_supabase_key', key.trim());
    supabaseInstance = null; // Recreate next time
    return true;
  }
  return false;
};

export const clearCustomSupabaseCredentials = () => {
  safeLocalStorage.removeItem('hms_supabase_url');
  safeLocalStorage.removeItem('hms_supabase_key');
  supabaseInstance = null;
};

/**
 * Validates active Supabase connection
 */
export async function testSupabaseConnection(): Promise<{ connected: boolean; latencyMs: number; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      connected: false,
      latencyMs: 0,
      error: 'Supabase URL and Anon Key are required. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    };
  }

  const start = performance.now();
  try {
    const { error } = await client.from('hms_admissions').select('id', { count: 'exact', head: true });
    const latencyMs = Math.round(performance.now() - start);

    if (error) {
      // If table doesn't exist yet, it's connected to Supabase project but needs schema
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return { connected: true, latencyMs, error: 'Connected to Supabase! Please run the 1-Click SQL Schema in SQL Studio to create tables.' };
      }
      return { connected: false, latencyMs, error: error.message };
    }

    return { connected: true, latencyMs };
  } catch (err: any) {
    const latencyMs = Math.round(performance.now() - start);
    return { connected: false, latencyMs, error: err?.message || 'Connection timeout' };
  }
}

/**
 * Service methods for database operations
 */
export const supabaseService = {
  // --- ADMISSIONS ---
  async fetchAdmissions(): Promise<AdmissionApplication[] | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('hms_admissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error || !data) return null;

      return data.map((item: any) => ({
        id: item.id,
        refNumber: item.ref_number || item.id,
        studentName: item.student_name,
        gender: item.gender,
        dob: item.dob,
        standard: item.standard,
        parentName: item.parent_name,
        relationship: item.relationship,
        mobileNumber: item.mobile_number,
        email: item.email || '',
        address: item.address,
        previousSchool: item.previous_school,
        bloodGroup: item.blood_group,
        specialNeeds: item.special_needs,
        photoUrl: item.photo_url,
        hasDocuments: Boolean(item.has_documents),
        submittedAt: item.submitted_at,
        status: item.status || 'Pending',
        notes: item.notes
      }));
    } catch (e) {
      console.warn('Supabase fetchAdmissions error:', e);
      return null;
    }
  },

  async saveAdmission(application: AdmissionApplication): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await client.from('hms_admissions').upsert({
        id: application.id,
        ref_number: application.refNumber,
        student_name: application.studentName,
        gender: application.gender,
        dob: application.dob,
        standard: application.standard,
        parent_name: application.parentName,
        relationship: application.relationship,
        mobile_number: application.mobileNumber,
        email: application.email || '',
        address: application.address,
        previous_school: application.previousSchool || '',
        blood_group: application.bloodGroup || '',
        special_needs: application.specialNeeds || '',
        photo_url: application.photoUrl || '',
        has_documents: application.hasDocuments,
        submitted_at: application.submittedAt,
        status: application.status,
        notes: application.notes || ''
      });
      return !error;
    } catch (e) {
      console.warn('Supabase saveAdmission error:', e);
      return false;
    }
  },

  async updateAdmissionStatus(id: string, status: AdmissionApplication['status'], notes?: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const updatePayload: any = { status };
      if (notes !== undefined) updatePayload.notes = notes;
      const { error } = await client.from('hms_admissions').update(updatePayload).eq('id', id);
      return !error;
    } catch (e) {
      console.warn('Supabase updateAdmissionStatus error:', e);
      return false;
    }
  },

  async deleteAdmission(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client.from('hms_admissions').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  // --- NEWS ---
  async fetchNews(): Promise<NewsItem[] | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('hms_news')
        .select('*')
        .order('date', { ascending: false });

      if (error || !data) return null;

      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        titleTa: item.title_ta || item.title,
        category: item.category,
        date: item.date,
        description: item.description,
        descriptionTa: item.description_ta || item.description,
        isUrgent: Boolean(item.is_urgent),
        fileUrl: item.file_url,
        fileName: item.file_name
      }));
    } catch {
      return null;
    }
  },

  async saveNews(item: NewsItem): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await client.from('hms_news').upsert({
        id: item.id,
        title: item.title,
        title_ta: item.titleTa,
        category: item.category,
        date: item.date,
        description: item.description,
        description_ta: item.descriptionTa,
        is_urgent: item.isUrgent || false,
        file_url: item.fileUrl || '',
        file_name: item.fileName || ''
      });
      return !error;
    } catch {
      return false;
    }
  },

  async deleteNews(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client.from('hms_news').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  // --- PHOTOS ---
  async fetchPhotos(): Promise<GalleryPhoto[] | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data, error } = await client.from('hms_photos').select('*');
      if (error || !data) return null;

      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        titleTa: item.title_ta || item.title,
        category: item.category,
        imageUrl: item.image_url,
        thumbnail: item.thumbnail || item.image_url,
        caption: item.caption,
        captionTa: item.caption_ta,
        date: item.date
      }));
    } catch {
      return null;
    }
  },

  async savePhoto(photo: GalleryPhoto): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await client.from('hms_photos').upsert({
        id: photo.id,
        title: photo.title,
        title_ta: photo.titleTa,
        category: photo.category,
        image_url: photo.imageUrl,
        caption: photo.caption || '',
        caption_ta: photo.captionTa || '',
        date: photo.date
      });
      return !error;
    } catch {
      return false;
    }
  },

  async deletePhoto(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client.from('hms_photos').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  // --- VIDEOS ---
  async fetchVideos(): Promise<VideoItem[] | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data, error } = await client.from('hms_videos').select('*');
      if (error || !data) return null;

      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        titleTa: item.title_ta || item.title,
        category: item.category,
        categoryTa: item.category_ta || item.category,
        youtubeId: item.youtube_id,
        duration: item.duration,
        date: item.date,
        views: item.views || '1.2K views',
        isFeatured: Boolean(item.is_featured)
      }));
    } catch {
      return null;
    }
  },

  async saveVideo(video: VideoItem): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await client.from('hms_videos').upsert({
        id: video.id,
        title: video.title,
        title_ta: video.titleTa,
        category: video.category,
        category_ta: video.categoryTa,
        youtube_id: video.youtubeId,
        duration: video.duration,
        date: video.date,
        views: video.views || '',
        is_featured: video.isFeatured || false
      });
      return !error;
    } catch {
      return false;
    }
  },

  async deleteVideo(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client.from('hms_videos').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  }
};

/**
 * Supabase SQL Schema for instant execution
 */
export const SUPABASE_SQL_SCHEMA = `-- ============================================================
-- Holy Madonna's Matriculation Higher Secondary School
-- Supabase Cloud Database & Vercel Deployment Schema
-- ============================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Admissions Applications Table
CREATE TABLE IF NOT EXISTS public.hms_admissions (
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

-- 3. News & Circulars Table
CREATE TABLE IF NOT EXISTS public.hms_news (
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

-- 4. Photo Gallery Table
CREATE TABLE IF NOT EXISTS public.hms_photos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_ta TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail TEXT,
  caption TEXT,
  caption_ta TEXT,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Video Wall Table
CREATE TABLE IF NOT EXISTS public.hms_videos (
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

-- 6. Student Verification & UIDAI e-KYC Table (Zero raw Aadhaar stored)
CREATE TABLE IF NOT EXISTS public.hms_verifications (
  id TEXT PRIMARY KEY,
  admission_number TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  dob TEXT NOT NULL,
  standard TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  registered_mobile TEXT NOT NULL,
  status TEXT DEFAULT 'Pending', -- 'Verified', 'Pending', 'Failed'
  is_otp_verified BOOLEAN DEFAULT false,
  aadhaar_kyc_status TEXT DEFAULT 'Pending', -- 'Verified', 'Pending', 'Failed'
  aadhaar_kyc_ref_id TEXT, -- Cryptographic UIDAI e-KYC reference token only
  consent_given BOOLEAN DEFAULT true,
  consent_timestamp TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  academic_year TEXT DEFAULT '2026–2027',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Public Policies for School Web Access
ALTER TABLE public.hms_admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hms_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hms_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hms_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hms_verifications ENABLE ROW LEVEL SECURITY;

-- Allow read/write access for anonymous client key in educational portal demo
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'allow_all_admissions') THEN
    CREATE POLICY allow_all_admissions ON public.hms_admissions FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'allow_all_news') THEN
    CREATE POLICY allow_all_news ON public.hms_news FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'allow_all_photos') THEN
    CREATE POLICY allow_all_photos ON public.hms_photos FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'allow_all_videos') THEN
    CREATE POLICY allow_all_videos ON public.hms_videos FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'allow_all_verifications') THEN
    CREATE POLICY allow_all_verifications ON public.hms_verifications FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
`;
