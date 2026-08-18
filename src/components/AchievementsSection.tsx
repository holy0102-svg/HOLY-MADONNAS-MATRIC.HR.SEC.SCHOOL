import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { 
  Trophy, 
  Award, 
  Medal, 
  Star, 
  CheckCircle2, 
  Users, 
  BookOpen, 
  Calendar, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { t, language } = useSchool();

  const metrics = [
    { number: '500+', label: t.statStudents, desc: 'Nurtured in our Lalapet campus', icon: Users, color: 'from-amber-500 to-amber-600' },
    { number: '50+', label: t.statTeachers, desc: 'Qualified & dedicated educators', icon: BookOpen, color: 'from-blue-500 to-indigo-600' },
    { number: '25+', label: t.statYears, desc: 'Legacy of academic excellence', icon: Award, color: 'from-emerald-500 to-teal-600' },
    { number: '100+', label: t.statAchievements, desc: 'District & state level recognitions', icon: Trophy, color: 'from-purple-500 to-pink-600' },
    { number: '20+', label: t.statEvents, desc: 'Cultural & sports pageants annually', icon: Calendar, color: 'from-rose-500 to-red-600' },
    { number: '100%', label: t.statPassRate, desc: 'Consecutive Board exam pass rate', icon: CheckCircle2, color: 'from-amber-400 to-yellow-500' }
  ];

  const toppers = [
    {
      name: 'R. Kavin Kumar',
      class: 'Class XII (Science)',
      score: '588 / 600 (Centum in Maths & Physics)',
      award: 'State Merit Gold Medalist',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'S. Divya Bharathi',
      class: 'Class X (Matriculation)',
      score: '494 / 500 (District 1st Rank)',
      award: 'Karur District Topper Trophy',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'M. Antony Paul',
      class: 'Class XII (Commerce)',
      score: '582 / 600 (Centum in Accountancy)',
      award: 'Rotary Club Best Scholar Award',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <section id="achievements" className="py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#E5E0D8] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-3 border border-[#5A5A40]/20">
            <Trophy className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>{language === 'ta' ? 'பெருமைமிகு சாதனைகள்' : 'Legacy & Milestones'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {language === 'ta' ? 'எங்களின் வரலாற்றுச் சாதனைகள்' : 'Celebrating 25+ Years of Excellence'}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {language === 'ta'
              ? 'அரசுப் பொதுத்தேர்வுகளில் தொடர் 100% வெற்றி மற்றும் மாநில அளவிலான விளையாட்டுப் போட்டிகளில் சாதனைகள்'
              : 'Consistent 100% Board exam results, state level science innovations, and sporting accolades'}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* 6 Key Verified Counter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                id={`achievement-metric-${idx}`}
                className="bg-white rounded-3xl p-5 border border-[#E5E0D8] shadow-xs hover:shadow-md hover:border-[#5A5A40]/40 transition-all text-center flex flex-col items-center justify-between"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D8] flex items-center justify-center text-[#5A5A40] shadow-2xs mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#2C2A26] font-['Cinzel',serif] tracking-tight block">
                    {m.number}
                  </span>
                  <span className="text-xs font-bold text-[#5A5A40] block mt-1">
                    {m.label}
                  </span>
                  <span className="text-[11px] text-[#706B63] block mt-0.5 leading-tight font-normal">
                    {m.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
