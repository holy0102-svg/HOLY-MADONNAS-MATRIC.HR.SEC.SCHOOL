import { NewsItem, GalleryPhoto, Language } from '../types';

export type SectionType = 
  | 'home' 
  | 'academics' 
  | 'news' 
  | 'gallery' 
  | 'admissions' 
  | 'facilities' 
  | 'videos' 
  | 'contact';

export interface SectionSEOMetadata {
  section: SectionType;
  hash: string;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  keywordsEn: string;
  keywordsTa: string;
  ogType: 'website' | 'article';
  ogImage: string;
  ogImageAltEn: string;
  ogImageAltTa: string;
  twitterCard: 'summary_large_image' | 'summary';
  schemaGenerator: (context: {
    origin: string;
    language: Language;
    news: NewsItem[];
    photos: GalleryPhoto[];
  }) => object;
}

export const SCHOOL_BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://holymadonnasschool.edu.in';

export const SECTION_METADATA_CONFIG: Record<SectionType, SectionSEOMetadata> = {
  academics: {
    section: 'academics',
    hash: '#academics',
    titleEn: 'Academics & Curriculum (Pre-KG to Class XII) | Holy Madonnas Matriculation Higher Secondary School, Lalapet',
    titleTa: 'கல்வி & பாடத்திட்டம் (Pre-KG முதல் 12-ஆம் வகுப்பு வரை) | ஹோலி மடோனாஸ் மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி, லாலாபேட்டை',
    descriptionEn: 'Explore our rigorous academic streams from Pre-KG Montessori through Class XII (Bio-Maths, Computer Science, Commerce & CA track) with 100% Board Exam results at Holy Madonnas School, Lalapet.',
    descriptionTa: 'ஹோலி மடோனாஸ் மேல்நிலைப் பள்ளியின் மழலையர் வகுப்பு முதல் 12-ஆம் வகுப்பு வரையிலான விரிவான கல்வித் திட்டம், அறிவியல், கணினி & வணிகவியல் பாடப்பிரிவுகள், 100% தேர்ச்சி சாதனை.',
    keywordsEn: 'Holy Madonnas Academics, Lalapet School Syllabus, Matriculation Higher Secondary Tamil Nadu, Pre-KG admissions Lalapet, Class 10 SSLC Centum Karur, Class 12 HSC Science Commerce, NEET JEE coaching school Karur, Tamil Nadu State Board Curriculum',
    keywordsTa: 'ஹோலி மடோனாஸ் பள்ளி கல்வி, லாலாபேட்டை பள்ளி பாடத்திட்டம், மெட்ரிகுலேஷன் மேல்நிலைப்பள்ளி, 10ஆம் வகுப்பு பொதுத்தேர்வு, 12ஆம் வகுப்பு அறிவியல் மற்றும் வணிகவியல், நீட் ஜேஇஇ பயிற்சி கரூர்',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    ogImageAltEn: 'Classroom academic session and science students at Holy Madonnas School Lalapet',
    ogImageAltTa: 'ஹோலி மடோனாஸ் பள்ளியின் வகுப்பறை மற்றும் அறிவியல் மாணவர்கள்',
    twitterCard: 'summary_large_image',
    schemaGenerator: ({ origin, language }) => ({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: language === 'ta' ? 'ஹோலி மடோனாஸ் மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி' : 'Holy Madonnas Matriculation Higher Secondary School',
      url: `${origin}/#academics`,
      description: language === 'ta'
        ? 'மழலையர் வகுப்பு முதல் 12-ஆம் வகுப்பு வரை தரமான மெட்ரிகுலேஷன் கல்வி.'
        : 'Comprehensive K-12 matriculation education from Pre-KG to Class XII with specialized Science and Commerce streams.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Trichy - Karur Main Road, Lalapet',
        addressLocality: 'Lalapet, Karur District',
        addressRegion: 'Tamil Nadu',
        postalCode: '639105',
        addressCountry: 'IN'
      },
      hasCourse: [
        {
          '@type': 'Course',
          name: 'Early Childhood & Pre-Primary (Pre-KG, LKG, UKG)',
          description: 'Phonics-based English reading, Tamil rhymes, Montessori sensory activity kits, storytelling and fine motor development.',
          courseCode: 'HMS-PRE-PRI',
          educationalCredentialAwarded: 'Pre-School Certificate',
          provider: {
            '@type': 'School',
            name: 'Holy Madonnas School'
          }
        },
        {
          '@type': 'Course',
          name: 'Primary & Middle School (Classes I to VIII)',
          description: 'Bilingual literacy in English & Tamil, Experiential Mathematics, STEM composite science, Environmental Studies, Computer basics and Moral Science.',
          courseCode: 'HMS-PRI-MID',
          provider: {
            '@type': 'School',
            name: 'Holy Madonnas School'
          }
        },
        {
          '@type': 'Course',
          name: 'Secondary School - SSLC (Classes IX to X)',
          description: 'Tamil Nadu Matriculation Board curriculum with 100% centum track record, comprehensive weekly test series and board exam mentorship.',
          courseCode: 'HMS-SSLC-10',
          educationalCredentialAwarded: 'Secondary School Leaving Certificate (SSLC)',
          provider: {
            '@type': 'School',
            name: 'Holy Madonnas School'
          }
        },
        {
          '@type': 'Course',
          name: 'Higher Secondary Science Stream - Group 1 (Classes XI to XII)',
          description: 'Mathematics, Physics, Chemistry, Biology with integrated NEET & JEE foundational mentoring and advanced practical laboratory training.',
          courseCode: 'HMS-HSC-SCI1',
          educationalCredentialAwarded: 'Higher Secondary Course Certificate (HSC)',
          provider: {
            '@type': 'School',
            name: 'Holy Madonnas School'
          }
        },
        {
          '@type': 'Course',
          name: 'Higher Secondary Commerce Stream - Group 3 (Classes XI to XII)',
          description: 'Commerce, Accountancy, Economics, Business Mathematics with foundational preparation for Chartered Accountancy (CA Foundation) and management careers.',
          courseCode: 'HMS-HSC-COMM',
          educationalCredentialAwarded: 'Higher Secondary Course Certificate (HSC)',
          provider: {
            '@type': 'School',
            name: 'Holy Madonnas School'
          }
        }
      ]
    })
  },

  news: {
    section: 'news',
    hash: '#news',
    titleEn: 'Latest News, Circulars & School Announcements | Holy Madonnas School Lalapet',
    titleTa: 'சமீபத்திய செய்திகள், சுற்றறிக்கைகள் & அறிவிப்புகள் | ஹோலி மடோனாஸ் பள்ளி லாலாபேட்டை',
    descriptionEn: 'Stay updated with latest school notices, 2026-27 admission deadlines, academic circulars, exam timetables, sports triumphs, and celebrations at Holy Madonnas School, Lalapet.',
    descriptionTa: 'ஹோலி மடோனாஸ் பள்ளியின் அண்மைக்கால செய்திகள், 2026-27 சேர்க்கை அறிவிப்புகள், தேர்வு அட்டவணைகள், விளையாட்டுப் போட்டிகள் மற்றும் சுற்றறிக்கைகள்.',
    keywordsEn: 'Holy Madonnas news, Lalapet school notices, admission circular 2026-27, school events Karur, exam timetable Tamil Nadu, board exam toppers announcement, school circulars',
    keywordsTa: 'ஹோலி மடோனாஸ் பள்ளி செய்திகள், லாலாபேட்டை பள்ளி சுற்றறிக்கை, 2026-27 சேர்க்கை தேதி, பள்ளி தேர்வுகள், மாணவர் சாதனைகள்',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    ogImageAltEn: 'Official notice board and announcement circulars of Holy Madonnas School Lalapet',
    ogImageAltTa: 'ஹோலி மடோனாஸ் பள்ளியின் அதிகாரப்பூர்வ அறிவிப்பு பலகை',
    twitterCard: 'summary_large_image',
    schemaGenerator: ({ origin, language, news }) => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: language === 'ta' ? 'ஹோலி மடோனாஸ் பள்ளி செய்திகள் & சுற்றறிக்கைகள்' : 'Holy Madonnas School Latest News & Official Circulars',
      url: `${origin}/#news`,
      itemListElement: news.slice(0, 8).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'NewsArticle',
          headline: language === 'ta' ? item.titleTa : item.title,
          description: item.description,
          datePublished: '2026-08-15T09:00:00+05:30',
          articleSection: item.category,
          publisher: {
            '@type': 'School',
            name: 'Holy Madonnas Matriculation Higher Secondary School, Lalapet',
            logo: {
              '@type': 'ImageObject',
              url: `${origin}/icon.png`
            }
          },
          url: `${origin}/#news`
        }
      }))
    })
  },

  gallery: {
    section: 'gallery',
    hash: '#gallery',
    titleEn: 'Photo Gallery & Campus Life | Holy Madonnas Matriculation School Lalapet',
    titleTa: 'புகைப்படத் தொகுப்பு & வளாக நிகழ்வுகள் | ஹோலி மடோனாஸ் மேல்நிலைப் பள்ளி, லாலாபேட்டை',
    descriptionEn: 'Browse high-definition photos of Independence Day parades, annual sports day, science exhibitions, modern laboratories, smart classrooms, and celebrations at Holy Madonnas School, Lalapet.',
    descriptionTa: 'ஹோலி மடோனாஸ் பள்ளியின் சுதந்திர தின விழா, விளையாட்டுப் போட்டிகள், அறிவியல் கண்காட்சி, ஆய்வகங்கள் மற்றும் வளாக நிகழ்வுகளின் வண்ணமயமான புகைப்படத் தொகுப்பு.',
    keywordsEn: 'Holy Madonnas photo gallery, Lalapet school campus pictures, sports day celebrations Karur, science exhibition photos, smart classroom images, Tamil Nadu school gallery',
    keywordsTa: 'ஹோலி மடோனாஸ் புகைப்பட தொகுப்பு, லாலாபேட்டை பள்ளி படங்கள், விளையாட்டு தின விழா, அறிவியல் கண்காட்சி புகைப்படங்கள்',
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    ogImageAltEn: 'Students and campus celebrations gallery at Holy Madonnas School Lalapet',
    ogImageAltTa: 'ஹோலி மடோனாஸ் பள்ளி மாணவ மாணவியர் மற்றும் விழா புகைப்படங்கள்',
    twitterCard: 'summary_large_image',
    schemaGenerator: ({ origin, language, photos }) => ({
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: language === 'ta' ? 'ஹோலி மடோனாஸ் பள்ளி புகைப்படக் கூடம்' : 'Holy Madonnas School Photo Gallery & Visual Showcase',
      description: 'Visual showcase of student life, state-of-the-art facilities, academic milestones and extracurricular celebrations.',
      url: `${origin}/#gallery`,
      image: photos.slice(0, 12).map((photo) => ({
        '@type': 'ImageObject',
        contentUrl: photo.imageUrl,
        thumbnailUrl: photo.imageUrl,
        caption: language === 'ta' ? photo.titleTa : photo.title,
        datePublished: photo.date || '2026-08-15',
        author: {
          '@type': 'Organization',
          name: 'Holy Madonnas School, Lalapet'
        }
      }))
    })
  },

  admissions: {
    section: 'admissions',
    hash: '#admissions',
    titleEn: 'Admissions Open 2026–27 (Pre-KG to Class XII) | Holy Madonnas School Lalapet',
    titleTa: 'சேர்க்கை 2026–27 (Pre-KG முதல் 12-ஆம் வகுப்பு வரை) | ஹோலி மடோனாஸ் பள்ளி லாலாபேட்டை',
    descriptionEn: 'Apply online for Admissions 2026–2027 at Holy Madonnas Matriculation Higher Secondary School, Lalapet. Transparent admission procedure, scholarships, and bus transport available across Karur & Trichy routes.',
    descriptionTa: 'ஹோலி மடோனாஸ் மேல்நிலைப் பள்ளியில் 2026–2027 கல்வியாண்டிற்கான புதிய சேர்க்கை நடைபெறுகிறது. Pre-KG முதல் 12-ஆம் வகுப்பு வரை இன்றே ஆன்லைனில் விண்ணப்பியுங்கள்.',
    keywordsEn: 'Holy Madonnas admission 2026-27, Lalapet school admission form, Pre-KG admission Karur, Class 11 admission Science Commerce, school fee structure Lalapet',
    keywordsTa: 'ஹோலி மடோனாஸ் சேர்க்கை 2026-27, லாலாபேட்டை பள்ளி சேர்க்கை விண்ணப்பம், எல்கேஜி சேர்க்கை, 11ஆம் வகுப்பு சேர்க்கை',
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    ogImageAltEn: 'Holy Madonnas School Admissions Banner 2026-27',
    ogImageAltTa: 'ஹோலி மடோனாஸ் பள்ளி சேர்க்கை பதாகை 2026-27',
    twitterCard: 'summary_large_image',
    schemaGenerator: ({ origin, language }) => ({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: language === 'ta' ? '2026–2027 சேர்க்கை விண்ணப்ப பதிவு' : 'Holy Madonnas School Admissions Open 2026–2027',
      startDate: '2026-01-01',
      endDate: '2026-09-30',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Holy Madonnas Matriculation Higher Secondary School',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Trichy - Karur Main Road, Lalapet',
          addressLocality: 'Lalapet',
          addressRegion: 'Tamil Nadu',
          postalCode: '639105',
          addressCountry: 'IN'
        }
      },
      offers: {
        '@type': 'Offer',
        url: `${origin}/#admissions`,
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-01-01'
      },
      organizer: {
        '@type': 'School',
        name: 'Holy Madonnas School Lalapet',
        url: origin
      }
    })
  },

  facilities: {
    section: 'facilities',
    hash: '#facilities',
    titleEn: 'Campus Facilities & Modern Infrastructure | Holy Madonnas School Lalapet',
    titleTa: 'வளாக வசதிகள் & நவீன கட்டமைப்பு | ஹோலி மடோனாஸ் பள்ளி லாலாபேட்டை',
    descriptionEn: 'Explore our world-class infrastructure including Smart Classrooms, advanced Science Labs, Hi-Tech Computer Lab, expansive Library, RO Drinking Water, GPS School Buses, and lush Sports Arena.',
    descriptionTa: 'ஸ்மார்ட் வகுப்பறைகள், நவீன அறிவியல் ஆய்வகங்கள், கணினி மையம், நூலகம், ஆர்.ஓ குடிநீர் வசதி, ஜி.பி.எஸ் பள்ளி பேருந்துகள் மற்றும் விளையாட்டு மைதானம்.',
    keywordsEn: 'Holy Madonnas facilities, school science lab Lalapet, smart board classrooms Karur, school bus transport routes, computer lab school Karur',
    keywordsTa: 'ஹோலி மடோனாஸ் பள்ளி வசதிகள், ஸ்மார்ட் வகுப்பறைகள், அறிவியல் ஆய்வகம், பள்ளி பேருந்து வசதி',
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    ogImageAltEn: 'School Campus and Science Laboratory Facilities',
    ogImageAltTa: 'பள்ளி வளாகம் மற்றும் ஆய்வக வசதிகள்',
    twitterCard: 'summary_large_image',
    schemaGenerator: ({ origin }) => ({
      '@context': 'https://schema.org',
      '@type': 'CivicStructure',
      name: 'Holy Madonnas School Campus Infrastructure',
      url: `${origin}/#facilities`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lalapet',
        addressRegion: 'Tamil Nadu',
        postalCode: '639105',
        addressCountry: 'IN'
      }
    })
  },

  videos: {
    section: 'videos',
    hash: '#videos',
    titleEn: 'Video Wall & YouTube Highlights | Holy Madonnas School Lalapet',
    titleTa: 'காணொளிகள் & யூடியூப் நிகழ்வுகள் | ஹோலி மடோனாஸ் பள்ளி லாலாபேட்டை',
    descriptionEn: 'Watch student performances, annual day celebrations, Independence Day parades, science fair video demonstrations, and virtual campus tours on Holy Madonnas YouTube Video Wall.',
    descriptionTa: 'ஹோலி மடோனாஸ் பள்ளியின் ஆண்டு விழா, சுதந்திர தின அணிவகுப்பு, அறிவியல் செய்முறை விளக்கம் மற்றும் மாணவர் கலை நிகழ்ச்சிகளின் வீடியோ தொகுப்பு.',
    keywordsEn: 'Holy Madonnas videos, Lalapet school YouTube channel, annual day videos, school cultural dance, science demonstration video',
    keywordsTa: 'ஹோலி மடோனாஸ் வீடியோ, பள்ளி யூடியூப் காணொளிகள், ஆண்டு விழா வீடியோ, பள்ளி கலை நிகழ்ச்சி',
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    ogImageAltEn: 'School Video Wall and Performance Highlights',
    ogImageAltTa: 'பள்ளி வீடியோ தொகுப்பு',
    twitterCard: 'summary_large_image',
    schemaGenerator: ({ origin }) => ({
      '@context': 'https://schema.org',
      '@type': 'VideoGallery',
      name: 'Holy Madonnas School YouTube Video Wall',
      url: `${origin}/#videos`
    })
  },

  contact: {
    section: 'contact',
    hash: '#contact',
    titleEn: 'Contact Us, Campus Location & Office Hours | Holy Madonnas School Lalapet',
    titleTa: 'தொடர்பு கொள்ள, பள்ளி அமைவிடம் & அலுவலக நேரம் | ஹோலி மடோனாஸ் பள்ளி லாலாபேட்டை',
    descriptionEn: 'Get in touch with Holy Madonnas Matriculation Higher Secondary School, Lalapet. Phone: +91 99434 61787 / +91 96299 78066, Email: holylalapet123@gmail.com. Located on Trichy-Karur Main Road.',
    descriptionTa: 'ஹோலி மடோனாஸ் மேல்நிலைப் பள்ளியைத் தொடர்பு கொள்ள: +91 99434 61787 / +91 96299 78066. திருச்சி - கரூர் மெயின் ரோடு, லாலாபேட்டை, தமிழ்நாடு 639105.',
    keywordsEn: 'Holy Madonnas school contact, Lalapet school address, phone number, Karur matriculation school contact, school office timings',
    keywordsTa: 'ஹோலி மடோனாஸ் பள்ளி முகவரி, தொலைபேசி எண், லாலாபேட்டை பள்ளி அமைவிடம்',
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    ogImageAltEn: 'Holy Madonnas School Campus Building in Lalapet',
    ogImageAltTa: 'ஹோலி மடோனாஸ் பள்ளி வளாக கட்டடம்',
    twitterCard: 'summary_large_image',
    schemaGenerator: ({ origin }) => ({
      '@context': 'https://schema.org',
      '@type': 'School',
      name: 'Holy Madonnas Matriculation Higher Secondary School',
      telephone: '+91 99434 61787',
      email: 'holylalapet123@gmail.com',
      url: `${origin}/#contact`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Trichy - Karur Main Road, Lalapet',
        addressLocality: 'Lalapet',
        addressRegion: 'Tamil Nadu',
        postalCode: '639105',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '10.9324',
        longitude: '78.2589'
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:30',
          closes: '16:30'
        }
      ]
    })
  },

  home: {
    section: 'home',
    hash: '#home',
    titleEn: 'Holy Madonnas Matriculation Higher Secondary School | Lalapet, Karur District',
    titleTa: 'ஹோலி மடோனாஸ் மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி | லாலாபேட்டை, கரூர் மாவட்டம்',
    descriptionEn: 'Official Portal of Holy Madonnas Matriculation Higher Secondary School, Lalapet. Knowledge • Values • Discipline • Excellence. Admissions Open for Academic Year 2026–27.',
    descriptionTa: 'ஹோலி மடோனாஸ் மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி, லாலாபேட்டை. அறிவு • நற்பண்புகள் • ஒழுக்கம் • சிறந்து விளங்குதல். புதிய கல்வி ஆண்டு 2026–27 சேர்க்கை நடைபெறுகிறது.',
    keywordsEn: 'Holy Madonnas Matriculation School, Lalapet, Karur District school, best school in Lalapet, Matriculation Higher Secondary Tamil Nadu, Admissions 2026-27, 100% board results',
    keywordsTa: 'ஹோலி மடோனாஸ் மெட்ரிகுலேஷன் பள்ளி, லாலாபேட்டை, கரூர் மாவட்ட சிறந்த பள்ளி, கல்வி சேர்க்கை 2026-27, 100% தேர்ச்சி',
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    ogImageAltEn: 'Holy Madonnas Matriculation Higher Secondary School Campus Lalapet',
    ogImageAltTa: 'ஹோலி மடோனாஸ் மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி வளாகம் லாலாபேட்டை',
    twitterCard: 'summary_large_image',
    schemaGenerator: ({ origin, language }) => ({
      '@context': 'https://schema.org',
      '@type': 'School',
      name: language === 'ta' ? 'ஹோலி மடோனாஸ் மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி' : 'Holy Madonnas Matriculation Higher Secondary School',
      alternateName: 'Holy Madonnas School Lalapet',
      url: origin,
      logo: `${origin}/icon.png`,
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      description: 'Recognized by Govt. of Tamil Nadu • Co-Educational Institution offering holistic education from Pre-KG to Std XII.',
      motto: 'Knowledge • Values • Discipline • Excellence',
      telephone: '+91 99434 61787',
      email: 'holylalapet123@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Trichy - Karur Main Road, Lalapet',
        addressLocality: 'Lalapet, Karur District',
        addressRegion: 'Tamil Nadu',
        postalCode: '639105',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '10.9324',
        longitude: '78.2589'
      },
      sameAs: [
        'https://youtube.com/@holymadonnas?si=taqDqAepGtJbZYV2',
        'https://facebook.com/HolyMadonnasSchoolLalapet'
      ]
    })
  }
};

