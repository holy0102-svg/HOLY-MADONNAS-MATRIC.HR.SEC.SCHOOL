import { GalleryPhoto, VideoItem, NewsItem, Facility, Teacher, SchoolEvent, Testimonial, BusRoute, ExamScheduleItem } from '../types';

export const initialGalleryPhotos: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'School Main Building & Lush Green Campus',
    titleTa: 'பள்ளியின் பிரதான கட்டடம் & பசுமை வளாகம்',
    category: 'campus',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Modern multistoried infrastructure surrounded by serene greenery at Lalapet campus.',
    captionTa: 'லாலாபேட்டையில் அமைந்துள்ள அமைதியான, பசுமையான பள்ளி வளாகம்.',
    date: 'August 2026'
  },
  {
    id: 'photo-2',
    title: '79th Independence Day Flag Hoisting & March Past',
    titleTa: '79-வது சுதந்திர தின கொடியேற்றம் & மாணவர் அணிவகுப்பு',
    category: 'independence_day',
    imageUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Patriotic fervor as student scout and guide squads salute the national tricolor.',
    captionTa: 'தேசியக் கொடிக்கு வணக்கம் செலுத்தும் பள்ளி சாரண-சாரணியர் படை.',
    date: '15 Aug 2026'
  },
  {
    id: 'photo-3',
    title: 'Solemn Holy Mass & Thanksgiving Prayer in Chapel',
    titleTa: 'பள்ளி சிற்றாலயத்தில் சிறப்பு திருப்பலி & நன்றி வழிபாடு',
    category: 'school_mass',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-195fe57876a4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Blessings for students appearing in academic board exams during the holy communion.',
    captionTa: 'பொதுத்தேர்வு எழுதும் மாணவர்களுக்கான சிறப்பு ஆசீர்வாத திருப்பலி.',
    date: '01 Aug 2026'
  },
  {
    id: 'photo-4',
    title: 'Annual Sports Meet - Track & Field Championship',
    titleTa: 'ஆண்டு விளையாட்டுப் போட்டி - தடகளப் பிரிவு',
    category: 'sports_day',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    caption: 'High-energy inter-house 100m sprint and relay races on the sports ground.',
    captionTa: 'விறுவிறுப்பான 100 மீ ஓட்டப்பந்தயம் மற்றும் தொடர் ஓட்டம்.',
    date: '28 Jul 2026'
  },
  {
    id: 'photo-5',
    title: 'Traditional Bharatanatyam & Folk Fusion Dance',
    titleTa: 'பாரம்பரிய பரதநாட்டியம் & கிராமிய நடன நிகழ்ச்சி',
    category: 'cultural_events',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    caption: 'Vibrant cultural stage extravaganza showcasing Tamil heritage and artistic grace.',
    captionTa: 'தமிழர் பாரம்பரியத்தை பறைசாற்றும் வண்ணமிகு நடனக் கலை நிகழ்ச்சி.',
    date: '10 Jul 2026'
  },
  {
    id: 'photo-6',
    title: 'District Science & Robotics Project Exhibition',
    titleTa: 'மாவட்ட அளவிலான அறிவியல் & ரோபோடிக்ஸ் கண்காட்சி',
    category: 'science_exhibition',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Students demonstrating smart solar grids, hydraulic cranes and automated drip irrigation.',
    captionTa: 'மாணவர்களின் நவீன அறிவியல் மற்றும் ஆட்டோமேஷன் படைப்புகள்.',
    date: '22 Jun 2026'
  },
  {
    id: 'photo-7',
    title: 'Merit Awards & State Rank Felicitation Ceremony',
    titleTa: 'மாநில சாதனையாளர்கள் மற்றும் சிறந்த மாணவர்களுக்குப் பரிசளிப்பு',
    category: 'prize_distribution',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    caption: 'Honouring class 10 and 12 top scorers with gold medals and scholarships.',
    captionTa: '10 மற்றும் 12-ஆம் வகுப்பு பொதுத்தேர்வில் முதலிடம் பிடித்த மாணவர்களுக்கு தங்கப் பதக்கம்.',
    date: '05 Jun 2026'
  },
  {
    id: 'photo-8',
    title: 'Pre-KG & Primary Joyful Learning Classrooms',
    titleTa: 'மழலையர் பிரிவு விளையாட்டு வழி கற்றல் வகுப்பறை',
    category: 'students',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    caption: 'Interactive activity centers fostering curiosity, phonics and peer sharing.',
    captionTa: 'மகிழ்ச்சியான சூழலில் ஆரம்பக் கல்வியைக் கற்கும் மழலையர்கள்.',
    date: '18 Jul 2026'
  },
  {
    id: 'photo-9',
    title: 'Faculty Professional Development & Workshop',
    titleTa: 'ஆசிரியர்களுக்கான நவீன கற்பித்தல் திறன் மேம்பாட்டுப் பயிலரங்கம்',
    category: 'teachers',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    caption: 'Our passionate teaching staff undergoing advanced STEM pedagogy workshop.',
    captionTa: 'நவீன டிஜிட்டல் கற்பித்தல் பயிற்சி பெறும் பள்ளியின் அர்ப்பணிப்புள்ள ஆசிரியர்கள்.',
    date: '02 Jun 2026'
  },
  {
    id: 'photo-10',
    title: 'Christmas & Pongal Harmonious School Celebrations',
    titleTa: 'கிறிஸ்துமஸ் மற்றும் பொங்கல் சமத்துவக் கொண்டாட்டம்',
    category: 'celebrations',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    caption: 'All communities celebrating festivals with communal unity, carols and sweet pongal.',
    captionTa: 'அனைத்து மாணவர்களும் ஒன்றிணைந்து கொண்டாடும் பண்டிகை விழாக்கள்.',
    date: '14 Jan 2026'
  },
  {
    id: 'photo-11',
    title: 'Modern High-Speed Computer Laboratory',
    titleTa: 'நவீன கணினி ஆய்வகம்',
    category: 'campus',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    caption: 'Individual computers with high-speed fiber internet and coding curriculum.',
    captionTa: 'அதிவேக இணைய வசதியுடன் கூடிய கணினி பயிற்சி மையம்.',
    date: '12 May 2026'
  },
  {
    id: 'photo-12',
    title: 'Karate, Yoga & Physical Fitness Drill Performance',
    titleTa: 'கராத்தே, யோகா மற்றும் உடற்பயிற்சி செயல்விளக்கம்',
    category: 'sports_day',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
    caption: 'Self defense techniques and disciplined physical education on the open grounds.',
    captionTa: 'தற்காப்புக் கலை மற்றும் யோகாசனம் செய்யும் மாணவ-மாணவியர்.',
    date: '20 Jul 2026'
  }
];

