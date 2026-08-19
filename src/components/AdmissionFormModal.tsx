import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { SchoolLogo } from './SchoolLogo';
import confetti from 'canvas-confetti';
import { 
  X, 
  GraduationCap, 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  UploadCloud, 
  CheckCircle2, 
  Printer, 
  Sparkles, 
  Heart,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export const AdmissionFormModal: React.FC = () => {
  const { isAdmissionModalOpen, closeAdmissionModal, submitApplication, language, t } = useSchool();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [generatedRef, setGeneratedRef] = useState<string>('');

  // Form Fields State
  const [studentName, setStudentName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [dob, setDob] = useState('');
  const [standard, setStandard] = useState('Class I');
  const [parentName, setParentName] = useState('');
  const [relationship, setRelationship] = useState<'Father' | 'Mother' | 'Guardian'>('Father');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');
  const [docFileName, setDocFileName] = useState('');
  const [formError, setFormError] = useState('');

  const classOptions = [
    'Pre-KG', 'L.K.G', 'U.K.G',
    'Class I', 'Class II', 'Class III', 'Class IV', 'Class V',
    'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X',
    'Class XI (Science - Bio Maths)', 'Class XI (Computer Science)', 'Class XI (Commerce - Accounts)',
    'Class XII (Science - Bio Maths)', 'Class XII (Computer Science)', 'Class XII (Commerce - Accounts)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!studentName.trim() || !parentName.trim() || !mobileNumber.trim() || !dob) {
      setFormError(language === 'ta' ? 'தயவுசெய்து அனைத்து கட்டாய விவரங்களையும் பூர்த்தி செய்யவும்.' : 'Please fill all mandatory fields (*).');
      return;
    }

    const ref = submitApplication({
      studentName,
      gender,
      dob,
      standard,
      parentName,
      relationship,
      mobileNumber,
      email: email || `${studentName.toLowerCase().replace(/\s+/g, '')}@parent.com`,
      address: address || 'Lalapet, Tamil Nadu',
      previousSchool,
      bloodGroup,
      specialNeeds,
      hasDocuments: Boolean(docFileName || photoFileName)
    });

    setGeneratedRef(ref);
    setStep('success');

    // Trigger Confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if confetti blocked
    }
  };

  const handleResetAndClose = () => {
    setStep('form');
    setStudentName('');
    setDob('');
    setParentName('');
    setMobileNumber('');
    setEmail('');
    setAddress('');
    setPreviousSchool('');
    setPhotoFileName('');
    setDocFileName('');
    closeAdmissionModal();
  };

  const handlePrintSlip = () => {
    window.print();
  };

  if (!isAdmissionModalOpen) return null;

  return (
    <div 
      id="admission-form-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2C2A26]/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleResetAndClose}
    >
      <div 
        id="admission-modal-card"
        className="relative bg-[#FCFAF7] rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E5E0D8] max-h-[92vh] flex flex-col overflow-hidden text-[#3D3A35]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#24221E] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#3A3731] shrink-0">
          <div className="flex items-center gap-3.5">
            <SchoolLogo size="sm" variant="emblem" glow className="bg-white/10 p-0.5 rounded-full border border-white/20" />
            <div>
              <h3 className="text-base sm:text-lg font-bold font-['Cinzel',serif] text-[#FCFAF7]">
                {language === 'ta' ? 'ஆன்லைன் சேர்க்கை விண்ணப்பம் 2026–27' : 'Online Admission Application 2026–27'}
              </h3>
              <p className="text-xs text-[#D8D2C5] font-medium">
                Holy Madonna's Matriculation Higher Secondary School, Lalapet
              </p>
            </div>
          </div>
          <button
            id="btn-close-admission-modal"
            onClick={handleResetAndClose}
            className="p-2 rounded-full bg-[#2D2A24] hover:bg-[#38342D] text-[#C8C2B4] hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#FCFAF7]">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Student Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#E5E0D8] pb-1.5 font-['Cinzel',serif]">
                  <User className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? '1. மாணவர் விவரங்கள் (Student Details)' : '1. Student Details'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#524E48] mb-1">
                      {language === 'ta' ? 'மாணவர் பெயர் *' : 'Student Full Name *'}
                    </label>
                    <input
                      id="input-student-name"
                      type="text"
                      required
                      placeholder="e.g. S. Kavitha"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] bg-white focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-sm outline-none transition-all text-[#2C2A26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524E48] mb-1">
                      {language === 'ta' ? 'சேர்க்கை விரும்பும் வகுப்பு *' : 'Class Seeking Admission *'}
                    </label>
                    <select
                      id="select-admission-class"
                      value={standard}
                      onChange={(e) => setStandard(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-sm outline-none bg-white transition-all font-medium text-[#2C2A26]"
                    >
                      {classOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#524E48] mb-1">
                      {language === 'ta' ? 'பிறந்த தேதி *' : 'Date of Birth *'}
                    </label>
                    <input
                      id="input-student-dob"
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] bg-white focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-sm outline-none transition-all text-[#2C2A26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524E48] mb-1">
                      {language === 'ta' ? 'பாலினம்' : 'Gender'}
                    </label>
                    <select
                      id="select-student-gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-sm outline-none bg-white transition-all text-[#2C2A26]"
                    >
                      <option value="Male">{language === 'ta' ? 'ஆண் (Male)' : 'Male'}</option>
                      <option value="Female">{language === 'ta' ? 'பெண் (Female)' : 'Female'}</option>
                      <option value="Other">{language === 'ta' ? 'பிற (Other)' : 'Other'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524E48] mb-1">
                      {language === 'ta' ? 'இரத்த வகை' : 'Blood Group'}
                    </label>
                    <select
                      id="select-blood-group"
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-sm outline-none bg-white transition-all text-[#2C2A26]"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#524E48] mb-1">
                    {language === 'ta' ? 'முந்தைய பள்ளி பெயர் (இருப்பின்)' : 'Previous School Attended (If any)'}
                  </label>
                  <input
                    id="input-previous-school"
                    type="text"
                    placeholder="e.g. St. Joseph Nursery School"
                    value={previousSchool}
                    onChange={(e) => setPreviousSchool(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] bg-white focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-sm outline-none transition-all text-[#2C2A26]"
                  />
                </div>
              </div>

              {/* 2. Parent & Contact Details */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#E5E0D8] pb-1.5 font-['Cinzel',serif]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? '2. பெற்றோர் & தொடர்பு விவரங்கள் (Parent Details)' : '2. Parent & Contact Details'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#524E48] mb-1">
                      {language === 'ta' ? 'பெற்றோர் / பாதுகாவலர் பெயர் *' : 'Parent / Guardian Name *'}
                    </label>
                    <input
                      id="input-parent-name"
                      type="text"
                      required
                      placeholder="e.g. Mr. K. Shanmugam"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] bg-white focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-sm outline-none transition-all text-[#2C2A26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524E48] mb-1">
                      {language === 'ta' ? 'உறவுமுறை' : 'Relationship'}
                    </label>
                    <select
                      id="select-relationship"
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-sm outline-none bg-white transition-all text-[#2C2A26]"
                    >
                      <option value="Father">{language === 'ta' ? 'தந்தை (Father)' : 'Father'}</option>
                      <option value="Mother">{language === 'ta' ? 'தாய் (Mother)' : 'Mother'}</option>
                      <option value="Guardian">{language === 'ta' ? 'பாதுகாவலர் (Guardian)' : 'Guardian'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#524E48] mb-1">
                      {language === 'ta' ? 'அலைபேசி எண் (WhatsApp) *' : 'Mobile Number (WhatsApp) *'}
                    </label>
                    <input
                      id="input-mobile-number"
                      type="tel"
                      required
                      placeholder="+91 99434 XXXXX"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] bg-white focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-sm outline-none transition-all text-[#2C2A26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524E48] mb-1">
                      {language === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}
                    </label>
                    <input
                      id="input-email-address"
                      type="email"
                      placeholder="parent@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] bg-white focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-sm outline-none transition-all text-[#2C2A26]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#524E48] mb-1">
                    {language === 'ta' ? 'வீட்டு முகவரி (லாலாபேட்டை / சுற்றுவட்டாரம்)' : 'Residential Address (Lalapet / Surrounds)'}
                  </label>
                  <textarea
                    id="input-address"
                    rows={2}
                    placeholder="Door No, Street Name, Village/Town, Pincode"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5CEC2] bg-white focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-sm outline-none transition-all text-[#2C2A26]"
                  />
                </div>
              </div>

              {/* 3. Upload Photo & Documents */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#E5E0D8] pb-1.5 font-['Cinzel',serif]">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? '3. புகைப்பட & ஆவணப் பதிவேற்றம் (Uploads)' : '3. Upload Photo & Documents'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-[#D5CEC2] hover:border-[#5A5A40] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-[#F5F2ED]">
                    <label className="cursor-pointer block">
                      <UploadCloud className="w-6 h-6 text-[#8C857B] mx-auto mb-1" />
                      <span className="text-xs font-semibold text-[#3D3A35] block">
                        {photoFileName || (language === 'ta' ? 'மாணவர் புகைப்படம் (Photo)' : 'Upload Student Photo')}
                      </span>
                      <span className="text-[10px] text-[#8C857B]">JPG, PNG (Max 5MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setPhotoFileName(e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="border-2 border-dashed border-[#D5CEC2] hover:border-[#5A5A40] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-[#F5F2ED]">
                    <label className="cursor-pointer block">
                      <FileCheck className="w-6 h-6 text-[#8C857B] mx-auto mb-1" />
                      <span className="text-xs font-semibold text-[#3D3A35] block truncate">
                        {docFileName || (language === 'ta' ? 'பிறப்புச் சான்றிதழ் / TC (PDF)' : 'Birth Certificate / TC (PDF)')}
                      </span>
                      <span className="text-[10px] text-[#8C857B]">PDF or Document (Max 10MB)</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setDocFileName(e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-xl border border-[#D5CEC2] text-[#524E48] font-semibold text-sm hover:bg-[#F5F2ED] transition-colors"
                >
                  {t.closeModal}
                </button>
                <button
                  id="btn-submit-admission-form"
                  type="submit"
                  className="bg-[#5A5A40] hover:bg-[#4E4E37] text-white font-bold px-7 py-2.5 rounded-xl shadow-md transition-all text-sm flex items-center gap-2 cursor-pointer border border-[#6E6E52]"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>{language === 'ta' ? 'விண்ணப்பத்தைச் சமர்ப்பிக்க' : 'Submit Application'}</span>
                </button>
              </div>

            </form>
          ) : (
            /* Success & Reference Card View */
            <div id="admission-success-view" className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-[#EAE5DC] text-[#5A5A40] rounded-full flex items-center justify-center mx-auto shadow-md border border-[#D5CEC2]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5A5A40] bg-[#EAE5DC] px-3 py-1 rounded-full mb-2 border border-[#D5CEC2]">
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'ta' ? 'விண்ணப்பம் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது' : 'Application Received Successfully!'}
                </span>
                <h3 className="text-2xl font-extrabold text-[#2C2A26] font-['Cinzel',serif]">
                  {language === 'ta' ? 'ஹோலி மடோனாஸ் பள்ளிக்கு நன்றி!' : 'Welcome to Holy Madonnas School!'}
                </h3>
                <p className="text-xs sm:text-sm text-[#736E65] max-w-md mx-auto mt-1">
                  {language === 'ta'
                    ? 'உங்கள் விண்ணப்பம் பரிசீலிக்கப்பட்டு வருகிறது. பள்ளி நிர்வாக அலுவலகத்திலிருந்து விரைவில் உங்களைத் தொடர்புகொள்வார்கள்.'
                    : 'Your application has been logged into our admissions portal. Our school counselor will contact you for the interaction schedule.'}
                </p>
              </div>

              {/* Reference Number Box */}
              <div className="bg-[#24221E] text-white p-5 rounded-2xl max-w-md mx-auto border border-[#3A3731] text-left shadow-xl">
                <div className="flex justify-between items-center border-b border-[#3A3731] pb-2 mb-3">
                  <span className="text-xs text-[#A6A095] font-medium">Application Reference Number</span>
                  <span className="text-xs text-[#D8D2C5] font-bold bg-[#38342D] px-2 py-0.5 rounded border border-[#4A4740]">STATUS: PENDING</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#FCFAF7] font-mono tracking-widest text-center py-2 bg-[#1C1A17] rounded-xl border border-[#3A3731]">
                  {generatedRef}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#D8D2C5] mt-3 pt-2 border-t border-[#3A3731]">
                  <div>
                    <span className="text-[#8C857B] block">Student:</span>
                    <span className="font-semibold text-white">{studentName}</span>
                  </div>
                  <div>
                    <span className="text-[#8C857B] block">Class:</span>
                    <span className="font-semibold text-white">{standard}</span>
                  </div>
                  <div>
                    <span className="text-[#8C857B] block">Parent:</span>
                    <span className="font-semibold text-white">{parentName}</span>
                  </div>
                  <div>
                    <span className="text-[#8C857B] block">Phone:</span>
                    <span className="font-semibold text-white">{mobileNumber}</span>
                  </div>
                </div>
              </div>

              {/* Next Action Steps */}
              <div className="bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl p-4 text-xs text-[#3D3A35] text-left max-w-md mx-auto">
                <span className="font-bold text-[#2C2A26] block mb-1">
                  {language === 'ta' ? 'அடுத்த கட்ட நடவடிக்கைகள்:' : 'Next Steps:'}
                </span>
                <ul className="list-disc list-inside space-y-1 text-[#524E48]">
                  <li>{language === 'ta' ? 'குறிப்பு எண்ணை குறித்து வைத்துக் கொள்ளவும்.' : 'Please note or screenshot this Reference Number.'}</li>
                  <li>{language === 'ta' ? 'அசல் பிறப்புச் சான்றிதழ் மற்றும் 4 புகைப்படங்களை நேரில் கொண்டு வரவும்.' : 'Keep original Birth Certificate & photos ready for interaction.'}</li>
                  <li>{language === 'ta' ? 'பள்ளி அலுவலக நேரம்: காலை 8:30 முதல் மாலை 4:30 வரை.' : 'Office Working Hours: Mon-Sat 8:30 AM to 4:30 PM.'}</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  id="btn-print-admission-slip"
                  onClick={handlePrintSlip}
                  className="px-4 py-2.5 bg-[#EAE5DC] hover:bg-[#DDD7CC] text-[#3D3A35] font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors border border-[#D5CEC2]"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'ta' ? 'ஒப்புதல் ரசீது அச்சிடுக' : 'Print Acknowledgment'}</span>
                </button>
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-[#5A5A40] hover:bg-[#4E4E37] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors border border-[#6E6E52]"
                >
                  {language === 'ta' ? 'முடிந்தது' : 'Done & Return to Homepage'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
