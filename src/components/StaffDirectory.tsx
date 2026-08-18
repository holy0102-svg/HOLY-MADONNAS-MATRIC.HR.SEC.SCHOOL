import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { teachersList } from '../data/schoolData';
import { Teacher } from '../types';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Sparkles, 
  Mail,
  ChevronRight
} from 'lucide-react';

export const StaffDirectory: React.FC = () => {
  const { language, t } = useSchool();
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const departments = [
    { id: 'all', label: t.deptAll },
    { id: 'leadership', label: t.deptLeadership },
    { id: 'science', label: t.deptScience },
    { id: 'maths', label: t.deptMaths },
    { id: 'languages', label: t.deptLanguages },
    { id: 'primary', label: t.deptPrimary },
    { id: 'arts_sports', label: t.deptArtsSports }
  ];

  const filteredTeachers = selectedDept === 'all'
    ? teachersList
    : teachersList.filter(t => t.department === selectedDept);

  return (
    <section id="faculty" className="py-16 sm:py-24 bg-white border-b border-[#E5E0D8] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-3 border border-[#5A5A40]/20">
            <Users className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>{language === 'ta' ? 'அர்ப்பணிப்புள்ள வழிகாட்டிகள்' : 'Academic Mentors'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {t.facultyHeading}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {t.facultySubHeading}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* Department Filter Pills */}
        <div id="staff-department-filter" className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {departments.map((dept) => (
            <button
              key={dept.id}
              id={`staff-filter-${dept.id}`}
              onClick={() => setSelectedDept(dept.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedDept === dept.id
                  ? 'bg-[#5A5A40] text-white border-[#484833] shadow-xs'
                  : 'bg-[#F5F2ED] text-[#3D3A35] border-[#E5E0D8] hover:bg-[#EAE4DC]'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Teachers Grid */}
        <div id="teachers-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTeachers.map((teacher) => {
            // Generate clean initials from teacher's name
            const cleanName = teacher.name.replace(/^(Mr\.|Mrs\.|Dr\.|Sr\.)\s*/, '');
            const initials = cleanName
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map(n => n[0])
              .join('')
              .toUpperCase();

            return (
              <div
                key={teacher.id}
                id={`teacher-card-${teacher.id}`}
                className="bg-[#F5F2ED] rounded-3xl p-6 border border-[#E5E0D8] hover:border-[#5A5A40]/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Department / Monogram & Experience Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#5A5A40] group-hover:bg-[#484833] text-white flex items-center justify-center font-extrabold text-lg font-['Cinzel',serif] shadow-sm transition-colors shrink-0">
                      {initials || 'HM'}
                    </div>

                    <div className="px-2.5 py-1 rounded-full bg-white border border-[#E5E0D8] text-[10px] font-bold text-[#5A5A40] flex items-center gap-1 shadow-2xs">
                      <Award className="w-3 h-3 text-[#5A5A40]" />
                      <span>{teacher.experience} Exp.</span>
                    </div>
                  </div>

                  {/* Subject Tag */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-[11px] font-bold border border-[#5A5A40]/20 truncate max-w-full">
                      {language === 'ta' ? teacher.subjectTa : teacher.subject}
                    </span>
                  </div>

                  {/* Teacher Name & Designation */}
                  <h3 className="text-base font-bold text-[#2C2A26] font-['Cinzel',serif] group-hover:text-[#5A5A40] transition-colors leading-snug">
                    {language === 'ta' ? teacher.nameTa : teacher.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#706B63] mt-1">
                    {language === 'ta' ? teacher.designationTa : teacher.designation}
                  </p>

                  {/* Qualifications */}
                  <div className="mt-4 pt-3 border-t border-[#E5E0D8] text-xs text-[#706B63] space-y-1 font-normal">
                    <div className="flex items-center gap-1.5 text-[#706B63]">
                      <GraduationCap className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                      <span className="text-[11px] font-medium truncate">{teacher.qualification}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="mt-5 pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-[11px] text-[#8A847C]">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#5A5A40]" />
                    <span>Faculty Mentor</span>
                  </span>
                  <span className="text-[#5A5A40] font-bold">Lalapet</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