export const initialVideos: VideoItem[] = [
  {
    id: 'vid-hms-official',
    title: "Holy Madonna's School Highlights & Campus Special",
    titleTa: 'ஹோலி மடோனாஸ் மெட்ரிக் பள்ளி - சிறப்பு வீடியோ பதிவு',
    category: 'Official Video',
    categoryTa: 'அதிகாரப்பூர்வ வீடியோ',
    youtubeId: 'nWLCdVGXRSc', // User official school video
    duration: '03:45',
    date: 'Aug 2026',
    views: '4.8K views',
    isFeatured: true
  },
  {
    id: 'vid-2',
    title: 'Feast of Our Lady & Holy Mass with Students Choir',
    titleTa: 'அன்னை மரியின் திருவிழா & பள்ளி மாணவர்களின் திருப்பலி பாடல்',
    category: 'School Mass',
    categoryTa: 'பள்ளி திருப்பலி',
    youtubeId: 'nWLCdVGXRSc',
    duration: '08:20',
    date: '02 Aug 2026',
    views: '2.1K views',
    isFeatured: true
  },
  {
    id: 'vid-3',
    title: 'Annual Day Gala: Students’ Folk & Fusion Dance Performance',
    titleTa: 'ஆண்டு விழா: மாணவ-மாணவியரின் கிராமிய மற்றும் மேற்கத்திய நடனம்',
    category: 'Student Dance',
    categoryTa: 'மாணவர் நடனம்',
    youtubeId: 'nWLCdVGXRSc',
    duration: '05:12',
    date: '25 Jul 2026',
    views: '5.8K views',
    isFeatured: false
  },
  {
    id: 'vid-4',
    title: 'Sports Day Synchronization Drill & Karate Demonstration',
    titleTa: 'விளையாட்டு விழா உடற்பயிற்சி அணிவகுப்பு & கராத்தே செயல்விளக்கம்',
    category: 'Drill Performance',
    categoryTa: 'உடற்பயிற்சி அணிவகுப்பு',
    youtubeId: 'nWLCdVGXRSc',
    duration: '04:35',
    date: '18 Jul 2026',
    views: '4.2K views',
    isFeatured: false
  },
  {
    id: 'vid-5',
    title: 'Social Awareness Mime: Save Water & Protect Trees',
    titleTa: 'சமூக விழிப்புணர்வு மைம் (Mime): நீர் பாதுகாப்பு & மரம் வளர்ப்பு',
    category: 'Mime Performance',
    categoryTa: 'மைம் நாடகம்',
    youtubeId: 'nWLCdVGXRSc',
    duration: '07:15',
    date: '12 Jul 2026',
    views: '3.9K views',
    isFeatured: false
  },
  {
    id: 'vid-6',
    title: 'Science Fair Highlights & Young Innovators Showcase',
    titleTa: 'அறிவியல் கண்காட்சி சிறப்புப் பதிவுகள் & இளம் விஞ்ஞானிகள்',
    category: 'School Events',
    categoryTa: 'பள்ளி நிகழ்வுகள்',
    youtubeId: 'nWLCdVGXRSc',
    duration: '09:50',
    date: '28 Jun 2026',
    views: '2.7K views',
    isFeatured: false
  }
];

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Admissions Open for Academic Year 2026–2027 (Pre-KG to Std XI)',
    titleTa: '2026–2027 ஆம் கல்வி ஆண்டிற்கான புதிய மாணவர் சேர்க்கை ஆரம்பம் (Pre-KG முதல் 11-ஆம் வகுப்பு வரை)',
    category: 'admissions',
    date: '14 Aug 2026',
    description: 'Online and offline applications are now invited for Pre-KG, LKG, UKG, and Classes I to XI. Limited seats are available. Early registrations are advised for bus routes.',
    descriptionTa: 'மழலையர் பிரிவு முதல் 11-ஆம் வகுப்பு வரையிலான மாணவர் சேர்க்கை நடைபெறுகிறது. பள்ளிப் பேருந்து வசதிக்கு முன்கூட்டியே பதிவு செய்ய அறிவுறுத்தப்படுகிறது.',
    isUrgent: true,
    fileUrl: '#',
    fileName: 'Admission_Prospectus_2026-27.pdf'
  },
  {
    id: 'news-2',
    title: 'Independence Day 2026 Celebrations & Cultural Honors',
    titleTa: 'சுதந்திர தின 2026 கொண்டாட்டங்கள் மற்றும் கலை நிகழ்ச்சிகள்',
    category: 'events',
    date: '15 Aug 2026',
    description: 'School Correspondent hoisted the national tricolor followed by patriotic dances, drill exhibitions, and sweets distribution to all students and parents.',
    descriptionTa: 'பள்ளி வளாகத்தில் தேசியக் கொடியேற்றப்பட்டு, மாணவ-மாணவியரின் தேசபக்தி கலை நிகழ்ச்சிகள் சிறப்பாக நடைபெற்றது.',
    isUrgent: false,
    fileUrl: '#',
    fileName: 'Independence_Day_Report_2026.pdf'
  },
  {
    id: 'news-3',
    title: 'Centum Score Achievements in 10th & 12th Board Examinations',
    titleTa: '10 மற்றும் 12-ஆம் வகுப்பு பொதுத்தேர்வில் 100% தேர்ச்சி & நூற்றுக்கு நூறு மதிப்பெண்கள் சாதனை',
    category: 'academics',
    date: '08 Aug 2026',
    description: 'Our students have secured stellar 100% pass percentage with 14 centum scores in Mathematics, Physics, and Computer Science. Hearty congratulations to the toppers and teachers!',
    descriptionTa: 'கணிதம், இயற்பியல் மற்றும் கணினி அறிவியல் பாடங்களில் மாணவர்கள் சதம் அடித்து பள்ளிக்கு பெருமை சேர்த்துள்ளனர்.',
    isUrgent: false,
    fileUrl: '#',
    fileName: 'Board_Exam_Toppers_List.pdf'
  },
  {
    id: 'news-4',
    title: 'First Mid-Term Examination Schedule & Syllabus Circular',
    titleTa: 'முதல் இடைப்பருவத் தேர்வு (Mid-Term) கால அட்டவணை & பாடத்திட்ட சுற்றறிக்கை',
    category: 'circular',
    date: '04 Aug 2026',
    description: 'The First Mid-Term examinations for Classes I to XII will commence from August 24, 2026. Parents are requested to review the portion circular.',
    descriptionTa: '1 முதல் 12 ஆம் வகுப்பு வரையிலான மாணவர்களுக்கு ஆகஸ்ட் 24 முதல் இடைப்பருவத் தேர்வுகள் ஆரம்பமாகின்றன.',
    isUrgent: false,
    fileUrl: '#',
    fileName: 'MidTerm_Exam_Timetable_Aug2026.pdf'
  },
  {
    id: 'news-5',
    title: 'Annual Sports Meet & Inter-School Athletic Trials',
    titleTa: 'பள்ளி ஆண்டு விளையாட்டு விழா & தடகளப் போட்டிகள்',
    category: 'events',
    date: '28 Jul 2026',
    description: 'Selection trials for football, volleyball, badminton, karate, and athletic relay squads will be held this Saturday on the main school ground.',
    descriptionTa: 'கால்பந்து, கைப்பந்து, பூப்பந்து மற்றும் தடகளப் போட்டிகளுக்கான தேர்வு வரும் சனிக்கிழமை பள்ளி மைதானத்தில் நடைபெறும்.',
    isUrgent: false
  }
];