/**
 * Utility to inject and dynamically update DOM head meta tags
 */
export function applyDynamicSEOMetadata(
  section: SectionType,
  language: Language,
  news: NewsItem[],
  photos: GalleryPhoto[]
) {
  if (typeof document === 'undefined') return;

  const config = SECTION_METADATA_CONFIG[section] || SECTION_METADATA_CONFIG.home;
  const origin = typeof window !== 'undefined' ? window.location.origin : SCHOOL_BASE_URL;
  const currentCanonical = `${origin}/${config.hash}`;

  const title = language === 'ta' ? config.titleTa : config.titleEn;
  const description = language === 'ta' ? config.descriptionTa : config.descriptionEn;
  const keywords = language === 'ta' ? config.keywordsTa : config.keywordsEn;
  const imageAlt = language === 'ta' ? config.ogImageAltTa : config.ogImageAltEn;
  const locale = language === 'ta' ? 'ta_IN' : 'en_IN';
  const alternateLocale = language === 'ta' ? 'en_IN' : 'ta_IN';

  // 1. Update Document Title
  document.title = title;

  // 2. Set HTML lang attribute
  document.documentElement.setAttribute('lang', language);

  // 3. Helper for setting meta tags
  const setMeta = (attributeName: 'name' | 'property', key: string, value: string) => {
    let tag = document.querySelector(`meta[${attributeName}="${key}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attributeName, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', value);
  };

  // Standard Meta Tags
  setMeta('name', 'description', description);
  setMeta('name', 'keywords', keywords);
  setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMeta('name', 'author', 'Holy Madonnas Matriculation Higher Secondary School, Lalapet');
  setMeta('name', 'theme-color', '#5A5A40');

  // Open Graph / Facebook Meta Tags
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', currentCanonical);
  setMeta('property', 'og:type', config.ogType);
  setMeta('property', 'og:image', config.ogImage);
  setMeta('property', 'og:image:alt', imageAlt);
  setMeta('property', 'og:site_name', 'Holy Madonnas School Lalapet');
  setMeta('property', 'og:locale', locale);
  setMeta('property', 'og:locale:alternate', alternateLocale);

  // Twitter Card Meta Tags
  setMeta('name', 'twitter:card', config.twitterCard);
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', config.ogImage);
  setMeta('name', 'twitter:image:alt', imageAlt);
  setMeta('name', 'twitter:site', '@HolyMadonnas');

  // Section Indicator Meta Tag for automated crawlers and debuggers
  setMeta('name', 'school:section', section);

  // 4. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', currentCanonical);

  // 5. Update JSON-LD Structured Data
  let ldJsonScript = document.getElementById('dynamic-seo-ld-json') as HTMLScriptElement | null;
  if (!ldJsonScript) {
    ldJsonScript = document.createElement('script');
    ldJsonScript.setAttribute('type', 'application/ld+json');
    ldJsonScript.setAttribute('id', 'dynamic-seo-ld-json');
    document.head.appendChild(ldJsonScript);
  }

  const structuredData = config.schemaGenerator({
    origin,
    language,
    news,
    photos
  });

  ldJsonScript.textContent = JSON.stringify(structuredData, null, 2);
}
