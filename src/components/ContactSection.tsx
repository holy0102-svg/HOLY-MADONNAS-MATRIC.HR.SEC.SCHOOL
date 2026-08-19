import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  Building2,
  CalendarCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, t } = useSchool();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [classLookingFor, setClassLookingFor] = useState('Class I');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#E5E0D8] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-3 border border-[#5A5A40]/20">
            <MapPin className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>{language === 'ta' ? 'நேரில் சந்திக்க & தொடர்புகொள்ள' : 'Get In Touch'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {t.contactHeading}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {t.contactSubHeading}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Info Cards & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#E5E0D8] shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#5A5A40]/10 text-[#5A5A40] flex items-center justify-center shrink-0 border border-[#5A5A40]/20 shadow-2xs">
                <MapPin className="w-5 h-5 text-[#5A5A40]" />
              </div>
              <div>
                <h4 className="font-bold text-[#2C2A26] text-sm font-['Cinzel',serif]">{t.schoolAddressTitle}</h4>
                <p className="text-xs text-[#706B63] mt-1 leading-relaxed font-normal">{t.schoolAddress}</p>
                <span className="text-[11px] text-[#5A5A40] font-semibold block mt-1">Landmark: Main Road, Lalapet</span>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#E5E0D8] shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#5A5A40]/10 text-[#5A5A40] flex items-center justify-center shrink-0 border border-[#5A5A40]/20 shadow-2xs">
                <Phone className="w-5 h-5 text-[#5A5A40]" />
              </div>
              <div>
                <h4 className="font-bold text-[#2C2A26] text-sm font-['Cinzel',serif]">Phone & WhatsApp Numbers</h4>
                <div className="text-xs text-[#706B63] mt-1 space-y-1 font-normal">
                  <a href="tel:+919943461787" className="block hover:text-[#5A5A40] transition-colors font-semibold text-[#2C2A26]">+91 99434 61787 (School Office / WhatsApp Helpline)</a>
                  <a href="tel:+919629978066" className="block hover:text-[#5A5A40] transition-colors text-[#5A5A40] font-medium">+91 96299 78066 (Principal's Desk)</a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#E5E0D8] shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#5A5A40]/10 text-[#5A5A40] flex items-center justify-center shrink-0 border border-[#5A5A40]/20 shadow-2xs">
                <Mail className="w-5 h-5 text-[#5A5A40]" />
              </div>
              <div>
                <h4 className="font-bold text-[#2C2A26] text-sm font-['Cinzel',serif]">Email Inquiries</h4>
                <div className="text-xs text-[#706B63] mt-1 space-y-0.5 font-normal">
                  <a href="mailto:holylalapet123@gmail.com" className="block hover:text-[#5A5A40] transition-colors font-semibold text-[#2C2A26]">holylalapet123@gmail.com</a>
                  <span className="block text-[11px] text-[#8A847C]">Official School Communications & Admissions Desk</span>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-3xl p-5 border border-[#E5E0D8] shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#5A5A40]/10 text-[#5A5A40] flex items-center justify-center shrink-0 border border-[#5A5A40]/20 shadow-2xs">
                <Clock className="w-5 h-5 text-[#5A5A40]" />
              </div>
              <div>
                <h4 className="font-bold text-[#2C2A26] text-sm font-['Cinzel',serif]">{t.officeHoursTitle}</h4>
                <p className="text-xs text-[#706B63] mt-1 font-normal">{t.officeHoursText}</p>
                <p className="text-[11px] text-[#5A5A40] font-medium mt-0.5">{t.principalVisitingHours}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Query Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-xs">
            <h3 className="text-lg sm:text-xl font-bold font-['Cinzel',serif] text-[#2C2A26] mb-2">
              {t.enquiryFormTitle}
            </h3>
            <p className="text-xs text-[#706B63] mb-6 font-normal">
              {language === 'ta'
                ? 'உங்கள் விவரங்களைப் பதிவு செய்யுங்கள், எங்கள் பள்ளி நிர்வாகம் உங்களை உடனடியாகத் தொடர்புகொள்ளும்.'
                : 'Have a question about admissions, fees, or bus routes? Send us a message.'}
            </p>

            {isSubmitted ? (
              <div className="bg-[#F5F2ED] border border-[#5A5A40]/30 text-[#2C2A26] p-6 sm:p-8 rounded-3xl text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-[#5A5A40] mx-auto" />
                <h4 className="font-bold text-[#2C2A26] text-base">Enquiry Sent Successfully!</h4>
                <p className="text-xs text-[#706B63] font-normal">
                  Thank you, <strong className="text-[#5A5A40]">{name}</strong>. Our admissions team will reach you on <strong className="text-[#5A5A40]">{phone}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="mt-4 px-5 py-2 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold rounded-full text-xs uppercase cursor-pointer"
                >
                  Send Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C2A26] mb-1.5">{t.yourName} *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Murugesan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full bg-[#F5F2ED] border border-[#E5E0D8] text-xs text-[#2C2A26] outline-none focus:border-[#5A5A40] focus:ring-1 focus:ring-[#5A5A40]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2C2A26] mb-1.5">{t.yourPhone} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99434 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full bg-[#F5F2ED] border border-[#E5E0D8] text-xs text-[#2C2A26] outline-none focus:border-[#5A5A40] focus:ring-1 focus:ring-[#5A5A40]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C2A26] mb-1.5">{t.yourEmail}</label>
                    <input
                      type="email"
                      placeholder="parent@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full bg-[#F5F2ED] border border-[#E5E0D8] text-xs text-[#2C2A26] outline-none focus:border-[#5A5A40] focus:ring-1 focus:ring-[#5A5A40]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2C2A26] mb-1.5">{t.childClass}</label>
                    <select
                      value={classLookingFor}
                      onChange={(e) => setClassLookingFor(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full bg-[#F5F2ED] border border-[#E5E0D8] text-xs text-[#2C2A26] outline-none focus:border-[#5A5A40]"
                    >
                      {['Pre-KG', 'LKG', 'UKG', 'Classes I to V', 'Classes VI to VIII', 'Classes IX to X', 'Classes XI & XII (Science)', 'Classes XI & XII (Commerce)'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2A26] mb-1.5">{t.yourMessage}</label>
                  <textarea
                    rows={3}
                    placeholder={language === 'ta' ? 'உங்கள் கேள்வி அல்லது தகவலை இங்கே பதிவிடவும்...' : 'Type your inquiry regarding admission, bus route, or fees here...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D8] text-xs text-[#2C2A26] outline-none focus:border-[#5A5A40] focus:ring-1 focus:ring-[#5A5A40]"
                  />
                </div>

                <button
                  id="btn-send-contact-enquiry"
                  type="submit"
                  className="w-full py-3.5 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold rounded-full text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{t.btnSendMessage}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Embedded Google Map */}
        <div className="rounded-3xl overflow-hidden border border-[#E5E0D8] shadow-xs bg-white">
          <div className="p-4 bg-[#F5F2ED] border-b border-[#E5E0D8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#5A5A40]" />
              <span className="font-bold text-xs sm:text-sm text-[#2C2A26]">
                Google Map: Holy Madonnas School Campus, Lalapet, Tamil Nadu
              </span>
            </div>
            <a
              href="https://maps.google.com/?q=Lalapet+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#5A5A40] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>{language === 'ta' ? 'கூகுள் மேப்பில் பார்க்க' : 'Open in Google Maps'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="w-full h-72 sm:h-96 bg-[#E5E0D8]">
            <iframe
              title="Holy Madonnas School Lalapet Map"
              src="https://maps.google.com/maps?q=Lalapet,%20Karur,%20Tamil%20Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