export const schoolFacilities: Facility[] = [
  {
    id: 'fac-science',
    title: 'Advanced Science Laboratories',
    titleTa: 'நவீன அறிவியல் ஆய்வகங்கள் (இயற்பியல், வேதியியல், உயிரியல்)',
    iconName: 'FlaskConical',
    description: 'Separate, fully equipped high-tech Physics, Chemistry, and Biology laboratories compliant with Tamil Nadu State Board standards for hands-on experimentation.',
    descriptionTa: 'மாணவர்கள் செய்முறைப் பயிற்சி பெற தனித்தனி நவீன இயற்பியல், வேதியியல் மற்றும் உயிரியல் ஆய்வகங்கள்.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    features: ['Modern apparatus & specimen jars', 'Fume hoods & safety shower stations', 'Digital microscopes & models', 'Individual workstation for each student'],
    featuresTa: ['நவீன உபகரணங்கள்', 'பாதுகாப்பான பரிசோதனை மேடைகள்', 'டிஜிட்டல் நுண்ணோக்கிகள்', 'தனிநபர் பயிற்சி வசதி']
  },
  {
    id: 'fac-computer',
    title: 'Next-Gen Computer Lab & Coding Center',
    titleTa: 'அதிநவீன கணினி ஆய்வகம் & கோடிங் மையம்',
    iconName: 'Laptop',
    description: 'High-speed networked computer terminal lab with dedicated fiber broadband, multimedia systems, and coding modules in Scratch, Python, and Web Technologies.',
    descriptionTa: 'அதிவேக இணைய வசதி மற்றும் நவீன மென்பொருட்களுடன் கூடிய குளிரூட்டப்பட்ட கணினி ஆய்வகம்.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    features: ['1:1 Student to PC ratio', 'Python, C++, HTML5 & Scratch curriculum', 'High-speed Optical Fiber Internet', 'UPS power backup with solar support'],
    featuresTa: ['ஒரு மாணவருக்கு ஒரு கணினி', 'பைதான் & கோடிங் பயிற்சி', 'அதிவேக ஆப்டிகல் ஃபைபர் நெட்', 'தடையற்ற மின்வசதி']
  },
  {
    id: 'fac-smart',
    title: 'Digital Smart Classrooms',
    titleTa: 'டிஜிட்டல் ஸ்மார்ட் வகுப்பறைகள்',
    iconName: 'Tv',
    description: 'Interactive touch boards, audiovisual animated lessons, 3D STEM visualizers, and multimedia acoustics to turn abstract concepts into vivid learning experiences.',
    descriptionTa: '3D அனிமேஷன் மற்றும் தொடுதிரை பலகைகளுடன் கூடிய நவீன டிஜிட்டல் வகுப்பறைகள்.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    features: ['Interactive 75" Touch LED Panels', 'Curriculum-aligned 3D audio-video modules', 'Ergonomic non-glare student desks', 'Natural ventilation and bright lighting'],
    featuresTa: ['75 இன்ச் ஸ்மார்ட் டச் போர்டுகள்', 'பாடத்திட்ட வீடியோ அனிமேஷன்', 'சௌகரியமான இருக்கைகள்', 'இயற்கை காற்றோட்டம்']
  },
  {
    id: 'fac-library',
    title: 'Grand Knowledge Library & Reading Lounge',
    titleTa: 'அறிவுக் கருவூலம் - நூலகம் & வாசிப்பு அரங்கம்',
    iconName: 'BookOpen',
    description: 'Over 10,000+ volumes spanning academic references, world encyclopedias, Tamil literature, competitive exam primers, children’s storybooks, and journals.',
    descriptionTa: '10,000-க்கும் மேற்பட்ட தமிழ், ஆங்கில இலக்கிய மற்றும் பொது அறிவு நூல்களைக் கொண்ட நூலகம்.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    features: ['10,000+ curated books & periodicals', 'Daily regional & national newspapers', 'Quiet reading corners & research pods', 'Digital cataloging and borrowing'],
    featuresTa: ['10,000+ புத்தகங்கள் & சஞ்சிகைகள்', 'தினசரி செய்தித்தாள்கள்', 'அமைதியான வாசிப்பு சூழல்', 'டிஜிட்டல் பதிவு முறை']
  },
  {
    id: 'fac-sports',
    title: 'Expansive Sports Arena & Playground',
    titleTa: 'பரந்த விளையாட்டு மைதானம் & உடற்பயிற்சிக் கூடம்',
    iconName: 'Trophy',
    description: 'Multi-acre open sports ground facilitating football, cricket, volleyball, throwball, badminton, athletic tracks, alongside qualified Physical Education trainers.',
    descriptionTa: 'கால்பந்து, கைப்பந்து, பூப்பந்து, தடகளம் உள்ளிட்ட விளையாட்டுகளுக்கான பிரம்மாண்ட மைதானம்.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    features: ['Full-size 200m athletic track', 'Dedicated Volleyball & Throwball courts', 'Karate, Yoga & Silambam coaching', 'Annual inter-house tournaments'],
    featuresTa: ['200 மீ தடகள ஓடுதளம்', 'கைப்பந்து & பூப்பந்து தளங்கள்', 'கராத்தே, சிலம்பம் & யோகா பயிற்சி', 'ஆண்டு விளையாட்டுப் போட்டிகள்']
  },
  {
    id: 'fac-transport',
    title: 'Safe & GPS-Enabled School Bus Fleet',
    titleTa: 'பாதுகாப்பான பள்ளிப் பேருந்து வசதி (GPS உடன்)',
    iconName: 'Bus',
    description: 'A fleet of well-maintained school buses covering Lalapet, Kulithalai, Mayanur, Pettavaithalai, Mahadhanapuram, and surrounding rural routes with speed governors.',
    descriptionTa: 'லாலாபேட்டை, குளித்தலை, மாயனூர் மற்றும் சுற்றுவட்டார பகுதிகளுக்கு பாதுகாப்பான பேருந்து வசதி.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    features: ['Live GPS tracking & emergency SOS', 'Speed governors & CCTV inside all buses', 'Trained drivers and caring attendants', 'Doorstep pickup in major residential zones'],
    featuresTa: ['ஜிபிஎஸ் நேரலை கண்காணிப்பு', 'வேகக் கட்டுப்பாட்டு கருவி', 'அனுபவமிக்க ஓட்டுநர்கள்', 'பாதுகாப்பான பயணம்']
  },
  {
    id: 'fac-prayer',
    title: 'Holy Chapel & Interfaith Prayer Hall',
    titleTa: 'சிற்றாலயம் & கூட்டுப் பிரார்த்தனைக் கூடம்',
    iconName: 'Church',
    description: 'A serene chapel for holy mass, quiet reflection, thanksgiving hymns, and universal morning assemblies that cultivate inner peace and ethical grounding.',
    descriptionTa: 'மன அமைதி மற்றும் ஆன்மீக நற்பண்புகளை வளர்க்கும் தூய சிற்றாலயம் மற்றும் பிரார்த்தனை கூடம்.',
    image: 'https://images.unsplash.com/photo-1548625361-195fe57876a4?auto=format&fit=crop&w=800&q=80',
    features: ['Weekly Holy Mass for Catholic students', 'Universal moral values for all faiths', 'Peaceful meditative atmosphere', 'Choir & spiritual music rehearsals'],
    featuresTa: ['வாராந்திர சிறப்பு திருப்பலி', 'அனைத்து மதத்தினருக்கும் நன்னெறி', 'அமைதியான தியான சூழல்', 'பள்ளி பாடகர் குழு பயிற்சி']
  },
  {
    id: 'fac-water',
    title: 'Pure RO Purified Drinking Water & Sanitation',
    titleTa: 'சுத்திகரிக்கப்பட்ட RO குடிநீர் & சுகாதார வசதி',
    iconName: 'Droplets',
    description: 'Multi-stage reverse osmosis water filtration plants installed on every floor, paired with hygienically maintained washroom facilities and eco-friendly waste management.',
    descriptionTa: 'அனைத்து தளங்களிலும் சுத்தமான RO குடிநீர் மற்றும் மிகச் சிறந்த சுகாதார கழிவறை வசதிகள்.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    features: ['Multi-tier industrial RO filter plants', 'Touch-free hygienic water dispensers', 'Regular water quality lab testing', 'Spotlessly sanitized restrooms'],
    featuresTa: ['நவீன RO குடிநீர் சுத்திகரிப்பு', 'சுகாதாரமான தண்ணீர் விநியோகம்', 'தரப் பரிசோதனை செய்யப்பட்ட குடிநீர்', 'தூய்மையான கழிவறைகள்']
  },
  {
    id: 'fac-health',
    title: 'First-Aid Infirmary & Student Wellness Hub',
    titleTa: 'முதலுதவி மருத்துவ மையம் & மாணவர் நலப்பிரிவு',
    iconName: 'HeartPulse',
    description: 'Dedicated first-aid infirmary equipped with medical beds, essential emergency medications, regular doctor health checkups, and qualified nursing assistance.',
    descriptionTa: 'அவசர முதலுதவி வசதிகள், செவிலியர் உதவி மற்றும் வருடாந்திர மருத்துவ பரிசோதனைகள்.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    features: ['Trained first-aid medical attendant', 'Annual eye, dental & pediatric checkups', 'Emergency tie-up with nearby hospital', 'Student counseling support'],
    featuresTa: ['பயிற்சி பெற்ற முதலுதவி ஊழியர்', 'வருடாந்திர கண் & பல் மருத்துவ பரிசோதனை', 'அருகிலுள்ள மருத்துவமனை இணைப்பு', 'மனநல ஆலோசனை']
  }
];

