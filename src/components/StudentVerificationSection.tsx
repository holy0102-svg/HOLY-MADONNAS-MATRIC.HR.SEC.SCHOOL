import React, { useState, useEffect } from 'react';
import { useSchool } from '../context/SchoolContext';
import { StudentVerificationRecord } from '../types';
import { SchoolLogo } from './SchoolLogo';
import { 
  ShieldCheck, 
  KeyRound, 
  Smartphone, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Lock, 
  FileText, 
  QrCode, 
  Printer, 
  Check, 
  Info, 
  Building2, 
  UserCheck, 
  ExternalLink,
  Fingerprint,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface StudentVerificationSectionProps {
  embeddedInPortal?: boolean;
}

export const StudentVerificationSection: React.FC<StudentVerificationSectionProps> = ({ embeddedInPortal = false }) => {
  const { 
    language, 
    t, 
    verifications, 
    sendStudentOtp, 
    verifyStudentOtp, 
    completeAadhaarKyc 
  } = useSchool();

  // Form inputs
  const [admissionNo, setAdmissionNo] = useState('HMM-2026-001');
  const [dob, setDob] = useState('2019-05-14');
  const [mobileNumber, setMobileNumber] = useState('+91 94432 55101');

  // Multi-step State
  // Step 1: Input details -> Step 2: OTP Verification -> Step 3: UIDAI e-KYC -> Step 4: Verified Result
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // OTP State
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [simulatedSmsBanner, setSimulatedSmsBanner] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeRecord, setActiveRecord] = useState<StudentVerificationRecord | null>(null);

  // e-KYC Modal & Provider State
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [isKycProcessing, setIsKycProcessing] = useState(false);
  const [kycConsent, setKycConsent] = useState(true);
  const [kycSuccessMessage, setKycSuccessMessage] = useState('');

  // Countdown timer effect
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Handle Quick Demo Preset Selection
  const selectDemoProfile = (adm: string, birth: string, phone: string) => {
    setAdmissionNo(adm);
    setDob(birth);
    setMobileNumber(phone);
    setStep(1);
    setErrorMessage('');
    setSimulatedSmsBanner(null);
    setOtpDigits(['', '', '', '', '', '']);
  };

  // Step 1: Send OTP
  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!admissionNo.trim()) {
      setErrorMessage(language === 'ta' ? 'சேர்க்கை எண்ணை உள்ளிடவும்' : 'Please enter Admission / Application Number');
      return;
    }
    if (!dob) {
      setErrorMessage(language === 'ta' ? 'பிறந்த தேதியை உள்ளிடவும்' : 'Please enter Date of Birth');
      return;
    }
    if (!mobileNumber.trim()) {
      setErrorMessage(language === 'ta' ? 'அலைபேசி எண்ணை உள்ளிடவும்' : 'Please enter Registered Mobile Number');
      return;
    }

    setIsSendingOtp(true);
    setTimeout(() => {
      const res = sendStudentOtp(admissionNo, dob, mobileNumber);
      setIsSendingOtp(false);

      if (res.success && res.otpCode) {
        setStep(2);
        setActiveRecord(res.record || null);
        setSimulatedSmsBanner(`🔔 SMS Gateway to ${mobileNumber}: Your Holy Madonnas student verification OTP is ${res.otpCode} (Valid for 5 mins)`);
        setTimerSeconds(60);
        setIsTimerRunning(true);

        // Pre-fill for ultra smooth testing if desired
        const digits = res.otpCode.split('');
        // Keep empty for user interaction, but user can easily click OTP banner or type
      } else {
        setErrorMessage(res.message || 'Failed to dispatch OTP');
      }
    }, 600);
  };

  // Step 2: Handle OTP Digit Change
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = val.slice(-1);
    setOtpDigits(newDigits);

    // Auto-focus next input box
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePasteOtp = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length > 0) {
      const digits = paste.split('');
      const newDigits = [...otpDigits];
      digits.forEach((d, i) => {
        if (i < 6) newDigits[i] = d;
      });
      setOtpDigits(newDigits);
    }
  };

  // Step 2: Verify OTP Submit
  const handleVerifyOtpSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    const fullOtp = otpDigits.join('');

    if (fullOtp.length < 6) {
      setErrorMessage(language === 'ta' ? 'முழுமையான 6-இலக்க OTP எண்ணை உள்ளிடவும்' : 'Please enter the complete 6-digit OTP');
      return;
    }

    setIsVerifyingOtp(true);
    setTimeout(() => {
      const res = verifyStudentOtp(admissionNo, dob, mobileNumber, fullOtp);
      setIsVerifyingOtp(false);

      if (res.success && res.record) {
        setActiveRecord(res.record);
        // If already e-KYC verified, go straight to certificate step 4; otherwise step 3 for UIDAI compliance
        if (res.record.aadhaarKycStatus === 'Verified') {
          setStep(4);
        } else {
          setStep(3);
        }
      } else {
        setErrorMessage(res.message);
      }
    }, 700);
  };

  // Step 3: Trigger UIDAI Authorized e-KYC
  const handleTriggerAadhaarKyc = () => {
    if (!kycConsent) {
      setErrorMessage(language === 'ta' ? 'தயவுசெய்து தனியுரிமை ஒப்புதலை ஏற்கவும்' : 'Please accept the UIDAI consent agreement');
      return;
    }
    setErrorMessage('');
    setIsKycProcessing(true);

    setTimeout(() => {
      const generatedRefId = `UIDAI-EK-2026-${Math.floor(1000 + Math.random() * 9000)}A`;
      if (activeRecord) {
        completeAadhaarKyc(activeRecord.id, generatedRefId);
        setActiveRecord({
          ...activeRecord,
          status: 'Verified',
          aadhaarKycStatus: 'Verified',
          aadhaarKycRefId: generatedRefId,
          verifiedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
        });
      }
      setIsKycProcessing(false);
      setKycSuccessMessage('UIDAI-compliant e-KYC verification successful! Cryptographic reference token stored.');
      setStep(4);
    }, 1200);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner Notice: Privacy & UIDAI Compliance */}
      <div className="bg-[#5A5A40]/10 border border-[#5A5A40]/25 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-[#2C2A26]">
        <ShieldCheck className="w-5 h-5 text-[#5A5A40] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm space-y-1">
          <div className="font-bold flex items-center gap-2">
            <span>{language === 'ta' ? 'தனியுரிமை & UIDAI விதிமுறை பாதுகாப்பு' : 'UIDAI-Compliant Privacy & e-KYC Architecture'}</span>
            <span className="bg-[#5A5A40] text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded-full">
              DPDP Act 2023
            </span>
          </div>
          <p className="text-[#524E48] leading-relaxed">
            {language === 'ta' 
              ? 'பள்ளி நிர்வாகம் மாணவர்களின் ஆதார் எண்களை நேரடியாகச் சேகரிப்பதில்லை. அங்கீகரிக்கப்பட்ட UIDAI e-KYC நுழைவாயில் மூலம் சரிபார்க்கப்பட்டு, மறைகுறியாக்கப்பட்ட குறிப்பு எண் மட்டுமே (Reference ID) பதிவு செய்யப்படுகிறது.'
              : 'Holy Madonnas School does not collect or store raw 12-digit Aadhaar numbers. Authentications run via authorized UIDAI e-KYC gateways, recording only cryptographic verification reference tokens.'}
          </p>
        </div>
      </div>

      {/* Simulated SMS Broadcast Toast */}
      {simulatedSmsBanner && (
        <div className="bg-[#2C2A26] text-white rounded-2xl p-4 shadow-lg flex items-start justify-between gap-3 animate-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm font-mono">
              <p className="font-semibold text-emerald-400">{language === 'ta' ? '📱 நேரலை SMS தகவல்' : '📱 Live Simulated SMS Dispatch'}</p>
              <p className="text-stone-200 mt-0.5">{simulatedSmsBanner}</p>
            </div>
          </div>
          <button 
            onClick={() => {
              // Click to auto-fill OTP
              const otpMatch = simulatedSmsBanner.match(/\b\d{6}\b/);
              if (otpMatch) {
                setOtpDigits(otpMatch[0].split(''));
              }
            }}
            className="text-[11px] bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-lg shrink-0 font-sans cursor-pointer transition-colors"
          >
            {language === 'ta' ? 'தானாக நிரப்பு' : 'Auto-Fill OTP'}
          </button>
        </div>
      )}

      {/* Quick Test Demo Profiles Bar */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[#706B63] font-semibold">{language === 'ta' ? 'மாதிரி பதிவுகள் (Quick Demo):' : 'Quick Demo Profiles:'}</span>
        <button
          type="button"
          onClick={() => selectDemoProfile('HMM-2026-001', '2019-05-14', '+91 94432 55101')}
          className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer font-medium ${
            admissionNo === 'HMM-2026-001'
              ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
              : 'bg-[#F5F2ED] text-[#3D3A35] border-[#D5CEC2] hover:bg-[#EAE4DC]'
          }`}
        >
          A. Joseph Daniel (Class I)
        </button>
        <button
          type="button"
          onClick={() => selectDemoProfile('HMM-2026-002', '2015-11-22', '+91 98422 11980')}
          className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer font-medium ${
            admissionNo === 'HMM-2026-002'
              ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
              : 'bg-[#F5F2ED] text-[#3D3A35] border-[#D5CEC2] hover:bg-[#EAE4DC]'
          }`}
        >
          S. Nithya Shree (Class VI)
        </button>
        <button
          type="button"
          onClick={() => selectDemoProfile('HMM-2026-003', '2012-03-08', '+91 97880 44321')}
          className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer font-medium ${
            admissionNo === 'HMM-2026-003'
              ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
              : 'bg-[#F5F2ED] text-[#3D3A35] border-[#D5CEC2] hover:bg-[#EAE4DC]'
          }`}
        >
          M. Kavin Prasad (Class IX)
        </button>
      </div>

      {/* STEP INDICATOR TRACK */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
        <div className={`p-2.5 rounded-xl border transition-all ${step >= 1 ? 'bg-[#5A5A40] text-white border-[#484833]' : 'bg-[#F5F2ED] text-[#706B63] border-[#E5E0D8]'}`}>
          <span>1. {language === 'ta' ? 'மாணவர் விவரம்' : 'Student Info'}</span>
        </div>
        <div className={`p-2.5 rounded-xl border transition-all ${step >= 2 ? 'bg-[#5A5A40] text-white border-[#484833]' : 'bg-[#F5F2ED] text-[#706B63] border-[#E5E0D8]'}`}>
          <span>2. {language === 'ta' ? 'OTP சரிபார்ப்பு' : 'Verify OTP'}</span>
        </div>
        <div className={`p-2.5 rounded-xl border transition-all ${step >= 3 ? 'bg-[#5A5A40] text-white border-[#484833]' : 'bg-[#F5F2ED] text-[#706B63] border-[#E5E0D8]'}`}>
          <span>3. {language === 'ta' ? 'UIDAI e-KYC' : 'Aadhaar e-KYC'}</span>
        </div>
        <div className={`p-2.5 rounded-xl border transition-all ${step >= 4 ? 'bg-emerald-700 text-white border-emerald-800' : 'bg-[#F5F2ED] text-[#706B63] border-[#E5E0D8]'}`}>
          <span>4. {language === 'ta' ? 'சான்றிதழ்' : 'Verified Pass'}</span>
        </div>
      </div>

      {/* ERROR MESSAGE NOTIFICATION */}
      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: ENTER STUDENT / ADMISSION DETAILS */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} className="space-y-6 bg-[#FCFAF7] p-6 sm:p-8 rounded-2xl border border-[#E5E0D8]">
          <div className="border-b border-[#E5E0D8] pb-3">
            <h3 className="text-base sm:text-lg font-bold text-[#2C2A26] font-['Cinzel',serif] flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#5A5A40]" />
              <span>{language === 'ta' ? 'மாணவர் / சேர்க்கை சரிபார்ப்பு படிவம்' : 'Student & Admission Verification Portal'}</span>
            </h3>
            <p className="text-xs text-[#706B63]">
              {language === 'ta' 
                ? 'பள்ளியில் பதிவு செய்யப்பட்ட சேர்க்கை எண், பிறந்த தேதி மற்றும் அலைபேசி எண்ணை உள்ளிடவும்.'
                : 'Enter your admission/application number, DOB, and registered mobile to receive authentication OTP.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2C2A26] mb-1.5">
                {language === 'ta' ? 'சேர்க்கை / விண்ணப்ப எண் *' : 'Admission / Application Number *'}
              </label>
              <input
                id="verify-admission-number"
                type="text"
                required
                placeholder="e.g. HMM-2026-001"
                value={admissionNo}
                onChange={(e) => setAdmissionNo(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] bg-white focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-xs sm:text-sm font-mono outline-none text-[#2C2A26]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C2A26] mb-1.5">
                {language === 'ta' ? 'பிறந்த தேதி (DOB) *' : 'Date of Birth (DOB) *'}
              </label>
              <input
                id="verify-dob"
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] bg-white focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-xs sm:text-sm outline-none text-[#2C2A26]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C2A26] mb-1.5">
                {language === 'ta' ? 'பதிவு செய்யப்பட்ட அலைபேசி எண் *' : 'Registered Mobile Number *'}
              </label>
              <input
                id="verify-mobile"
                type="tel"
                required
                placeholder="+91 99434 61787"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] bg-white focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 text-xs sm:text-sm outline-none text-[#2C2A26]"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#706B63] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>{language === 'ta' ? '256-bit SSL பாதுகாப்புடன் OTP அனுப்பப்படும்' : 'Secured 256-bit SSL OTP Gateway'}</span>
            </div>

            <button
              id="btn-send-student-otp"
              type="submit"
              disabled={isSendingOtp}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSendingOtp ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{language === 'ta' ? 'OTP அனுப்பப்படுகிறது...' : 'Sending OTP...'}</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4" />
                  <span>{language === 'ta' ? 'OTP அனுப்புக' : 'Send Verification OTP'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: VERIFY OTP */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtpSubmit} className="space-y-6 bg-[#FCFAF7] p-6 sm:p-8 rounded-2xl border border-[#E5E0D8]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E5E0D8] pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2C2A26] font-['Cinzel',serif]">
                {language === 'ta' ? 'அலைபேசிக்கு அனுப்பப்பட்ட OTP-ஐ உள்ளிடவும்' : 'Enter 6-Digit Mobile Verification OTP'}
              </h3>
              <p className="text-xs text-[#706B63]">
                {language === 'ta' ? `அலைபேசி எண்: ${mobileNumber} -க்கு அனுப்பப்பட்ட OTP-ஐ பதிவு செய்க.` : `Enter the 6-digit OTP code sent to registered number ${mobileNumber}.`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-[#5A5A40] underline font-semibold cursor-pointer"
            >
              {language === 'ta' ? 'எண் திருத்துக' : 'Change Number'}
            </button>
          </div>

          <div className="max-w-md mx-auto py-4 space-y-4">
            <label className="block text-center text-xs font-semibold text-[#524E48]">
              {language === 'ta' ? '6-இலக்க OTP குறியீடு' : '6-Digit Verification Code'}
            </label>
            <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePasteOtp}>
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-digit-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-10 sm:w-12 h-12 text-center text-lg sm:text-xl font-bold font-mono rounded-xl border border-[#D5CEC2] bg-white focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 outline-none text-[#2C2A26]"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-[#706B63] px-2">
              <span>
                {isTimerRunning ? (
                  <span>{language === 'ta' ? `மீண்டும் அனுப்ப: ${timerSeconds} வினாடிகள்` : `Resend OTP in ${timerSeconds}s`}</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    className="text-[#5A5A40] font-bold underline cursor-pointer"
                  >
                    {language === 'ta' ? 'மீண்டும் OTP அனுப்புக' : 'Resend OTP Now'}
                  </button>
                )}
              </span>
              <span className="font-mono text-[11px] text-[#A8A295]">Demo: 123456 / 482910</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-full border border-[#D5CEC2] text-xs font-bold text-[#524E48] hover:bg-[#F5F2ED] cursor-pointer"
            >
              {language === 'ta' ? 'பின்செல்க' : 'Back'}
            </button>
            <button
              id="btn-confirm-student-otp"
              type="submit"
              disabled={isVerifyingOtp}
              className="px-8 py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isVerifyingOtp ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{language === 'ta' ? 'சரிபார்க்கிறது...' : 'Verifying...'}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'ta' ? 'OTP சரிபார்க்க' : 'Verify & Proceed'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: UIDAI-COMPLIANT e-KYC VERIFICATION (NO RAW AADHAAR STORED) */}
      {step === 3 && (
        <div className="space-y-6 bg-[#FCFAF7] p-6 sm:p-8 rounded-2xl border border-[#E5E0D8]">
          <div className="border-b border-[#E5E0D8] pb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'மொபைல் OTP சரிபார்க்கப்பட்டது' : 'Mobile OTP Authenticated'}</span>
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#2C2A26] font-['Cinzel',serif] mt-2">
              {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட UIDAI e-KYC அடையாளம் சரிபார்ப்பு' : 'Authorized UIDAI e-KYC Identity Verification'}
            </h3>
            <p className="text-xs text-[#706B63]">
              {language === 'ta'
                ? 'அரசு விதிமுறைகளின்படி மாணவரின் पहचान சரிபார்ப்பை பாதுகாப்பான UIDAI e-KYC தொழில்நுட்பம் மூலம் முடிக்கவும்.'
                : 'Complete statutory identity verification via authorized UIDAI-compliant e-KYC gateway. No Aadhaar digits are stored.'}
            </p>
          </div>

          {/* Student Profile Card Overview */}
          {activeRecord && (
            <div className="bg-white rounded-xl p-4 border border-[#E5E0D8] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[#706B63] block text-[11px]">{language === 'ta' ? 'மாணவர் பெயர்' : 'Student Name'}</span>
                <span className="font-bold text-[#2C2A26]">{activeRecord.studentName}</span>
              </div>
              <div>
                <span className="text-[#706B63] block text-[11px]">{language === 'ta' ? 'சேர்க்கை எண்' : 'Admission No'}</span>
                <span className="font-mono font-bold text-[#5A5A40]">{activeRecord.admissionNumber}</span>
              </div>
              <div>
                <span className="text-[#706B63] block text-[11px]">{language === 'ta' ? 'வகுப்பு' : 'Standard'}</span>
                <span className="font-semibold text-[#2C2A26]">{activeRecord.standard}</span>
              </div>
              <div>
                <span className="text-[#706B63] block text-[11px]">{language === 'ta' ? 'பிறந்த தேதி' : 'Date of Birth'}</span>
                <span className="font-mono text-[#2C2A26]">{activeRecord.dob}</span>
              </div>
            </div>
          )}

          {/* Legal Consent & Privacy Compliance Check */}
          <div className="bg-[#F5F2ED] rounded-xl p-4 border border-[#E5E0D8] space-y-3">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                id="chk-kyc-consent"
                type="checkbox"
                checked={kycConsent}
                onChange={(e) => setKycConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-[#5A5A40] focus:ring-[#5A5A40]"
              />
              <div className="text-xs text-[#524E48] leading-relaxed">
                <span className="font-bold text-[#2C2A26] block mb-0.5">
                  {language === 'ta' ? 'சட்டப்பூர்வ ஒப்புதல் மற்றும் தனியுரிமை உறுதிமொழி' : 'Statutory e-KYC Consent & Data Privacy Declaration'}
                </span>
                {language === 'ta' 
                  ? 'ஆதார் சட்டம் 2016 மற்றும் டிஜிட்டல் தனிநபர் தரவு பாதுகாப்புச் சட்டம் 2023-ன் கீழ், ஹோலி மடோனாஸ் பள்ளிக்கு அங்கீகரிக்கப்பட்ட UIDAI e-KYC மூலம் என் அடையாளத்தைச் சரிபார்க்க சம்மதிக்கிறேன். எனது அசல் ஆதார் எண் பள்ளியின் சர்வரில் சேமிக்கப்படாது என்பதை நான் அறிவேன்.'
                  : 'I hereby provide explicit consent under the Aadhaar Act 2016 and Digital Personal Data Protection (DPDP) Act 2023 for Holy Madonnas School to verify identity via an authorized UIDAI-compliant e-KYC provider. Only a cryptographic verification reference token will be stored on school records.'}
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-[#706B63]">
              <span>{language === 'ta' ? 'ஆதார் நிலை: ' : 'Aadhaar Status: '}</span>
              <span className="font-bold text-amber-700">⏳ Pending e-KYC</span>
            </div>

            <button
              id="btn-authenticate-kyc"
              type="button"
              onClick={handleTriggerAadhaarKyc}
              disabled={isKycProcessing || !kycConsent}
              className="px-8 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isKycProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{language === 'ta' ? 'UIDAI வாயில் மூலம் சரிபார்க்கிறது...' : 'Authenticating with UIDAI Gateway...'}</span>
                </>
              ) : (
                <>
                  <Fingerprint className="w-4 h-4" />
                  <span>{language === 'ta' ? 'UIDAI e-KYC சரிபார்ப்பை முடிக்க' : 'Authenticate via Authorized e-KYC'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: VERIFIED PASS & DIGITAL CERTIFICATE (PRINTABLE) */}
      {step === 4 && activeRecord && (
        <div className="space-y-6">
          
          {/* Success Banner */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-emerald-950 font-['Cinzel',serif]">
                  {language === 'ta' ? 'மாணவர் அடையாளம் வெற்றிகரமாக சரிபார்க்கப்பட்டது!' : 'Student Identity Successfully Verified!'}
                </h4>
                <p className="text-xs text-emerald-800">
                  {language === 'ta' ? 'ஆதார் சரிபார்ப்பு நிலை: ✅ சரிபார்க்கப்பட்டது (Verified)' : 'Aadhaar verification status: ✅ Verified (UIDAI e-KYC Reference Stored)'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintCertificate}
                className="px-4 py-2 rounded-full bg-white border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'அச்சிடுக / PDF' : 'Print Pass / PDF'}</span>
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setSimulatedSmsBanner(null);
                  setOtpDigits(['', '', '', '', '', '']);
                }}
                className="px-4 py-2 rounded-full bg-[#5A5A40] text-white text-xs font-bold hover:bg-[#484833] cursor-pointer"
              >
                {language === 'ta' ? 'புதிய சரிபார்ப்பு' : 'New Verification'}
              </button>
            </div>
          </div>

          {/* OFFICIAL STUDENT VERIFICATION PASSCARD / CERTIFICATE */}
          <div id="printable-verification-pass" className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#5A5A40]/30 shadow-md relative overflow-hidden">
            
            {/* Certificate Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-[#E5E0D8] pb-6 gap-4 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <SchoolLogo size={56} />
                <div>
                  <h2 className="text-base sm:text-xl font-black text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
                    HOLY MADONNAS MATRICULATION HR. SEC. SCHOOL
                  </h2>
                  <p className="text-xs text-[#706B63] font-medium">
                    Lalapet, Karur District, Tamil Nadu • Recognized by Govt. of Tamil Nadu
                  </p>
                  <p className="text-[10px] text-[#5A5A40] font-bold uppercase tracking-wider mt-0.5">
                    Official Student Identity & Enrollment Verification Certificate
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2.5 text-center shrink-0">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">Status</span>
                <span className="text-xs sm:text-sm font-black text-emerald-700 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>VERIFIED ✅</span>
                </span>
              </div>
            </div>

            {/* Certificate Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-[#E5E0D8]">
              
              <div className="space-y-3 col-span-2">
                <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-[#706B63] text-[11px] block">{language === 'ta' ? 'மாணவர் பெயர்' : 'Student Full Name'}</span>
                    <span className="font-bold text-[#2C2A26] text-base">{activeRecord.studentName}</span>
                  </div>

                  <div>
                    <span className="text-[#706B63] text-[11px] block">{language === 'ta' ? 'சேர்க்கை எண்' : 'Admission / Roll No.'}</span>
                    <span className="font-mono font-bold text-[#5A5A40] text-base">{activeRecord.admissionNumber}</span>
                  </div>

                  <div>
                    <span className="text-[#706B63] text-[11px] block">{language === 'ta' ? 'வகுப்பு & பிரிவு' : 'Standard / Class'}</span>
                    <span className="font-semibold text-[#2C2A26]">{activeRecord.standard}</span>
                  </div>

                  <div>
                    <span className="text-[#706B63] text-[11px] block">{language === 'ta' ? 'பிறந்த தேதி' : 'Date of Birth (DOB)'}</span>
                    <span className="font-mono font-semibold text-[#2C2A26]">{activeRecord.dob}</span>
                  </div>

                  <div>
                    <span className="text-[#706B63] text-[11px] block">{language === 'ta' ? 'பெற்றோர் / பாதுகாவலர்' : 'Parent / Guardian'}</span>
                    <span className="font-semibold text-[#2C2A26]">{activeRecord.parentName}</span>
                  </div>

                  <div>
                    <span className="text-[#706B63] text-[11px] block">{language === 'ta' ? 'பதிவு செய்யப்பட்ட அலைபேசி' : 'Registered Mobile'}</span>
                    <span className="font-mono font-semibold text-[#2C2A26]">
                      {activeRecord.registeredMobile.slice(0, 7) + 'XXXX' + activeRecord.registeredMobile.slice(-2)}
                    </span>
                  </div>
                </div>

                {/* Verification Cryptographic Token */}
                <div className="mt-4 p-3.5 bg-[#F5F2ED] rounded-xl border border-[#E5E0D8] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#2C2A26] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>UIDAI e-KYC Verification Token Reference</span>
                    </span>
                    <span className="text-emerald-700 font-mono font-bold text-[11px]">ACTIVE</span>
                  </div>
                  <p className="font-mono text-[#5A5A40] font-bold text-xs">
                    {activeRecord.aadhaarKycRefId || 'UIDAI-EK-2026-8942A'}
                  </p>
                  <p className="text-[10px] text-[#706B63]">
                    Verified on {activeRecord.verifiedAt || new Date().toLocaleDateString()} • Compliant with UIDAI regulations & DPDP Act 2023.
                  </p>
                </div>
              </div>

              {/* QR Verification Badge & Seal */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#FCFAF7] rounded-2xl border border-[#E5E0D8] text-center space-y-2">
                <div className="p-3 bg-white rounded-xl shadow-xs border border-[#E5E0D8]">
                  <QrCode className="w-24 h-24 text-[#2C2A26]" />
                </div>
                <span className="text-[10px] font-mono text-[#706B63] uppercase">Scan to Verify On-Campus</span>
                <div className="pt-2 border-t border-[#E5E0D8] w-full">
                  <span className="text-[11px] font-bold text-[#2C2A26] block">Academic Year</span>
                  <span className="text-xs font-black text-[#5A5A40]">2026 – 2027</span>
                </div>
              </div>
            </div>

            {/* Certificate Footer Seal */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#706B63] gap-2">
              <div>
                <span>Institutional Helpline: </span>
                <span className="font-bold text-[#2C2A26]">+91 99434 61787</span>
                <span> | Principal Desk: </span>
                <span className="font-bold text-[#2C2A26]">+91 96299 78066</span>
              </div>
              <div className="font-serif italic text-[#5A5A40]">
                Holy Madonnas Matriculation Higher Secondary School, Lalapet
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
