export type Language = 'en' | 'ta';

export type GalleryCategory =
  | 'all'
  | 'campus'
  | 'celebrations'
  | 'independence_day'
  | 'school_mass'
  | 'sports_day'
  | 'cultural_events'
  | 'science_exhibition'
  | 'prize_distribution'
  | 'students'
  | 'teachers';

export interface GalleryPhoto {
  id: string;
  title: string;
  titleTa: string;
  category: GalleryCategory;
  imageUrl: string;
  caption?: string;
  captionTa?: string;
  date: string;
}

export interface VideoItem {
  id: string;
  title: string;
  titleTa: string;
  category: string;
  categoryTa: string;
  youtubeId: string;
  duration: string;
  date: string;
  views?: string;
  isFeatured?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  titleTa: string;
  category: 'admissions' | 'events' | 'academics' | 'circular';
  date: string;
  description: string;
  descriptionTa: string;
  isUrgent?: boolean;
  fileUrl?: string;
  fileName?: string;
}

export interface AdmissionApplication {
  id: string;
  refNumber: string;
  studentName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  standard: string;
  parentName: string;
  relationship: 'Father' | 'Mother' | 'Guardian';
  mobileNumber: string;
  email: string;
  address: string;
  previousSchool?: string;
  bloodGroup?: string;
  specialNeeds?: string;
  photoUrl?: string;
  hasDocuments?: boolean;
  submittedAt: string;
  status: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Admitted' | 'Rejected';
  notes?: string;
}

export interface Facility {
  id: string;
  title: string;
  titleTa: string;
  iconName: string;
  description: string;
  descriptionTa: string;
  image: string;
  features: string[];
  featuresTa: string[];
}

export interface Teacher {
  id: string;
  name: string;
  nameTa: string;
  designation: string;
  designationTa: string;
  subject: string;
  subjectTa: string;
  qualification: string;
  department: 'leadership' | 'primary' | 'science' | 'maths' | 'languages' | 'arts_sports';
  experience: string;
  photo: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  titleTa: string;
  date: string;
  time: string;
  venue: string;
  venueTa: string;
  category: 'Celebration' | 'Academic' | 'Sports' | 'Religious' | 'Meeting';
  description: string;
  descriptionTa: string;
  status: 'Upcoming' | 'Completed' | 'Ongoing';
  highlightPhoto?: string;
}

export interface Testimonial {
  id: string;
  parentName: string;
  parentNameTa: string;
  studentClass: string;
  studentClassTa: string;
  quote: string;
  quoteTa: string;
  rating: number;
  avatar: string;
  year: string;
}

export interface BusRoute {
  routeNo: string;
  routeName: string;
  routeNameTa: string;
  stops: string[];
  driverName: string;
  contactNumber: string;
  morningTime: string;
  eveningTime: string;
}

export interface ExamScheduleItem {
  standard: string;
  examName: string;
  subjects: {
    date: string;
    subject: string;
    subjectTa: string;
    timing: string;
    portion: string;
  }[];
}