export const teachersList: Teacher[] = [
  {
    id: 't-1',
    name: 'Velmurugan M.A., B.Ed.',
    nameTa: 'வேல்முருகன் M.A., B.Ed.',
    designation: 'Principal & Correspondent',
    designationTa: 'முதல்வர் & தாளாளர்',
    subject: 'Educational Administration & Visionary Leadership',
    subjectTa: 'கல்வி நிர்வாகம் & தலைமைத்துவம்',
    qualification: 'M.A., B.Ed.',
    department: 'leadership',
    experience: '24 Years',
    photo: ''
  },
  {
    id: 't-2',
    name: 'Mr. S. Dharmarajan M.Sc., B.Ed.',
    nameTa: 'திரு. எஸ். தர்மராஜன்',
    designation: 'Vice Principal & HOD Science',
    designationTa: 'துணை முதல்வர் & அறிவியல் துறைத் தலைவர்',
    subject: 'Physics & Applied Science',
    subjectTa: 'இயற்பியல்',
    qualification: 'M.Sc. (Physics), B.Ed., SET',
    department: 'science',
    experience: '18 Years',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't-3',
    name: 'Mrs. R. Revathi M.Sc., M.Phil., B.Ed.',
    nameTa: 'திருமதி. ஆர். ரேவதி',
    designation: 'HOD Mathematics',
    designationTa: 'கணிதத் துறைத் தலைவர்',
    subject: 'Higher Secondary Mathematics & Calculus',
    subjectTa: 'கணிதம் & கலனம்',
    qualification: 'M.Sc. (Maths), M.Phil., B.Ed.',
    department: 'maths',
    experience: '15 Years',
    photo: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't-4',
    name: 'Mr. P. Vijayakumar M.C.A., B.Ed.',
    nameTa: 'திரு. பி. விஜயகுமார்',
    designation: 'Senior Computer Faculty & IT Incharge',
    designationTa: 'கணினி விரிவுரையாளர் & IT பொறுப்பாளர்',
    subject: 'Computer Science, Python & Web Technology',
    subjectTa: 'கணினி அறிவியல் & பைதான்',
    qualification: 'M.C.A., B.Ed.',
    department: 'science',
    experience: '12 Years',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't-5',
    name: 'Dr. K. Thamizharasi M.A., Ph.D.',
    nameTa: 'முனைவர். கே. தமிழரசி',
    designation: 'Senior Tamil Language Faculty',
    designationTa: 'முதுகலை தமிழ் ஆசிரியை',
    subject: 'Tamil Language, Sangam Literature & Grammar',
    subjectTa: 'தமிழ் மொழி & சங்க இலக்கியம்',
    qualification: 'M.A., M.Phil., Ph.D. (Tamil)',
    department: 'languages',
    experience: '16 Years',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't-6',
    name: 'Mr. A. Antonysamy M.P.Ed., NIS',
    nameTa: 'திரு. ஏ. அந்தோணிசாமி',
    designation: 'Physical Education Director',
    designationTa: 'உடற்கல்வி இயக்குநர்',
    subject: 'Athletics, Football, Karate & Yoga',
    subjectTa: 'உடற்கல்வி & கராத்தே',
    qualification: 'M.P.Ed., NIS Coach Cert.',
    department: 'arts_sports',
    experience: '14 Years',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't-7',
    name: 'Mrs. S. Anitha B.Sc., D.T.Ed.',
    nameTa: 'திருமதி. எஸ். அனிதா',
    designation: 'Primary Section Coordinator',
    designationTa: 'தொடக்கப்பள்ளி ஒருங்கிணைப்பாளர்',
    subject: 'Foundational English & Environmental Studies',
    subjectTa: 'ஆங்கிலம் & சூழ்நிலையியல்',
    qualification: 'B.Sc., D.T.Ed., Montessori Cert.',
    department: 'primary',
    experience: '10 Years',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't-8',
    name: 'Mrs. M. Vimala M.Com., M.Ed.',
    nameTa: 'திருமதி. எம். விமலா',
    designation: 'Senior Commerce & Accountancy Faculty',
    designationTa: 'முதுகலை வணிகவியல் ஆசிரியை',
    subject: 'Accountancy, Commerce & Business Studies',
    subjectTa: 'கணக்குப் பதிவியல் & வணிகவியல்',
    qualification: 'M.Com., M.Ed., M.Phil.',
    department: 'maths',
    experience: '13 Years',
    photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80'
  }
];

