import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { safeCopyToClipboard } from '../utils/safeStorage';
import { 
  BookOpen, 
  Sprout, 
  Compass, 
  Target, 
  Rocket, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles, 
  Brain,
  Microscope,
  Calculator,
  Languages,
  Palette,
  Globe,
  Share2,
  Check
} from 'lucide-react';

export const AcademicsSection: React.FC = () => {
  const { t, language, openAdmissionModal, openSEOInspector } = useSchool();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareSection = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://holymadonnasschool.edu.in';
    const url = `${origin}/#academics`;
    await safeCopyToClipboard(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const academicLevels = [
    {
      id: 'pre-primary',
      title: t.levelPrePrimary,
      sub: t.levelPrePrimarySub,
      desc: t.levelPrePrimaryDesc,
      icon: Sprout,
      color: 'from-emerald-500 to-green-600',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      grades: 'Pre-KG, LKG, UKG (Ages 2.5 - 5)',
      highlights: [
        'Phonics-based English reading & Tamil rhymes',
        'Montessori sensory activity kits & sand pits',
        'Storytelling, puppet shows & musical movement',
        'Loving, motherly care in colorful air-ventilated rooms'
      ],
      highlightsTa: [
        'எளிய தமிழ் மற்றும் ஆங்கில மழலையர் பாடல்கள்',
        'விளையாட்டு வழி கற்றல் உபகரணங்கள்',
        'கதைகள் மற்றும் பொம்மலாட்ட கலை நிகழ்ச்சிகள்',
        'அன்பான ஆசிரியைகளின் அரவணைப்பு'
      ],
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'primary',
      title: t.levelPrimary,
      sub: t.levelPrimarySub,
      desc: t.levelPrimaryDesc,
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      tagColor: 'bg-blue-100 text-blue-800 border-blue-300',
      grades: 'Classes I to V (Ages 6 - 10)',
      highlights: [
        'Strong bilingual literacy in English & Tamil',
        'Experiential Math with hands-on mental arithmetic',
        'Environmental Science & Nature exploration',
        'Computer basics, Drawing, Yoga and Moral Science'
      ],
      highlightsTa: [
        'தமிழ் மற்றும் ஆங்கிலத்தில் தெளிவான வாசிப்புப் பயிற்சி',
        'எளிய கணித செய்முறை பயிற்சிகள்',
        'சுற்றுச்சூழல் மற்றும் பொது அறிவு பாடங்கள்',
        'அடிப்படை கணினி, வரைபடம் மற்றும் யோகா'
      ],
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'middle',
      title: t.levelMiddle,
      sub: t.levelMiddleSub,
      desc: t.levelMiddleDesc,
      icon: Compass,
      color: 'from-amber-500 to-orange-600',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
      grades: 'Classes VI to VIII (Ages 11 - 13)',
      highlights: [
        'Physics, Chemistry and Biology experimental labs',
        'Scratch Coding, Python & Digital literacy',
        'Oratorical, Essay writing and Quiz clubs',
        'House-system sports leagues & leadership squads'
      ],
      highlightsTa: [
        'அறிவியல் ஆய்வக நேரடி செய்முறை பயிற்சிகள்',
        'கணினி கோடிங் மற்றும் மென்பொருள் அறிவு',
        'பேச்சு, கட்டுரை மற்றும் வினாடி வினா மன்றங்கள்',
        'சாரணர் இயக்கம் மற்றும் விளையாட்டு பயிற்சிகள்'
      ],
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'high',
      title: t.levelHigh,
      sub: t.levelHighSub,
      desc: t.levelHighDesc,
      icon: Target,
      color: 'from-rose-500 to-red-600',
      tagColor: 'bg-rose-100 text-rose-800 border-rose-300',
      grades: 'Classes IX to X (Matriculation State Board)',
      highlights: [
        '100% Board Exam Centum score focus & mentorship',
        'Weekly concept revision and model test series',
        'Individual doubt-clearing sessions for students',
        'Career aptitude counseling & stress-free guidance'
      ],
      highlightsTa: [
        '10-ஆம் வகுப்பு பொதுத்தேர்வில் 100% தேர்ச்சி சிறப்புப் பயிற்சி',
        'வாராந்திர மாதிரித் தேர்வுகள் & சந்தேகங்கள் தீர்க்கும் வகுப்புகள்',
        'மெட்ரிகுலேஷன் பாடத்திட்டத்தில் ஆழ்ந்த பயிற்சி',
        'மன அழுத்தமில்லாத வழிகாட்டுதல்'
      ],
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'higher-secondary',
      title: t.levelHigherSec,
      sub: t.levelHigherSecSub,
      desc: t.levelHigherSecDesc,
      icon: Rocket,
      color: 'from-purple-600 to-indigo-700',
      tagColor: 'bg-purple-100 text-purple-800 border-purple-300',
      grades: 'Classes XI & XII (Career Streams)',
      highlights: [
        'Group 1: Maths, Physics, Chemistry, Biology (NEET/JEE track)',
        'Group 2: Physics, Chemistry, Maths, Computer Science (Engineering/IT track)',
        'Group 3: Commerce, Accountancy, Economics, Business Maths (CA/Corporate track)',
        'Experienced senior faculty with continuous board evaluation'
      ],
      highlightsTa: [
        'பிரிவு 1: கணிதம், இயற்பியல், வேதியியல், உயிரியல் (NEET சிறப்புப் பயிற்சி)',
        'பிரிவு 2: கணிதம், இயற்பியல், வேதியியல், கணினி அறிவியல்',
        'பிரிவு 3: வணிகவியல், கணக்குப்பதிவியல், பொருளியல், வணிக கணிதம் (CA பயிற்சி)',
        'முதுகலை அனுபவமிக்க விரிவுரையாளர்கள்'
      ],
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const currentLevel = academicLevels[activeTab];

  return (
    <section id="academics" className="py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#E5E0D8] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider border border-[#5A5A40]/20">
              <BookOpen className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>{language === 'ta' ? 'கல்வி மற்றும் பாடத்திட்டம்' : 'Academic Excellence'}</span>
            </div>
            
            <button
              onClick={openSEOInspector}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#F5F2ED] text-[#5A5A40] text-[11px] font-semibold border border-[#D5CEC2] shadow-2xs transition-all cursor-pointer"
              title="Inspect dynamic SEO meta tags & course schema for this section"
            >
              <Globe className="w-3 h-3 text-[#5A5A40]" />
              <span>{language === 'ta' ? 'SEO மெட்டா விவரம்' : 'Course SEO & Schema'}</span>
            </button>

            <button
              onClick={handleShareSection}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#F5F2ED] text-[#706B63] hover:text-[#2C2A26] text-[11px] font-semibold border border-[#D5CEC2] shadow-2xs transition-all cursor-pointer"
              title="Copy canonical section link"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
              <span>{copiedLink ? (language === 'ta' ? 'இணைப்பு நகலெடுக்கப்பட்டது' : 'Copied Link') : (language === 'ta' ? 'பகிர்' : 'Share #academics')}</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {t.academicsHeading}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {t.academicsSubHeading}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* Level Selector Tabs */}
        <div id="academic-tabs-bar" className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {academicLevels.map((lvl, idx) => {
            const Icon = lvl.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={lvl.id}
                id={`academic-tab-${lvl.id}`}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-[#5A5A40] text-white border-[#484833] shadow-md scale-102 ring-2 ring-[#5A5A40]/30'
                    : 'bg-white text-[#3D3A35] border-[#E5E0D8] hover:bg-[#F5F2ED] hover:text-[#2C2A26]'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-[#F5F2ED] text-[#5A5A40]'} flex items-center justify-center text-xs`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{lvl.title.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Level View Card */}
        <div 
          id="academic-level-detail-card"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E0D8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F5F2ED] text-[#5A5A40] border border-[#E5E0D8]">
                {currentLevel.grades}
              </span>
              <span className="text-xs text-[#8A847C] font-semibold">
                Tamil Nadu Matriculation Board
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-[#2C2A26] font-['Cinzel',serif]">
                {currentLevel.title}
              </h3>
              <p className="text-sm font-semibold text-[#5A5A40] mt-1">
                {currentLevel.sub}
              </p>
            </div>

            <p className="text-[#3D3A35] text-sm sm:text-base leading-relaxed">
              {currentLevel.desc}
            </p>

            {/* Highlights List */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase text-[#8A847C] tracking-wider">
                {language === 'ta' ? 'முக்கிய சிறப்பம்சங்கள்:' : 'Key Curriculum Highlights:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(language === 'ta' ? currentLevel.highlightsTa : currentLevel.highlights).map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 bg-[#F5F2ED] p-3 rounded-2xl border border-[#E5E0D8] text-xs text-[#3D3A35] shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action button */}
            <div className="pt-3">
              <button
                onClick={openAdmissionModal}
                className="bg-[#5A5A40] hover:bg-[#484833] text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>{language === 'ta' ? 'இவ்வகுப்பிற்கு விண்ணப்பிக்க' : 'Apply for this Class'}</span>
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-[#2C2A26] group">
              <img
                src={currentLevel.image}
                alt={currentLevel.title}
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A26]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#2C2A26]/90 backdrop-blur-md p-3 rounded-xl border border-[#3D3A35] text-white text-center">
                <span className="text-xs font-bold text-white font-['Cinzel',serif] block">
                  Holy Madonnas Lalapet
                </span>
                <span className="text-[11px] text-[#D9D3C7]">
                  {language === 'ta' ? 'நவீன கல்வி & தனித்திறன் பயிற்சி' : 'Individual Attention • Holistic Pedagogy'}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
