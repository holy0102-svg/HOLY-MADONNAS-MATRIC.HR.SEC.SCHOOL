import React, { useEffect, useState, useCallback } from 'react';
import { useSchool } from '../context/SchoolContext';
import { SectionType, applyDynamicSEOMetadata, SECTION_METADATA_CONFIG } from '../utils/seoMeta';
import { safeReplaceHistoryHash } from '../utils/safeStorage';

interface DynamicSEOHeadProps {
  onSectionChange?: (section: SectionType) => void;
}

export const DynamicSEOHead: React.FC<DynamicSEOHeadProps> = ({ onSectionChange }) => {
  const { language, news, photos } = useSchool();
  const [activeSection, setActiveSection] = useState<SectionType>('home');

  // Notify parent component of section changes safely in an effect
  useEffect(() => {
    if (onSectionChange) {
      onSectionChange(activeSection);
    }
  }, [activeSection, onSectionChange]);

  // Handle section detection from Hash or Scroll
  const updateSection = useCallback((newSection: SectionType) => {
    setActiveSection(prev => (prev !== newSection ? newSection : prev));
  }, []);

  // 1. Initial Hash Check & hashchange event listener
  useEffect(() => {
    const handleHashChange = () => {
      try {
        const hash = window.location.hash.replace('#', '').toLowerCase();
        if (hash && hash in SECTION_METADATA_CONFIG) {
          updateSection(hash as SectionType);
        } else if (!hash) {
          updateSection('home');
        }
      } catch {
        // Ignore location read errors
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [updateSection]);

  // 2. IntersectionObserver for seamless on-scroll dynamic metadata generation
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sectionIds: { id: string; section: SectionType }[] = [
      { id: 'academics', section: 'academics' },
      { id: 'news', section: 'news' },
      { id: 'gallery', section: 'gallery' },
      { id: 'admissions', section: 'admissions' },
      { id: 'facilities', section: 'facilities' },
      { id: 'videos', section: 'videos' },
      { id: 'contact', section: 'contact' },
      { id: 'home', section: 'home' }
    ];

    let observer: IntersectionObserver | null = null;

    try {
      const observerCallback: IntersectionObserverCallback = (entries) => {
        // Find the visible entry with the highest intersection ratio
        const visibleEntries = entries.filter(e => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersectionRatio descending
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topEntry = visibleEntries[0];
          const match = sectionIds.find(s => s.id === topEntry.target.id);
          if (match) {
            updateSection(match.section);
            
            // Optionally update URL hash without scrolling jump
            if (match.section !== 'home') {
              safeReplaceHistoryHash(match.section);
            } else {
              safeReplaceHistoryHash('');
            }
          }
        }
      };

      observer = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: '-10% 0px -40% 0px', // focused viewport zone
        threshold: [0.15, 0.3, 0.6]
      });

      sectionIds.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          observer?.observe(el);
        }
      });
    } catch {
      // Ignore observer setup errors
    }

    return () => {
      observer?.disconnect();
    };
  }, [updateSection]);

  // 3. Apply Metadata to Document Head whenever Active Section, Language, News, or Photos change
  useEffect(() => {
    try {
      applyDynamicSEOMetadata(activeSection, language, news, photos);
    } catch {
      // Safe fallback
    }
  }, [activeSection, language, news, photos]);

  return null; // Head-only dynamic injector
};