export const schoolEventsList: SchoolEvent[] = [
  {
    id: 'ev-1',
    title: '79th Independence Day Celebration & Cultural Gala',
    titleTa: '79-வது சுதந்திர தின விழா & தேசபக்தி கலை நிகழ்ச்சி',
    date: '15 Aug 2026',
    time: '8:00 AM – 11:30 AM',
    venue: 'School Main Playground',
    venueTa: 'பள்ளி பிரதான விளையாட்டு மைதானம்',
    category: 'Celebration',
    description: 'Flag hoisting ceremony by the Correspondent, march past by scouts, patriotic musical choir, and thematic drama on freedom fighters.',
    descriptionTa: 'தேசியக் கொடியேற்றம், அணிவகுப்பு மற்றும் சுதந்திர போராட்ட வீரர்களைப் போற்றும் நாடகங்கள்.',
    status: 'Completed',
    highlightPhoto: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ev-2',
    title: 'First Mid-Term Examinations (Std I - XII)',
    titleTa: 'முதல் இடைப்பருவத் தேர்வுகள் (வகுப்புகள் 1 - 12)',
    date: '24 Aug 2026',
    time: '9:30 AM – 12:30 PM',
    venue: 'All Classrooms',
    venueTa: 'பள்ளி வகுப்பறைகள்',
    category: 'Academic',
    description: 'Comprehensive mid-term evaluations for all standards. Detailed syllabus circular has been issued to students.',
    descriptionTa: 'அனைத்து வகுப்புகளுக்கும் முதல் இடைப்பருவத் தேர்வுகள் ஆரம்பமாகின்றன.',
    status: 'Upcoming'
  },
  {
    id: 'ev-3',
    title: 'Teachers’ Day Felicitation & Cultural Show',
    titleTa: 'ஆசிரியர் தின விழா & பாராட்டு அரங்கம்',
    date: '05 Sep 2026',
    time: '2:00 PM – 4:30 PM',
    venue: 'Auditorium Hall',
    venueTa: 'பள்ளி கலையரங்கம்',
    category: 'Celebration',
    description: 'Students take charge of school administration followed by a colorful cultural tribute to celebrate our teachers.',
    descriptionTa: 'ஆசிரியர்களைப் போற்றும் வகையில் மாணவர்களின் சிறப்பு கலை நிகழ்ச்சிகள் மற்றும் விளையாட்டு.',
    status: 'Upcoming'
  },
  {
    id: 'ev-4',
    title: 'Nativity Feast of Blessed Virgin Mary & School Mass',
    titleTa: 'அன்னை மரியாவின் பிறந்தநாள் பெருவிழா & சிறப்பு திருப்பலி',
    date: '08 Sep 2026',
    time: '9:00 AM – 11:00 AM',
    venue: 'Holy Chapel & Open Grounds',
    venueTa: 'சிற்றாலயம் & பள்ளி மைதானம்',
    category: 'Religious',
    description: 'Special solemn holy mass, flower offering procession by kindergarten kids, and blessing for school families.',
    descriptionTa: 'அன்னை மரியாளுக்கு மலர் அஞ்சலி மற்றும் சிறப்பு ஆசீர்வாத திருப்பலி.',
    status: 'Upcoming'
  },
  {
    id: 'ev-5',
    title: 'District Level Inter-School Science Fair 2026',
    titleTa: 'மாவட்ட அளவிலான பள்ளி அறிவியல் கண்காட்சி 2026',
    date: '18 Sep 2026',
    time: '9:30 AM – 4:00 PM',
    venue: 'Science Laboratories Wing',
    venueTa: 'அறிவியல் ஆய்வக வளாகம்',
    category: 'Academic',
    description: 'Over 60 working models on renewable energy, smart robotics, IoT in agriculture, and water purification.',
    descriptionTa: 'சூரிய சக்தி, ரோபோடிக்ஸ் மற்றும் விவசாய தொழில்நுட்பம் குறித்த அறிவியல் படைப்புகள்.',
    status: 'Upcoming'
  },
  {
    id: 'ev-6',
    title: 'Annual Sports Day & Athletic Meet 2026',
    titleTa: 'ஆண்டு விளையாட்டு விழா & தடகளப் போட்டிகள் 2026',
    date: '10 Oct 2026',
    time: '8:30 AM – 5:00 PM',
    venue: 'Main Sports Complex',
    venueTa: 'பள்ளி விளையாட்டு மைதானம்',
    category: 'Sports',
    description: 'Olympic torch relay, 100m, 400m relay, high jump, karate drill, pyramid formation, and trophy distribution.',
    descriptionTa: 'ஜோதி ஓட்டம், தடகளப் பந்தயங்கள், பிரமிடு மற்றும் பரிசளிப்பு விழா.',
    status: 'Upcoming'
  }
];

