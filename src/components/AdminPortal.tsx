import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { SchoolLogo } from './SchoolLogo';
import { SUPABASE_SQL_SCHEMA, getSupabaseConfig } from '../lib/supabase';
import { safeCopyToClipboard } from '../utils/safeStorage';
import { SupabaseSqlEditor } from './SupabaseSqlEditor';
import { 
  Lock, 
  Unlock, 
  X, 
  FileText, 
  Image as ImageIcon, 
  Youtube, 
  GraduationCap, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Download, 
  Sparkles,
  Users,
  Search,
  Bell,
  Database,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Terminal
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    isAdminModalOpen, 
    closeAdminModal, 
    applications, 
    updateApplicationStatus, 
    addNewsItem, 
    deleteNewsItem,
    news,
    photos,
    addPhotoItem,
    deletePhotoItem,
    videos,
    addVideoItem,
    deleteVideoItem,
    language,
    isSupabaseEnabled,
    isSyncing,
    syncWithSupabase
  } = useSchool();

  // Admin passcode lock state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState('');

  // Active Admin Sub-tab
  const [adminTab, setAdminTab] = useState<'applications' | 'news' | 'photos' | 'videos' | 'database' | 'sql_editor'>('applications');

  // New News form state
  const [newsTitle, setNewsTitle] = useState('');
  const [newsTitleTa, setNewsTitleTa] = useState('');
  const [newsDesc, setNewsDesc] = useState('');
  const [newsCategory, setNewsCategory] = useState<'admissions' | 'events' | 'academics' | 'circular'>('admissions');
  const [newsUrgent, setNewsUrgent] = useState(false);

  // New Photo form state
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCat, setPhotoCat] = useState<'campus' | 'celebrations' | 'sports' | 'cultural' | 'science' | 'students'>('campus');

  // New Video form state
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoCat, setVideoCat] = useState<'celebrations' | 'cultural' | 'sports' | 'prayers' | 'campus'>('celebrations');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passcode.trim().toLowerCase();
    if (cleanPass === 'hloy' || cleanPass === 'holy' || cleanPass === '1234' || cleanPass === 'admin' || cleanPass === 'holy2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Admin Passcode. (Passcode: hloy)');
    }
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim()) return;

    addNewsItem({
      title: newsTitle,
      titleTa: newsTitleTa || newsTitle,
      description: newsDesc || 'Official announcement from the administration.',
      descriptionTa: newsDesc || 'பள்ளி நிர்வாகத்தின் அதிகாரப்பூர்வ அறிவிப்பு.',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: newsCategory,
      isUrgent: newsUrgent
    });

    setNewsTitle('');
    setNewsTitleTa('');
    setNewsDesc('');
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim() || !photoTitle.trim()) return;

    addPhotoItem({
      title: photoTitle,
      titleTa: photoTitle,
      category: photoCat,
      url: photoUrl,
      thumbnail: photoUrl,
      date: 'August 2026'
    });

    setPhotoUrl('');
    setPhotoTitle('');
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim() || !videoUrl.trim()) return;

    let youtubeId = 'kJQP7kiw5Fk';
    const match = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      youtubeId = match[1];
    } else if (videoUrl.includes('v=')) {
      youtubeId = videoUrl.split('v=')[1].split('&')[0];
    } else if (videoUrl.includes('youtu.be/')) {
      youtubeId = videoUrl.split('youtu.be/')[1].split('?')[0];
    } else if (videoUrl.trim().length === 11) {
      youtubeId = videoUrl.trim();
    }

    const categoryTaMap: Record<string, string> = {
      'celebrations': 'கொண்டாட்டங்கள்',
      'cultural': 'கலாச்சார நிகழ்வுகள்',
      'sports': 'விளையாட்டு விழா',
      'prayers': 'திருப்பலி & வழிபாடு',
      'campus': 'வளாக உலா'
    };

    addVideoItem({
      title: videoTitle,
      titleTa: videoTitle,
      youtubeId,
      duration: '04:15',
      category: videoCat.charAt(0).toUpperCase() + videoCat.slice(1),
      categoryTa: categoryTaMap[videoCat] || videoCat,
      views: '1.2K views',
      date: 'Aug 2026',
      isFeatured: false
    });

    setVideoTitle('');
    setVideoUrl('');
  };

  if (!isAdminModalOpen) return null;

  return (
    <div 
      id="admin-portal-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2C2A26]/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeAdminModal}
    >
      <div 
        className="bg-[#24221E] border border-[#3A3731] rounded-3xl max-w-5xl w-full h-[90vh] shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#1C1A17] border-b border-[#3A3731] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <SchoolLogo size="sm" variant="emblem" glow className="bg-white/10 p-0.5 rounded-full border border-white/20" />
            <div>
              <h3 className="font-bold text-base font-['Cinzel',serif] text-[#FCFAF7]">
                Holy Madonna's School • Admin Dashboard
              </h3>
              <p className="text-xs text-[#D8D2C5]">
                Lalapet Campus Content & Admission Management System
              </p>
            </div>
          </div>

          <button
            onClick={closeAdminModal}
            className="p-2 rounded-full bg-[#2D2A24] hover:bg-[#38342D] text-[#C8C2B4] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-[#1C1A17]/60">
            <form onSubmit={handleLogin} className="bg-[#2D2A24] border border-[#423E37] p-8 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 bg-[#5A5A40]/20 text-[#D8D2C5] rounded-2xl flex items-center justify-center mx-auto border border-[#5A5A40]/40">
                <Lock className="w-6 h-6" />
              </div>

              <h4 className="text-lg font-bold font-['Cinzel',serif] text-[#FCFAF7]">
                Admin Authentication
              </h4>
              <p className="text-xs text-[#A6A095]">
                Enter secure passcode to access applications and content updates.
              </p>

              {authError && (
                <div className="text-xs text-rose-300 bg-rose-950/40 p-2.5 rounded-xl border border-rose-800">
                  {authError}
                </div>
              )}

              <input
                type="password"
                placeholder="Enter passcode (e.g. hloy)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#1C1A17] border border-[#423E37] rounded-xl text-center text-sm tracking-widest text-white outline-none focus:border-[#5A5A40]"
              />

              <button
                type="submit"
                className="w-full py-2.5 bg-[#5A5A40] hover:bg-[#4E4E37] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors border border-[#6E6E52] cursor-pointer"
              >
                Unlock Dashboard
              </button>
              <span className="text-[10px] text-[#8C857B] block">Admin Passcode: <strong className="text-amber-300 font-mono">hloy</strong></span>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#1C1A17]/40">
            
            {/* Admin Nav Bar */}
            <div className="p-3 bg-[#1C1A17] border-b border-[#3A3731] flex items-center justify-between gap-2 overflow-x-auto shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAdminTab('applications')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    adminTab === 'applications'
                      ? 'bg-[#5A5A40] text-white shadow-sm'
                      : 'bg-[#2D2A24] text-[#C8C2B4] hover:bg-[#38342D]'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Admissions ({applications.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('news')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    adminTab === 'news'
                      ? 'bg-[#5A5A40] text-white shadow-sm'
                      : 'bg-[#2D2A24] text-[#C8C2B4] hover:bg-[#38342D]'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>News & Circulars ({news.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('photos')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    adminTab === 'photos'
                      ? 'bg-[#5A5A40] text-white shadow-sm'
                      : 'bg-[#2D2A24] text-[#C8C2B4] hover:bg-[#38342D]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photos ({photos.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('videos')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    adminTab === 'videos'
                      ? 'bg-[#5A5A40] text-white shadow-sm'
                      : 'bg-[#2D2A24] text-[#C8C2B4] hover:bg-[#38342D]'
                  }`}
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>Videos ({videos.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('database')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    adminTab === 'database'
                      ? 'bg-[#5A5A40] text-white shadow-sm'
                      : 'bg-[#2D2A24] text-[#C8C2B4] hover:bg-[#38342D]'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Cloud Database & Sync</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Cloud Firestore & Local Storage Active" />
                </button>

                <button
                  onClick={() => setAdminTab('sql_editor')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    adminTab === 'sql_editor'
                      ? 'bg-[#5A5A40] text-white shadow-sm'
                      : 'bg-[#2D2A24] text-emerald-300 hover:bg-[#38342D] border border-emerald-500/30'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>⚡ SQL Studio & Query Editor</span>
                </button>
              </div>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-[#D8D2C5] hover:underline px-2 py-1 cursor-pointer"
              >
                Lock Session
              </button>
            </div>

            {/* Sub-tab Views */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: ADMISSIONS APPLICATIONS */}
              {adminTab === 'applications' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-base font-bold font-['Cinzel',serif] text-[#FCFAF7]">
                        Received Online Admission Applications (2026–27)
                      </h4>
                      <p className="text-xs text-[#A6A095]">Manage student enrollment records and interview schedules</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-[#3A3731] bg-[#24221E]">
                    <table className="w-full text-left text-xs text-[#D8D2C5]">
                      <thead className="bg-[#1C1A17] text-[#A6A095] uppercase text-[10px] font-bold border-b border-[#3A3731]">
                        <tr>
                          <th className="p-3.5">Ref No</th>
                          <th className="p-3.5">Student Name</th>
                          <th className="p-3.5">Class</th>
                          <th className="p-3.5">Parent Name</th>
                          <th className="p-3.5">Phone</th>
                          <th className="p-3.5">Date</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#3A3731]">
                        {applications.map((app) => (
                          <tr key={app.id} className="hover:bg-[#2D2A24]">
                            <td className="p-3.5 font-mono text-[#FCFAF7] font-bold">{app.referenceNumber}</td>
                            <td className="p-3.5 font-semibold text-white">{app.studentName}</td>
                            <td className="p-3.5">{app.standard}</td>
                            <td className="p-3.5">{app.parentName}</td>
                            <td className="p-3.5 text-[#D8D2C5]">{app.mobileNumber}</td>
                            <td className="p-3.5 text-[#8C857B]">{app.appliedDate}</td>
                            <td className="p-3.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                app.status === 'Approved'
                                  ? 'bg-[#5A5A40]/50 text-white border border-[#6E6E52]'
                                  : app.status === 'Contacted'
                                  ? 'bg-[#3D3A35] text-[#D8D2C5] border border-[#524E48]'
                                  : 'bg-[#2D2A24] text-[#A6A095] border border-[#423E37]'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right space-x-1">
                              <button
                                onClick={() => updateApplicationStatus(app.id, 'Approved')}
                                className="px-2.5 py-1 bg-[#5A5A40] hover:bg-[#4E4E37] text-white rounded-lg text-[10px] font-semibold transition-colors cursor-pointer border border-[#6E6E52]"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => updateApplicationStatus(app.id, 'Contacted')}
                                className="px-2.5 py-1 bg-[#38342D] hover:bg-[#443F37] text-[#D8D2C5] rounded-lg text-[10px] font-semibold transition-colors cursor-pointer border border-[#4A4740]"
                              >
                                Contacted
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: NEWS & NOTICES */}
              {adminTab === 'news' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Add News Form */}
                  <div className="lg:col-span-5 bg-[#2D2A24] border border-[#423E37] p-5 rounded-2xl space-y-3">
                    <h4 className="text-sm font-bold text-[#FCFAF7] font-['Cinzel',serif] flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-[#8C857B]" />
                      <span>Publish New Announcement</span>
                    </h4>

                    <form onSubmit={handleAddNews} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[#A6A095] mb-1">Headline (English) *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Science Exhibition 2026 Announcement"
                          value={newsTitle}
                          onChange={(e) => setNewsTitle(e.target.value)}
                          className="w-full p-2 rounded-xl bg-[#1C1A17] border border-[#423E37] text-white outline-none focus:border-[#5A5A40]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#A6A095] mb-1">Headline (Tamil)</label>
                        <input
                          type="text"
                          placeholder="e.g. அறிவியல் கண்காட்சி 2026 அறிவிப்பு"
                          value={newsTitleTa}
                          onChange={(e) => setNewsTitleTa(e.target.value)}
                          className="w-full p-2 rounded-xl bg-[#1C1A17] border border-[#423E37] text-white outline-none focus:border-[#5A5A40]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#A6A095] mb-1">Details</label>
                        <textarea
                          rows={2}
                          placeholder="Description / Circular details..."
                          value={newsDesc}
                          onChange={(e) => setNewsDesc(e.target.value)}
                          className="w-full p-2 rounded-xl bg-[#1C1A17] border border-[#423E37] text-white outline-none focus:border-[#5A5A40]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[#A6A095] mb-1">Category</label>
                          <select
                            value={newsCategory}
                            onChange={(e) => setNewsCategory(e.target.value as any)}
                            className="w-full p-2 rounded-xl bg-[#1C1A17] border border-[#423E37] text-white outline-none focus:border-[#5A5A40]"
                          >
                            <option value="admissions">Admissions</option>
                            <option value="events">Events</option>
                            <option value="academics">Academics</option>
                            <option value="circular">Circular</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2 pt-5">
                          <input
                            type="checkbox"
                            id="urgent-check"
                            checked={newsUrgent}
                            onChange={(e) => setNewsUrgent(e.target.checked)}
                          />
                          <label htmlFor="urgent-check" className="text-[#D8D2C5] font-semibold cursor-pointer">
                            Mark as Urgent
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-[#5A5A40] hover:bg-[#4E4E37] text-white font-bold rounded-xl shadow-md transition-colors border border-[#6E6E52] cursor-pointer"
                      >
                        Publish Notice
                      </button>
                    </form>
                  </div>

                  {/* Existing News List */}
                  <div className="lg:col-span-7 space-y-2">
                    <h4 className="text-sm font-bold text-white font-['Cinzel',serif] mb-2">
                      Active Notices & Circulars ({news.length})
                    </h4>
                    {news.map((item) => (
                      <div key={item.id} className="p-3 bg-[#2D2A24] border border-[#423E37] rounded-xl flex items-center justify-between gap-3">
                        <div className="truncate">
                          <span className="text-[#FCFAF7] font-bold text-xs truncate block">{item.title}</span>
                          <span className="text-[11px] text-[#A6A095]">{item.date} • {item.category}</span>
                        </div>
                        <button
                          onClick={() => deleteNewsItem(item.id)}
                          className="p-1.5 text-rose-300 hover:bg-rose-950/60 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: PHOTOS */}
              {adminTab === 'photos' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 bg-[#2D2A24] border border-[#423E37] p-5 rounded-2xl space-y-3">
                    <h4 className="text-sm font-bold text-[#FCFAF7] font-['Cinzel',serif] flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-[#8C857B]" />
                      <span>Add Live Photo to Gallery</span>
                    </h4>

                    <form onSubmit={handleAddPhoto} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[#A6A095] mb-1">Photo Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Science Exhibition Model Display"
                          value={photoTitle}
                          onChange={(e) => setPhotoTitle(e.target.value)}
                          className="w-full p-2 rounded-xl bg-[#1C1A17] border border-[#423E37] text-white outline-none focus:border-[#5A5A40]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#A6A095] mb-1">Image URL *</label>
                        <input
                          type="url"
                          required
                          placeholder="https://images.unsplash.com/..."
                          value={photoUrl}
                          onChange={(e) => setPhotoUrl(e.target.value)}
                          className="w-full p-2 rounded-xl bg-[#1C1A17] border border-[#423E37] text-white outline-none focus:border-[#5A5A40]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#A6A095] mb-1">Category</label>
                        <select
                          value={photoCat}
                          onChange={(e) => setPhotoCat(e.target.value as any)}
                          className="w-full p-2 rounded-xl bg-[#1C1A17] border border-[#423E37] text-white outline-none focus:border-[#5A5A40]"
                        >
                          <option value="campus">Campus</option>
                          <option value="celebrations">Celebrations</option>
                          <option value="sports">Sports</option>
                          <option value="cultural">Cultural</option>
                          <option value="science">Science</option>
                          <option value="students">Students</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-[#5A5A40] hover:bg-[#4E4E37] text-white font-bold rounded-xl shadow-md transition-colors border border-[#6E6E52] cursor-pointer"
                      >
                        Upload to Gallery
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-3 gap-3 overflow-y-auto max-h-96">
                    {photos.map((p) => (
                      <div key={p.id} className="relative rounded-xl overflow-hidden group aspect-video bg-[#1C1A17] border border-[#3A3731]">
                        <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#1C1A17]/85 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-2 text-center text-[10px] text-white transition-opacity gap-1">
                          <span className="line-clamp-2">{p.title}</span>
                          <button
                            type="button"
                            onClick={() => deletePhotoItem(p.id)}
                            className="p-1 rounded bg-red-600/80 hover:bg-red-600 text-white cursor-pointer transition-colors"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: DATABASE & SUPABASE */}
              {adminTab === 'database' && (
                <div className="space-y-6">
                  {/* Status Banner */}
                  <div className="p-5 rounded-2xl bg-[#2D2A24] border border-[#423E37] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border bg-emerald-950/40 text-emerald-400 border-emerald-800/60">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-base font-['Cinzel',serif]">
                            Cloud Database & Storage Backend
                          </h4>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                            Firestore & Local Engine Active
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
                            Supabase: Disconnected
                          </span>
                        </div>
                        <p className="text-xs text-[#C8C2B4] mt-1 max-w-xl">
                          All school admissions, news circulars, photo gallery, and video records are stored and persisted securely through Cloud Firestore and instant local storage.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setAdminTab('sql_editor')}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 border border-emerald-500/50 cursor-pointer shadow-md"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Open SQL Studio</span>
                      </button>

                      <button
                        type="button"
                        disabled={isSyncing}
                        onClick={async () => {
                          await syncWithSupabase();
                          setSyncSuccessMessage('Database state synchronized successfully!');
                          setTimeout(() => setSyncSuccessMessage(''), 3000);
                        }}
                        className="px-4 py-2 bg-[#5A5A40] hover:bg-[#4E4E37] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 border border-[#6E6E52] cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>{isSyncing ? 'Syncing...' : 'Sync Cloud Data'}</span>
                      </button>
                    </div>
                  </div>

                  {syncSuccessMessage && (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{syncSuccessMessage}</span>
                    </div>
                  )}

                  {/* Supabase SQL Setup Script */}
                  <div className="bg-[#2D2A24] border border-[#423E37] rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white font-['Cinzel',serif] flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#D8D2C5]" />
                          <span>Supabase 1-Click Database Setup (SQL Schema)</span>
                        </h4>
                        <p className="text-xs text-[#A6A095] mt-0.5">
                          Copy and execute this script in your Supabase SQL Editor to provision all tables: <code>hms_admissions</code>, <code>hms_news</code>, <code>hms_photos</code>, <code>hms_videos</code>.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={async () => {
                          await safeCopyToClipboard(SUPABASE_SQL_SCHEMA);
                          setCopiedSql(true);
                          setTimeout(() => setCopiedSql(false), 2500);
                        }}
                        className="px-3.5 py-1.5 bg-[#1C1A17] hover:bg-[#3A3731] text-[#E8E2D5] text-xs font-bold rounded-xl border border-[#423E37] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Script'}</span>
                      </button>
                    </div>

                    <pre className="p-4 bg-[#141210] rounded-xl text-[11px] text-[#A8A29E] font-mono overflow-x-auto max-h-56 border border-[#2D2A24] select-all">
                      {SUPABASE_SQL_SCHEMA}
                    </pre>
                  </div>

                  {/* Step by step guide */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#2D2A24] border border-[#423E37] rounded-2xl space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-[#5A5A40]/30 text-white font-bold flex items-center justify-center text-xs">
                        1
                      </div>
                      <h5 className="font-bold text-xs text-white">Create Supabase Project</h5>
                      <p className="text-[11px] text-[#A6A095]">
                        Create a free project at supabase.com. Go to SQL Editor and run the SQL script above.
                      </p>
                    </div>

                    <div className="p-4 bg-[#2D2A24] border border-[#423E37] rounded-2xl space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-[#5A5A40]/30 text-white font-bold flex items-center justify-center text-xs">
                        2
                      </div>
                      <h5 className="font-bold text-xs text-white">Set Environment Variables</h5>
                      <p className="text-[11px] text-[#A6A095]">
                        Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your environment settings.
                      </p>
                    </div>

                    <div className="p-4 bg-[#2D2A24] border border-[#423E37] rounded-2xl space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-[#5A5A40]/30 text-white font-bold flex items-center justify-center text-xs">
                        3
                      </div>
                      <h5 className="font-bold text-xs text-white">Continuous Real-Time Sync</h5>
                      <p className="text-[11px] text-[#A6A095]">
                        Parent admissions, news announcements, photos, and YouTube videos will sync in real time.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {adminTab === 'videos' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 bg-[#2D2A24] border border-[#423E37] p-5 rounded-2xl space-y-3">
                    <h4 className="text-sm font-bold text-[#FCFAF7] font-['Cinzel',serif] flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-[#8C857B]" />
                      <span>Add YouTube School Video</span>
                    </h4>

                    <form onSubmit={handleAddVideo} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[#A6A095] mb-1">Video Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Independence Day Drill 2026"
                          value={videoTitle}
                          onChange={(e) => setVideoTitle(e.target.value)}
                          className="w-full p-2 rounded-xl bg-[#1C1A17] border border-[#423E37] text-white outline-none focus:border-[#5A5A40]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#A6A095] mb-1">YouTube URL / Video ID *</label>
                        <input
                          type="text"
                          required
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          className="w-full p-2 rounded-xl bg-[#1C1A17] border border-[#423E37] text-white outline-none focus:border-[#5A5A40]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#A6A095] mb-1">Category</label>
                        <select
                          value={videoCat}
                          onChange={(e) => setVideoCat(e.target.value as any)}
                          className="w-full p-2 rounded-xl bg-[#1C1A17] border border-[#423E37] text-white outline-none focus:border-[#5A5A40]"
                        >
                          <option value="celebrations">Celebrations</option>
                          <option value="cultural">Cultural</option>
                          <option value="sports">Sports</option>
                          <option value="prayers">Prayers & Mass</option>
                          <option value="campus">Campus Tour</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-[#5A5A40] hover:bg-[#4E4E37] text-white font-bold rounded-xl shadow-md transition-colors border border-[#6E6E52] cursor-pointer"
                      >
                        Publish YouTube Video
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-7 space-y-2 max-h-96 overflow-y-auto">
                    <h4 className="text-sm font-bold text-white font-['Cinzel',serif]">
                      Live School YouTube Wall ({videos.length})
                    </h4>
                    {videos.map((v) => (
                      <div key={v.id} className="p-3 bg-[#2D2A24] border border-[#423E37] rounded-xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={v.thumbnail} alt={v.title} className="w-16 h-10 object-cover rounded shrink-0" />
                          <div className="truncate">
                            <span className="text-white font-bold text-xs block truncate">{v.title}</span>
                            <span className="text-[10px] text-[#D8D2C5]">{v.duration} • {v.category}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteVideoItem(v.id)}
                          className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-300 transition-colors shrink-0 cursor-pointer"
                          title="Delete video"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SUPABASE & SQL QUERY STUDIO */}
              {adminTab === 'sql_editor' && (
                <div className="space-y-4">
                  <SupabaseSqlEditor />
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
