import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { SchoolLogo } from './SchoolLogo';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  GraduationCap, 
  Phone, 
  Bus, 
  Calendar, 
  BookOpen,
  User
} from 'lucide-react';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIAssistantModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { language, openAdmissionModal } = useSchool();
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: language === 'ta'
        ? 'வணக்கம்! நான் ஹோலி மடோனாஸ் பள்ளியின் AI வழிகாட்டி. சேர்க்கை, கட்டணம், பேருந்து வழித்தடங்கள், தேர்வு அட்டவணை பற்றி என்னிடம் கேட்கலாம்.'
        : 'Welcome! I am the Holy Madonnas School AI Counselor. How can I help you regarding admissions 2026–27, fee details, bus routes, or school curriculum today?',
      time: 'Just now'
    }
  ]);

  const quickQuestions = [
    {
      en: 'How to apply for 2026–27 Admissions?',
      ta: '2026–27 சேர்க்கைக்கு எவ்வாறு விண்ணப்பிப்பது?'
    },
    {
      en: 'What are the school bus routes in Lalapet?',
      ta: 'லாலாபேட்டையில் பள்ளி பேருந்து வழித்தடங்கள் என்ன?'
    },
    {
      en: 'What are the school timings & office hours?',
      ta: 'பள்ளி மற்றும் அலுவலக வேலை நேரங்கள் என்ன?'
    },
    {
      en: 'What groups are available for Class XI / XII?',
      ta: '11 & 12-ஆம் வகுப்புகளுக்கு என்னென்ன பாடப்பிரிவுகள் உள்ளன?'
    }
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Generate accurate school-specific response
    setTimeout(() => {
      let botResponse = '';
      const q = query.toLowerCase();

      if (q.includes('admission') || q.includes('apply') || q.includes('சேர்க்கை') || q.includes('விண்ணப்ப')) {
        botResponse = language === 'ta'
          ? 'ஹோலி மடோனாஸ் பள்ளியில் Pre-KG முதல் 12-ஆம் வகுப்பு வரை சேர்க்கை நடைபெறுகிறது. நமது தளத்தில் உள்ள "Apply Online" பொத்தானை அழுத்தி 3 நிமிடங்களில் விண்ணப்பிக்கலாம். அல்லது அலுவலகத்தை +91 96299 78066 எண்ணில் தொடர்புகொள்ளலாம்.'
          : 'Admissions are open for Pre-KG through Class XII for the 2026–27 academic year! You can apply online directly using the "Apply Online" button or call +91 96299 78066 for immediate admission assistance.';
      } else if (q.includes('bus') || q.includes('transport') || q.includes('route') || q.includes('பேருந்து') || q.includes('வழித்தடம்')) {
        botResponse = language === 'ta'
          ? 'பள்ளியின் GPS பொருத்தப்பட்ட பேருந்துகள் லாலாபேட்டை, குளித்தலை, மாயனூர், பெட்டவாய்த்தலை, கிருஷ்ணராயபுரம் ஆகிய வழித்தடங்களில் காலை 7:30 மணி முதல் இயக்கப்படுகின்றன.'
          : 'Our GPS-enabled bus fleet covers Route 1 (Kulithalai), Route 2 (Mayanur - Mahadhanapuram), and Route 3 (Pettavaithalai - Lalapet town). Morning pickups start from 7:30 AM.';
      } else if (q.includes('fee') || q.includes('கட்டணம்') || q.includes('cost') || q.includes('pay')) {
        botResponse = language === 'ta'
          ? 'எங்களின் கல்விக் கட்டணம் மிகவும் நியாயமான முறையில் அரசு வழிகாட்டுதலின்படி நிர்ணயிக்கப்பட்டுள்ளது. தவணை முறையில் செலுத்தலாம். இணையதளத்தில் ரோல் எண் மூலம் சரிபார்க்கலாம்.'
          : 'Holy Madonnas School offers transparent, nominal fee structures in convenient term-wise installments with digital receipt generation.';
      } else if (q.includes('timing') || q.includes('hour') || q.includes('time') || q.includes('நேரம்')) {
        botResponse = language === 'ta'
          ? 'பள்ளி நேரம்: காலை 8:45 AM முதல் மாலை 4:00 PM வரை. பள்ளி அலுவலகம்: திங்கள் - சனி காலை 8:30 AM முதல் மாலை 4:30 PM வரை. முதல்வர் சந்திப்பு நேரம்: 10:30 AM - 1:00 PM.'
          : 'School Hours: 8:45 AM – 4:00 PM. Administrative Office: Monday to Saturday 8:30 AM – 4:30 PM. Principal Visiting Hours: 10:30 AM – 1:00 PM.';
      } else if (q.includes('group') || q.includes('11') || q.includes('12') || q.includes('stream') || q.includes('பாடப்பிரிவு')) {
        botResponse = language === 'ta'
          ? '11 & 12-ஆம் வகுப்புகளுக்கு: 1. கணிதம், இயற்பியல், வேதியியல், உயிரியல் (NEET) | 2. கணிதம், இயற்பியல், வேதியியல், கணினி அறிவியல் | 3. வணிகவியல், கணக்குப்பதிவியல், பொருளியல், வணிக கணிதம் (CA).'
          : 'For Higher Secondary (Classes XI & XII): Group 1 (Maths, Physics, Chemistry, Biology - NEET Track), Group 2 (Maths, Physics, Chemistry, Computer Science), and Group 3 (Commerce, Accountancy, Economics, Business Maths).';
      } else {
        botResponse = language === 'ta'
          ? `ஹோலி மடோனாஸ் மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி, லாலாபேட்டை. உங்கள் கேள்விக்கு மேலும் தெளிவான விளக்கம் பெற எங்கள் உதவி மையத்தை +91 96299 78066 எண்ணில் அழைக்கவும்.`
          : `Holy Madonnas Matriculation Higher Secondary School, Lalapet. For specialized queries or campus appointments, please contact our administrative desk at +91 96299 78066.`;
      }

      const aiMsg: ChatMessage = {
        sender: 'ai',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div 
      id="ai-assistant-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2C2A26]/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#24221E] border border-[#3A3731] rounded-3xl max-w-xl w-full h-[85vh] shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#1C1A17] border-b border-[#3A3731] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SchoolLogo size="sm" variant="emblem" glow className="bg-white/10 p-0.5 rounded-full border border-white/20" />
            <div>
              <h3 className="font-bold text-sm font-['Cinzel',serif] text-[#FCFAF7] flex items-center gap-1.5">
                <span>Madonnas AI Assistant</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-[11px] text-[#D8D2C5]">
                Lalapet Campus Guide (English & தமிழ்)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#2D2A24] hover:bg-[#38342D] text-[#C8C2B4] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1C1A17]/60">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#5A5A40] flex items-center justify-center text-white shrink-0 mt-0.5 border border-[#6E6E52]">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#5A5A40] text-white font-medium rounded-tr-none border border-[#6E6E52]'
                    : 'bg-[#2D2A24] text-[#FCFAF7] rounded-tl-none border border-[#3A3731]'
                }`}
              >
                <p>{msg.text}</p>
                <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-[#D8D2C5]' : 'text-[#8C857B]'}`}>
                  {msg.time}
                </span>
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#3D3A35] flex items-center justify-center text-[#FCFAF7] shrink-0 mt-0.5 font-bold text-xs border border-[#524E48]">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-[#1C1A17] border-t border-[#3A3731] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(language === 'ta' ? q.ta : q.en)}
              className="px-2.5 py-1 bg-[#2D2A24] hover:bg-[#38342D] text-[#D8D2C5] hover:text-white rounded-full text-[11px] whitespace-nowrap transition-colors border border-[#423E37] cursor-pointer"
            >
              {language === 'ta' ? q.ta : q.en}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#1C1A17] border-t border-[#3A3731] flex items-center gap-2">
          <input
            type="text"
            placeholder={language === 'ta' ? 'உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்...' : 'Ask about admission, bus, timetable, fees...'}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 px-3.5 py-2.5 bg-[#24221E] border border-[#423E37] rounded-xl text-xs text-white outline-none focus:border-[#5A5A40]"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 bg-[#5A5A40] hover:bg-[#4E4E37] text-white font-bold rounded-xl transition-all cursor-pointer shadow-md border border-[#6E6E52]"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