export const testimonialsList: Testimonial[] = [
  {
    id: 'test-1',
    parentName: 'Mr. K. Shanmugam (Parent of S. Kavitha)',
    parentNameTa: 'திரு. கே. சண்முகம் (எஸ். கவிதாவின் தந்தை)',
    studentClass: 'Class XII (Biology Stream)',
    studentClassTa: '12-ஆம் வகுப்பு (உயிரியல் பிரிவு)',
    quote: 'Holy Madonnas School has provided my daughter not just exceptional academic coaching for board exams, but also deep moral values. The teachers are approachable, caring, and truly dedicated.',
    quoteTa: 'ஹோலி மடோனாஸ் பள்ளி எனது மகளுக்கு சிறந்த கல்வியை மட்டுமல்லாமல், உயர்ந்த ஒழுக்கத்தையும் கற்றுக் கொடுத்துள்ளது. ஆசிரியர்களின் அர்ப்பணிப்பு போற்றத்தக்கது.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    year: '2026'
  },
  {
    id: 'test-2',
    parentName: 'Mrs. J. Mary Stella (Parent of J. Daniel)',
    parentNameTa: 'திருமதி. ஜே. மேரி ஸ்டெல்லா (டேனியலின் தாய்)',
    studentClass: 'Class VII',
    studentClassTa: '7-ஆம் வகுப்பு',
    quote: 'We moved to Lalapet two years ago and enrolled our son here. The change in his confidence, public speaking in English, and discipline is remarkable. The campus environment is so safe and positive.',
    quoteTa: 'எங்கள் மகன் இங்கு சேர்ந்த பிறகு அவனது ஆங்கிலப் பேச்சுத்திறன் மற்றும் தனித்திறமை மிகச் சிறப்பாக வளர்ந்துள்ளது. மிகவும் பாதுகாப்பான பள்ளி சூழல்.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    year: '2026'
  },
  {
    id: 'test-3',
    parentName: 'Dr. R. Balamurugan (Alumnus 2014 & Parent)',
    parentNameTa: 'மருத்துவர். ஆர். பாலமுருகன் (முன்னாள் மாணவர் & பெற்றோர்)',
    studentClass: 'Alumnus & Parent of LKG Student',
    studentClassTa: 'முன்னாள் மாணவர் & LKG மாணவரின் தந்தை',
    quote: 'As an alumnus of Holy Madonnas who is now a medical doctor, I had zero doubts where to send my own child. The foundational habits and discipline built here will last for a lifetime.',
    quoteTa: 'இப்பள்ளியில் படித்து இன்று மருத்துவராக இருக்கும் நான், என் குழந்தையையும் தயங்காமல் இங்கு சேர்த்துள்ளேன். இங்கு கற்ற ஒழுக்கம் வாழ்நாள் முழுவதும் துணை நிற்கும்.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    year: '2026'
  }
];

