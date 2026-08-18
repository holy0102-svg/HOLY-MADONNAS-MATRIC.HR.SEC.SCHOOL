import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { schoolEventsList } from '../data/schoolData';
import { SchoolEvent } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Bell, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  X
} from 'lucide-react';

export const EventsCalendar: React.FC = () => {
  const { language, t } = useSchool();
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);
  const [reminderSet, setReminderSet] = useState<string | null>(null);

  const augustCalendarDays = [
    { date: 1, event: 'School Mass', type: 'Religious' },
    { date: 8, event: 'Board Felicitation', type: 'Academic' },
    { date: 15, event: 'Independence Day', type: 'Celebration' },
    { date: 20, event: 'Karate & Yoga', type: 'Sports' },
    { date: 24, event: 'Mid-Term Exams', type: 'Academic' },
    { date: 29, event: 'Science Club', type: 'Academic' }
  ];

  const handleSetReminder = (eventId: string) => {
    setReminderSet(eventId);
    setTimeout(() => setReminderSet(null), 3000);
  };

  return (
    <section id="events" className="py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#E5E0D8] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-3 border border-[#5A5A40]/20">
            <CalendarIcon className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>{language === 'ta' ? 'பள்ளி நாட்காட்டி' : 'Academic & Cultural Schedule'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C2A26] font-['Cinzel',serif] tracking-tight">
            {t.calendarHeading}
          </h2>
          <p className="text-[#706B63] text-sm sm:text-base mt-2 font-normal">
            {t.calendarSubHeading}
          </p>
          <div className="w-16 h-1 bg-[#5A5A40] mx-auto mt-4 rounded-full" />
        </div>

        {/* Calendar Grid & Events List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* August 2026 Interactive Month Widget */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E0D8] shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4 mb-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#5A5A40]" />
                <h3 className="text-lg font-bold font-['Cinzel',serif] text-[#2C2A26]">
                  {language === 'ta' ? 'ஆகஸ்ட் 2026' : 'AUGUST 2026'}
                </h3>
              </div>
              <span className="text-xs font-bold text-[#5A5A40] bg-[#F5F2ED] px-3 py-1 rounded-full border border-[#E5E0D8]">
                Term 1
              </span>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#8A847C] mb-2">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>

            {/* Calendar Numbers Grid (August starts on Sat in 2026) */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {/* Empty offset days */}
              {[...Array(6)].map((_, i) => (
                <div key={`empty-${i}`} className="h-10 text-[#D9D3C7] flex items-center justify-center"></div>
              ))}

              {/* 31 days of August */}
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const match = augustCalendarDays.find(d => d.date === day);
                const isSpecial = Boolean(match);

                return (
                  <div
                    key={day}
                    className={`h-10 rounded-2xl flex flex-col items-center justify-center p-1 transition-all ${
                      isSpecial
                        ? 'bg-[#5A5A40] text-white font-bold shadow-xs cursor-pointer hover:scale-105'
                        : 'text-[#3D3A35] hover:bg-[#F5F2ED] font-medium'
                    }`}
                  >
                    <span>{day}</span>
                    {isSpecial && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calendar Key / Legend */}
            <div className="mt-6 pt-4 border-t border-[#E5E0D8] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#706B63]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5A5A40]" />
                <span>{language === 'ta' ? 'பள்ளி நிகழ்வுகள்' : 'School Events'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3D3A35]" />
                <span>{language === 'ta' ? 'தேர்வுகள்' : 'Exams'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6321]" />
                <span>{language === 'ta' ? 'வழிபாடு & விடுமுறை' : 'Mass & Prayers'}</span>
              </div>
            </div>
          </div>

          {/* Detailed Events Timeline Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-[#2C2A26] font-['Cinzel',serif]">
                {language === 'ta' ? 'வரவிருக்கும் நிகழ்வுகள்' : 'Featured Events & Programs'}
              </h3>
              <span className="text-xs text-[#8A847C] font-medium">Click to view details</span>
            </div>

            {schoolEventsList.map((ev) => (
              <div
                key={ev.id}
                id={`event-card-${ev.id}`}
                onClick={() => setSelectedEvent(ev)}
                className="bg-white rounded-3xl p-5 border border-[#E5E0D8] shadow-xs hover:shadow-md hover:border-[#5A5A40]/40 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  {/* Date badge */}
                  <div className="w-14 h-14 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D8] flex flex-col items-center justify-center shrink-0 text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-colors">
                    <span className="text-base font-black leading-none font-['Cinzel',serif]">
                      {ev.date.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-bold uppercase mt-0.5">
                      {ev.date.split(' ')[1]}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F5F2ED] text-[#5A5A40] border border-[#E5E0D8]">
                        {ev.category}
                      </span>
                      <span className="text-xs text-[#8A847C] flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-[#8A847C]" />
                        {ev.time}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-[#2C2A26] font-['Cinzel',serif] group-hover:text-[#5A5A40] transition-colors">
                      {language === 'ta' ? ev.titleTa : ev.title}
                    </h4>

                    <div className="flex items-center gap-1 text-xs text-[#706B63] mt-1 font-normal">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
                      <span>{language === 'ta' ? ev.venueTa : ev.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Reminder Action button */}
                <div className="self-end sm:self-center shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetReminder(ev.id);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                      reminderSet === ev.id
                        ? 'bg-[#5A5A40] text-white border-[#484833]'
                        : 'bg-[#F5F2ED] hover:bg-[#5A5A40] hover:text-white text-[#3D3A35] border-[#E5E0D8]'
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{reminderSet === ev.id ? 'Reminder Set! ✓' : t.btnAddToCalendar}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          id="event-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2A26]/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5E0D8] text-[#2C2A26]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 mb-4">
              <span className="text-xs font-bold text-[#5A5A40] bg-[#F5F2ED] px-3 py-0.5 rounded-full uppercase border border-[#E5E0D8]">
                {selectedEvent.category}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-[#8A847C] hover:text-[#2C2A26]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedEvent.highlightPhoto && (
              <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 border border-[#E5E0D8]">
                <img
                  src={selectedEvent.highlightPhoto}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h3 className="text-lg font-bold font-['Cinzel',serif] text-[#2C2A26] mb-2">
              {language === 'ta' ? selectedEvent.titleTa : selectedEvent.title}
            </h3>

            <div className="space-y-2 text-xs text-[#3D3A35] bg-[#F5F2ED] p-3.5 rounded-2xl border border-[#E5E0D8] mb-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#5A5A40]" />
                <span className="font-semibold">{selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5A5A40]" />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF6321]" />
                <span>{language === 'ta' ? selectedEvent.venueTa : selectedEvent.venue}</span>
              </div>
            </div>

            <p className="text-sm text-[#706B63] leading-relaxed mb-6 font-normal">
              {language === 'ta' ? selectedEvent.descriptionTa : selectedEvent.description}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2 bg-[#F5F2ED] hover:bg-[#EAE4DC] text-[#3D3A35] font-semibold rounded-full text-xs uppercase"
              >
                {t.closeModal}
              </button>
              <button
                onClick={() => handleSetReminder(selectedEvent.id)}
                className="px-5 py-2 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold rounded-full text-xs uppercase flex items-center gap-1.5 shadow-sm"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>{t.btnAddToCalendar}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
