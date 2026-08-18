import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { 
  GraduationCap, 
  ArrowRight, 
  FileText, 
  Users, 
  CheckCircle2, 
  Download, 
  HelpCircle,
  Calendar,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const AdmissionsHub: React.FC = () => {
  const { t, language, openAdmissionModal } = useSchool();

  const steps = [
    {
      number: '01',
      title: t.step1Title,
      desc: t.step1Desc,
      icon: HelpCircle,
      color: 'from-amber-500 to-amber-600',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      number: '02',
      title: t.step2Title,
      desc: t.step2Desc,
      icon: FileText,
      color: 'from-blue-500 to-indigo-600',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
    },
    {
      number: '03',
      title: t.step3Title,
      desc: t.step3Desc,
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
    },
    {
      number: '04',
      title: t.step4Title,
      desc: t.step4Desc,
      icon: CheckCircle2,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    }
  ];

  const eligibility = [
    { classLevel: 'Pre-KG / Nursery', ageCriteria: '2.5 to 3 Years', seats: 'Available' },
    { classLevel: 'L.K.G & U.K.G', ageCriteria: '3.5 to 4.5 Years', seats: 'Filling Fast' },
    { classLevel: 'Classes I to V (Primary)', ageCriteria: '5.5+ Years as on 31st July', seats: 'Available' },
    { classLevel: 'Classes VI to IX (Middle & High)', ageCriteria: 'Previous School TC & Marksheet', seats: 'Available' },
    { classLevel: 'Class XI (Higher Secondary)', ageCriteria: 'Std X Board Marksheet (Science/Arts/Commerce)', seats: 'Limited Seats' }
  ];

  return (
    <section id="admissions" className="py-16 sm:py-24 bg-[#FCFAF7] relative overflow-hidden border-b border-[#E5E0D8]">
      
      {/* Decorative background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D9D3C7] font-['Cinzel',serif] text-8xl md:text-9xl font-black select-none pointer-events-none opacity-25">
        ADMISSIONS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-3 border border-[#5A5A40]/20">
            <GraduationCap className="w-4 h-4 text-[#5A5A40]" />
            <span>{t.admissionsSubHeading}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {t.admissionsHeading}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-3 font-medium">
            {t.admissionsTagline}
          </p>
          <div className="w-20 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* 4-Step Process Flowchart */}
        <div id="admissions-flowchart" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                id={`admission-step-${idx + 1}`}
                className="relative bg-white rounded-3xl p-6 border border-[#E5E0D8] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Arrow Connector on desktop */}
                {idx < 3 && (
                  <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#5A5A40] text-white items-center justify-center shadow-sm">
                    <ArrowRight className="w-4 h-4 font-bold" />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D8] flex items-center justify-center text-[#5A5A40] shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-[#D9D3C7] font-['Cinzel',serif] group-hover:text-[#5A5A40] transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#2C2A26] font-['Cinzel',serif] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#706B63] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5F2ED] flex items-center gap-1.5 text-[11px] font-semibold text-[#5A5A40]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>{language === 'ta' ? 'எளிய வழிமுறை' : 'Seamless Process'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Admissions Callout Box */}
        <div 
          id="admissions-action-card"
          className="bg-[#5A5A40] rounded-3xl p-8 sm:p-10 shadow-xl border border-[#484833] text-white flex flex-col lg:flex-row items-center justify-between gap-8 mb-14"
        >
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>{language === 'ta' ? 'மழலையர் முதல் 12-ஆம் வகுப்பு வரை' : 'Open for Pre-KG to Std XII'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Cinzel',serif]">
              {language === 'ta' ? 'உங்கள் குழந்தையின் சேர்க்கைக்கு விண்ணப்பிக்கவும்' : 'Ready to Enroll Your Child?'}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {language === 'ta'
                ? 'ஆன்லைன் விண்ணப்பத்தை 3 நிமிடங்களில் எளிதாக பூர்த்தி செய்து, சேர்க்கை குறிப்பு எண்ணைப் பெறலாம்.'
                : 'Fill out our simplified 3-minute online application form now to reserve your seat and schedule a friendly interaction session.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              id="btn-admissions-hub-apply"
              onClick={openAdmissionModal}
              className="bg-[#FF6321] hover:bg-[#E25213] text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 text-white" />
              <span>{t.btnStartApplication}</span>
            </button>

            <a
              id="btn-download-prospectus"
              href="#contact"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-6 py-4 rounded-2xl transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-white" />
              <span>{t.btnDownloadProspectus}</span>
            </a>
          </div>
        </div>

        {/* Eligibility Criteria & Documentation Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Eligibility Criteria Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm">
            <h4 className="text-base sm:text-lg font-bold text-[#2C2A26] font-['Cinzel',serif] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#5A5A40]" />
              <span>{t.admissionsEligibilityTitle}</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E5E0D8] text-[#8A847C] font-semibold">
                    <th className="pb-3">{language === 'ta' ? 'வகுப்பு' : 'Class Standard'}</th>
                    <th className="pb-3">{language === 'ta' ? 'வயது / தகுதி' : 'Age / Eligibility'}</th>
                    <th className="pb-3 text-right">{language === 'ta' ? 'நிலை' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F2ED] text-[#3D3A35]">
                  {eligibility.map((row, i) => (
                    <tr key={i} className="hover:bg-[#FCFAF7] transition-colors">
                      <td className="py-3 font-semibold text-[#2C2A26]">{row.classLevel}</td>
                      <td className="py-3 text-[#706B63]">{row.ageCriteria}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          row.seats === 'Filling Fast' || row.seats === 'Limited Seats'
                            ? 'bg-[#FF6321]/15 text-[#FF6321] border border-[#FF6321]/30'
                            : 'bg-[#5A5A40]/10 text-[#5A5A40] border border-[#5A5A40]/20'
                        }`}>
                          {row.seats}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#2C2A26] font-['Cinzel',serif] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#5A5A40]" />
                <span>{language === 'ta' ? 'சேர்க்கைக்குத் தேவையான ஆவணங்கள்' : 'Documents Checklist for Admission'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#3D3A35]">
                <div className="flex items-start gap-2 bg-[#F5F2ED] p-2.5 rounded-2xl border border-[#E5E0D8]">
                  <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                  <span>{language === 'ta' ? 'குழந்தையின் பிறப்புச் சான்றிதழ் நகல்' : 'Original & Copy of Birth Certificate'}</span>
                </div>
                <div className="flex items-start gap-2 bg-[#F5F2ED] p-2.5 rounded-2xl border border-[#E5E0D8]">
                  <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                  <span>{language === 'ta' ? 'மாணவரின் பாஸ்போர்ட் அளவு புகைப்படங்கள் (4)' : '4 Passport Size Color Photos of Student'}</span>
                </div>
                <div className="flex items-start gap-2 bg-[#F5F2ED] p-2.5 rounded-2xl border border-[#E5E0D8]">
                  <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                  <span>{language === 'ta' ? 'முந்தைய பள்ளியின் மாற்றுச் சான்றிதழ் (TC)' : 'Transfer Certificate (TC from Std II upwards)'}</span>
                </div>
                <div className="flex items-start gap-2 bg-[#F5F2ED] p-2.5 rounded-2xl border border-[#E5E0D8]">
                  <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                  <span>{language === 'ta' ? 'ஆதார் அட்டை நகல் (மாணவர் & பெற்றோர்)' : 'Copy of Aadhaar Card (Student & Parents)'}</span>
                </div>
                <div className="flex items-start gap-2 bg-[#F5F2ED] p-2.5 rounded-2xl border border-[#E5E0D8]">
                  <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                  <span>{language === 'ta' ? 'சமூக சான்றிதழ் நகல்' : 'Community Certificate Copy'}</span>
                </div>
                <div className="flex items-start gap-2 bg-[#F5F2ED] p-2.5 rounded-2xl border border-[#E5E0D8]">
                  <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                  <span>{language === 'ta' ? 'முந்தைய வகுப்பு மதிப்பெண் அறிக்கை' : 'Previous Academic Progress Report'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-[#8A847C]">
              <span>{language === 'ta' ? 'உதவிக்கு அலுவலகத்தை அழைக்கவும்' : 'For admission inquiries & fee details:'}</span>
              <a href="tel:+919629978066" className="font-bold text-[#5A5A40] hover:text-[#2C2A26] flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+91 96299 78066</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