export const schoolBusRoutes: BusRoute[] = [
  {
    routeNo: 'Route 1 - Lalapet Local & Mayanur',
    routeName: 'Lalapet Main - Kattalai - Mayanur Ring',
    routeNameTa: 'லாலாபேட்டை - கட்டளை - மாயனூர் வழித்தடம்',
    stops: ['Lalapet Bus Stand', 'Railway Station Cross', 'Kattalai Bridge', 'Mayanur Bazaar', 'Panchayat Office', 'School Campus'],
    driverName: 'Mr. M. Rajendran',
    contactNumber: '+91 94421 78901',
    morningTime: '7:40 AM - 8:25 AM',
    eveningTime: '4:15 PM - 5:00 PM'
  },
  {
    routeNo: 'Route 2 - Kulithalai Town',
    routeName: 'Kulithalai Bus Stand - Vaigainallur - Lalapet',
    routeNameTa: 'குளித்தலை - வைகைநல்லூர் - லாலாபேட்டை',
    stops: ['Kulithalai Bus Terminus', 'Court Junction', 'Vaigainallur Arch', 'Manathattai', 'Mahadhanapuram', 'School Campus'],
    driverName: 'Mr. P. Murugesan',
    contactNumber: '+91 94435 44122',
    morningTime: '7:30 AM - 8:25 AM',
    eveningTime: '4:15 PM - 5:10 PM'
  },
  {
    routeNo: 'Route 3 - Pettavaithalai & Sirugamani',
    routeName: 'Pettavaithalai - Sirugamani - Karur Border',
    routeNameTa: 'பெட்டவாய்த்தலை - சிறுகமணி - லாலாபேட்டை',
    stops: ['Pettavaithalai Temple', 'Sugar Mill Gate', 'Sirugamani Agraharam', 'Kavalkaranpatti', 'School Campus'],
    driverName: 'Mr. K. Sundaram',
    contactNumber: '+91 98422 66311',
    morningTime: '7:35 AM - 8:25 AM',
    eveningTime: '4:15 PM - 5:05 PM'
  }
];

