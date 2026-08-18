import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { SchoolLogo } from './SchoolLogo';
import { examTimetableSample, schoolBusRoutes } from '../data/schoolData';
import { 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  Bus, 
  Download, 
  Clock, 
  Phone, 
  CheckCircle2, 
  FileText, 
  Search, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const StudentParentPortal: React.FC = () => {
  const { language, t } = useSchool();
  const [activeTab, setActiveTab] = useState<'timetable' | 'fee' | 'bus' | 'downloads'>('timetable');

  // Online Fee Demo Simulator state
  const [studentRollNo, setStudentRollNo] = useState('');
  const [selectedFeeTerm, setSelectedFeeTerm] = useState('Term 1 (Aug - Nov 2026)');
  const [feeStatus, setFeeStatus] = useState<null | { student: string; class: string; amount: number; isPaid: boolean }>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleFeeLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentRollNo.trim()) return;

    setFeeStatus({
      student: 'Master / Miss Student (' + studentRollNo.toUpperCase() + ')',
      class: 'Class X - Matriculation',
      amount: 4500,
      isPaid: false
    });
    setPaymentSuccess(false);
  };

  const handleSimulatePayment = () => {
    setPaymentSuccess(true);
    if (feeStatus) {
      setFeeStatus({ ...feeStatus, isPaid: true });
    }
  };

  return (
    <section id="student-portal" className="py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#E5E0D8] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-3 border border-[#5A5A40]/20">
            <GraduationCap className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>{language === 'ta' ? 'மாணவர் & பெற்றோர் சேவை தளம்' : 'Parent & Student Services'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {t.portalHeading}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {t.portalSubHeading}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* Portal Nav Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          <button
            id="portal-tab-timetable"
            onClick={() => setActiveTab('timetable')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'timetable'
                ? 'bg-[#5A5A40] text-white border-[#484833] shadow-xs'
                : 'bg-[#F5F2ED] text-[#3D3A35] border-[#E5E0D8] hover:bg-[#EAE4DC]'
            }`}
          >
            <Calendar className={`w-4 h-4 ${activeTab === 'timetable' ? 'text-white' : 'text-[#5A5A40]'}`} />
            <span>{t.tabTimetable}</span>
          </button>

          <button
            id="portal-tab-fee"
            onClick={() => setActiveTab('fee')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'fee'
                ? 'bg-[#5A5A40] text-white border-[#484833] shadow-xs'
                : 'bg-[#F5F2ED] text-[#3D3A35] border-[#E5E0D8] hover:bg-[#EAE4DC]'
            }`}
          >
            <CreditCard className={`w-4 h-4 ${activeTab === 'fee' ? 'text-white' : 'text-[#5A5A40]'}`} />
            <span>{t.tabFeeInfo}</span>
          </button>

          <button
            id="portal-tab-bus"
            onClick={() => setActiveTab('bus')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'bus'
                ? 'bg-[#5A5A40] text-white border-[#484833] shadow-xs'
                : 'bg-[#F5F2ED] text-[#3D3A35] border-[#E5E0D8] hover:bg-[#EAE4DC]'
            }`}
          >
            <Bus className={`w-4 h-4 ${activeTab === 'bus' ? 'text-white' : 'text-[#5A5A40]'}`} />
            <span>{t.tabBusRoutes}</span>
          </button>

          <button
            id="portal-tab-downloads"
            onClick={() => setActiveTab('downloads')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'downloads'
                ? 'bg-[#5A5A40] text-white border-[#484833] shadow-xs'
                : 'bg-[#F5F2ED] text-[#3D3A35] border-[#E5E0D8] hover:bg-[#EAE4DC]'
            }`}
          >
            <Download className={`w-4 h-4 ${activeTab === 'downloads' ? 'text-white' : 'text-[#5A5A40]'}`} />
            <span>{t.tabDownloads}</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E0D8] shadow-xs">
          
          {/* TAB 1: EXAM TIMETABLES */}
          {activeTab === 'timetable' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E5E0D8] pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-['Cinzel',serif] text-[#2C2A26]">
                    {language === 'ta' ? 'முதல் இடைப்பருவத் தேர்வு அட்டவணை (ஆகஸ்ட் 2026)' : 'First Mid-Term Examination Schedule (August 2026)'}
                  </h3>
                  <p className="text-xs text-[#706B63] font-normal">
                    {language === 'ta' ? 'வகுப்புகள் 10 மற்றும் 12 மாணவர்களுக்கான பாட வாரியான தேர்வு அட்டவணை' : 'Detailed subject schedule with timings and portion units'}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#5A5A40] bg-[#F5F2ED] px-4 py-1.5 rounded-full border border-[#E5E0D8]">
                  Hall Ticket Required
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {examTimetableSample.map((exam, i) => (
                  <div key={i} className="bg-[#F5F2ED] rounded-3xl p-6 border border-[#E5E0D8] shadow-xs">
                    <div className="flex items-center justify-between mb-4 border-b border-[#E5E0D8] pb-3">
                      <span className="font-bold text-[#2C2A26] font-['Cinzel',serif] text-base">{exam.standard}</span>
                      <span className="text-xs font-semibold text-[#5A5A40] bg-white px-3 py-1 rounded-full border border-[#E5E0D8]">{exam.examName}</span>
                    </div>

                    <div className="space-y-2.5">
                      {exam.subjects.map((sub, idx) => (
                        <div key={idx} className="p-3 rounded-2xl bg-white border border-[#E5E0D8] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 shadow-2xs">
                          <div>
                            <span className="font-bold text-[#2C2A26] block sm:inline mr-2">
                              {language === 'ta' ? sub.subjectTa : sub.subject}
                            </span>
                            <span className="text-[#706B63] text-[11px] block sm:inline font-normal">Portion: {sub.portion}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-semibold text-[#5A5A40] block text-[11px]">{sub.date}</span>
                            <span className="text-[10px] text-[#8A847C] block">{sub.timing}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ONLINE FEE PORTAL SIMULATOR */}
          {activeTab === 'fee' && (
            <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold font-['Cinzel',serif] text-[#2C2A26]">
                  {language === 'ta' ? 'ஆன்லைன் பள்ளி கல்விக் கட்டணம்' : 'Online Tuition Fee Portal & Calculator'}
                </h3>
                <p className="text-xs text-[#706B63] mt-1 font-normal">
                  {language === 'ta' ? 'மாணவர் சேர்க்கை / ரோல் எண்ணை உள்ளிட்டு கட்டண நிலையை அறியலாம்' : 'Enter student Roll Number / Admission Number to view and pay pending dues'}
                </p>
              </div>

              <form onSubmit={handleFeeLookup} className="bg-[#F5F2ED] p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2C2A26] mb-1.5">
                    {language === 'ta' ? 'மாணவர் சேர்க்கை / ரோல் எண் (Roll No)' : 'Student Admission No. / Roll No.'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="e.g. HMS-2026-0814 or 10A14"
                      value={studentRollNo}
                      onChange={(e) => setStudentRollNo(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-full border border-[#E5E0D8] bg-white text-xs sm:text-sm text-[#2C2A26] outline-none focus:border-[#5A5A40] focus:ring-1 focus:ring-[#5A5A40]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs rounded-full transition-colors cursor-pointer uppercase shadow-xs"
                    >
                      {language === 'ta' ? 'தேடு' : 'Search Dues'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2A26] mb-1.5">
                    {language === 'ta' ? 'பருவம் (Fee Term)' : 'Select Fee Term'}
                  </label>
                  <select
                    value={selectedFeeTerm}
                    onChange={(e) => setSelectedFeeTerm(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full border border-[#E5E0D8] text-xs bg-white text-[#2C2A26] outline-none"
                  >
                    <option>Term 1 (Aug - Nov 2026)</option>
                    <option>Term 2 (Dec 2026 - Mar 2027)</option>
                    <option>Annual Comprehensive School Kit Fee</option>
                    <option>School Bus Transport Fee (Term 1)</option>
                  </select>
                </div>
              </form>

              {feeStatus && (
                <div className="bg-[#F5F2ED] p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-xs space-y-4 animate-in fade-in">
                  <div className="flex justify-between items-center border-b border-[#E5E0D8] pb-3">
                    <div className="flex items-center gap-3">
                      <SchoolLogo size="xs" variant="emblem" />
                      <div>
                        <h4 className="font-bold text-[#2C2A26] text-sm">{feeStatus.student}</h4>
                        <p className="text-xs text-[#706B63]">{feeStatus.class}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      feeStatus.isPaid ? 'bg-white text-[#5A5A40] border border-[#E5E0D8]' : 'bg-[#FF6321]/15 text-[#FF6321] border border-[#FF6321]/30'
                    }`}>
                      {feeStatus.isPaid ? 'PAID ✓' : 'PAYMENT DUE'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#E5E0D8]">
                    <span className="text-xs text-[#706B63] font-medium">{selectedFeeTerm}</span>
                    <span className="text-base font-bold text-[#2C2A26]">₹ {feeStatus.amount.toLocaleString('en-IN')}</span>
                  </div>

                  {paymentSuccess ? (
                    <div className="p-3.5 bg-white border border-[#5A5A40]/30 rounded-2xl text-[#5A5A40] text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0" />
                      <span>Payment Receipt #RCP-2026-881 Generated! Thank you for the payment.</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleSimulatePayment}
                      className="w-full py-3 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold rounded-full text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer uppercase"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay ₹ {feeStatus.amount} Online (UPI / Card / NetBanking)</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SCHOOL BUS ROUTES */}
          {activeTab === 'bus' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-[#E5E0D8] pb-4">
                <h3 className="text-lg sm:text-xl font-bold font-['Cinzel',serif] text-[#2C2A26]">
                  {language === 'ta' ? 'பள்ளிப் பேருந்து வழித்தடங்கள் & நேரங்கள்' : 'School Bus Routes & Timings'}
                </h3>
                <p className="text-xs text-[#706B63] font-normal">
                  {language === 'ta' ? 'லாலாபேட்டை, குளித்தலை, மாயனூர், பெட்டவாய்த்தலை மற்றும் சுற்றுவட்டார கிராமங்கள்' : 'GPS-enabled school fleet covering Lalapet, Kulithalai, Mayanur & suburban stops'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {schoolBusRoutes.map((bus, idx) => (
                  <div key={idx} className="bg-[#F5F2ED] rounded-3xl p-6 border border-[#E5E0D8] shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#5A5A40] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          <Bus className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#2C2A26] text-sm font-['Cinzel',serif]">{bus.routeNo}</h4>
                          <span className="text-[11px] text-[#5A5A40] font-semibold">{language === 'ta' ? bus.routeNameTa : bus.routeName}</span>
                        </div>
                      </div>

                      <div className="mt-3 space-y-1.5 text-xs text-[#3D3A35]">
                        <span className="font-semibold text-[#2C2A26] text-[11px] block">Key Boarding Stops:</span>
                        <div className="flex flex-wrap gap-1">
                          {bus.stops.map((stop, sidx) => (
                            <span key={sidx} className="bg-white border border-[#E5E0D8] text-[#3D3A35] px-2.5 py-0.5 rounded-full text-[10px]">
                              • {stop}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E5E0D8] text-xs text-[#706B63] space-y-1 font-normal">
                      <div className="flex justify-between">
                        <span className="text-[11px]">Morning Pickup:</span>
                        <span className="font-semibold text-[#2C2A26] text-[11px]">{bus.morningTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[11px]">Driver Incharge:</span>
                        <span className="font-semibold text-[#2C2A26] text-[11px]">{bus.driverName}</span>
                      </div>
                      <div className="flex justify-between text-[#5A5A40] font-semibold text-[11px]">
                        <span>Helpline:</span>
                        <span>{bus.contactNumber}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DOWNLOADS & CIRCULARS */}
          {activeTab === 'downloads' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-[#E5E0D8] pb-4">
                <h3 className="text-lg sm:text-xl font-bold font-['Cinzel',serif] text-[#2C2A26]">
                  {language === 'ta' ? 'பாடத்திட்டம் & பதிவிறக்கங்கள்' : 'Downloadable School Forms & Documents'}
                </h3>
                <p className="text-xs text-[#706B63] font-normal">
                  {language === 'ta' ? 'அதிகாரப்பூர்வ பள்ளி விண்ணப்பப் படிவங்கள் மற்றும் சுற்றறிக்கைகள்' : 'Official forms, prospectus and academic guidelines in PDF format'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'School Prospectus & Code of Conduct 2026-27', size: '2.4 MB PDF' },
                  { title: 'Medical Fitness & Blood Group Declaration Form', size: '420 KB PDF' },
                  { title: 'School Bus Transportation Enrollment Form', size: '510 KB PDF' },
                  { title: 'Tamil Nadu Matriculation Syllabus Guidelines (Std 1-10)', size: '3.1 MB PDF' },
                  { title: 'Higher Secondary Group Selection Orientation Guide', size: '1.8 MB PDF' },
                  { title: 'Student Leave & Bonafide Certificate Request Slip', size: '350 KB PDF' }
                ].map((doc, i) => (
                  <div key={i} className="bg-[#F5F2ED] p-4 rounded-3xl border border-[#E5E0D8] shadow-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-[#E5E0D8] text-[#5A5A40] flex items-center justify-center shrink-0 shadow-2xs">
                        <FileText className="w-5 h-5 text-[#5A5A40]" />
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-[#2C2A26] truncate">{doc.title}</h4>
                        <span className="text-[10px] text-[#8A847C]">{doc.size}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Simulating download of: ${doc.title}`)}
                      className="p-2.5 rounded-full bg-white border border-[#E5E0D8] hover:bg-[#5A5A40] hover:text-white text-[#3D3A35] transition-colors shrink-0 cursor-pointer shadow-2xs"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
