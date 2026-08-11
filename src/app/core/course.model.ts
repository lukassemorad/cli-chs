export type CourseCategory = 'kurz' | 'seminar' | 'zkouska';

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  description: string;
  dateStart: string;
  location: string;
  instructor: string;
  price: number;
  capacityTotal: number;
  capacityRegistered: number;
  registrationDeadline: string;
  requiresMembership: boolean;
  requiresAdult: boolean;
  requiresQualification: boolean;
}

export const COURSE_CATEGORY_LABELS: Record<CourseCategory, string> = {
  kurz: 'Kurz',
  seminar: 'Seminář',
  zkouska: 'Zkouška',
};

export function freeSpots(course: Course): number {
  return course.capacityTotal - course.capacityRegistered;
}

export type CourseStatus = 'open' | 'closed' | 'full';

export const COURSE_STATUS_LABELS: Record<CourseStatus, string> = {
  open: 'Otevřeno',
  closed: 'Uzavřeno',
  full: 'Obsazeno',
};

export function statusFor(course: Course): CourseStatus {
  if (freeSpots(course) <= 0) return 'full';
  if (new Date() > new Date(course.registrationDeadline)) return 'closed';
  return 'open';
}