export const examTimetableSample: ExamScheduleItem[] = [
  {
    standard: 'Class X (Matriculation Board)',
    examName: 'First Mid-Term Exam (Aug 2026)',
    subjects: [
      { date: '24 Aug 2026', subject: 'Language - Tamil', subjectTa: 'தமிழ் மொழி', timing: '9:30 AM - 11:30 AM', portion: 'Units 1 & 2' },
      { date: '25 Aug 2026', subject: 'English', subjectTa: 'ஆங்கிலம்', timing: '9:30 AM - 11:30 AM', portion: 'Prose 1-2, Poetry 1-2' },
      { date: '26 Aug 2026', subject: 'Mathematics', subjectTa: 'கணிதம்', timing: '9:30 AM - 11:30 AM', portion: 'Relations & Functions, Algebra' },
      { date: '27 Aug 2026', subject: 'Science', subjectTa: 'அறிவியல்', timing: '9:30 AM - 11:30 AM', portion: 'Laws of Motion, Optics, Solutions' },
      { date: '28 Aug 2026', subject: 'Social Science', subjectTa: 'சமூக அறிவியல்', timing: '9:30 AM - 11:30 AM', portion: 'History 1-2, Geography 1' }
    ]
  },
  {
    standard: 'Class XII (Higher Secondary)',
    examName: 'First Mid-Term Exam (Aug 2026)',
    subjects: [
      { date: '24 Aug 2026', subject: 'Tamil / French', subjectTa: 'தமிழ் / பிரெஞ்சு', timing: '9:30 AM - 12:00 PM', portion: 'Units 1 & 2' },
      { date: '25 Aug 2026', subject: 'English', subjectTa: 'ஆங்கிலம்', timing: '9:30 AM - 12:00 PM', portion: 'Units 1, 2 & Grammar' },
      { date: '26 Aug 2026', subject: 'Physics / Accountancy', subjectTa: 'இயற்பியல் / கணக்குப்பதிவியல்', timing: '9:30 AM - 12:00 PM', portion: 'Electrostatics, Current Electricity' },
      { date: '27 Aug 2026', subject: 'Chemistry / Commerce', subjectTa: 'வேதியியல் / வணிகவியல்', timing: '9:30 AM - 12:00 PM', portion: 'Metallurgy, p-Block Elements' },
      { date: '28 Aug 2026', subject: 'Mathematics / Business Maths', subjectTa: 'கணிதம் / வணிக கணிதம்', timing: '9:30 AM - 12:00 PM', portion: 'Matrices & Complex Numbers' },
      { date: '29 Aug 2026', subject: 'Biology / Computer Science', subjectTa: 'உயிரியல் / கணினி அறிவியல்', timing: '9:30 AM - 12:00 PM', portion: 'Reproduction, Python Functions' }
    ]
  }
];

export const initialStudentVerifications: import('../types').StudentVerificationRecord[] = [
  {
    id: 'verify-001',
    admissionNumber: 'HMM-2026-001',
    studentName: 'A. Joseph Daniel',
    dob: '2019-05-14',
    standard: 'Class I',
    parentName: 'Mr. P. Antonysamy',
    registeredMobile: '+91 94432 55101',
    status: 'Verified',
    isOtpVerified: true,
    aadhaarKycStatus: 'Verified',
    aadhaarKycRefId: 'UIDAI-EK-2026-8942A',
    consentGiven: true,
    consentTimestamp: '2026-08-15 10:45 AM',
    verifiedAt: '2026-08-15 10:47 AM',
    academicYear: '2026–2027',
    notes: 'UIDAI authorized e-KYC provider authentication successful.'
  },
  {
    id: 'verify-002',
    admissionNumber: 'HMM-2026-002',
    studentName: 'S. Nithya Shree',
    dob: '2015-11-22',
    standard: 'Class VI',
    parentName: 'Mrs. R. Sangeetha',
    registeredMobile: '+91 98422 11980',
    status: 'Verified',
    isOtpVerified: true,
    aadhaarKycStatus: 'Verified',
    aadhaarKycRefId: 'UIDAI-EK-2026-3391B',
    consentGiven: true,
    consentTimestamp: '2026-08-16 02:10 PM',
    verifiedAt: '2026-08-16 02:14 PM',
    academicYear: '2026–2027',
    notes: 'OTP e-KYC authentication successful. Cryptographic reference stored.'
  },
  {
    id: 'verify-003',
    admissionNumber: 'HMM-2026-003',
    studentName: 'M. Kavin Prasad',
    dob: '2012-03-08',
    standard: 'Class IX',
    parentName: 'Mr. K. Manikandan',
    registeredMobile: '+91 97880 44321',
    status: 'Pending',
    isOtpVerified: true,
    aadhaarKycStatus: 'Pending',
    consentGiven: true,
    consentTimestamp: '2026-08-18 11:20 AM',
    academicYear: '2026–2027',
    notes: 'Mobile OTP verified. Awaiting parent e-KYC completion.'
  },
  {
    id: 'verify-004',
    admissionNumber: 'HMM-2026-004',
    studentName: 'R. Deepika',
    dob: '2010-09-17',
    standard: 'Class XI - Bio-Maths',
    parentName: 'Mr. T. Ramakrishnan',
    registeredMobile: '+91 99434 61787',
    status: 'Pending',
    isOtpVerified: false,
    aadhaarKycStatus: 'Pending',
    consentGiven: false,
    academicYear: '2026–2027',
    notes: 'Enrolled student record; pending parent verification.'
  }
];

