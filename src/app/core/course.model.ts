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
  minAge: number;
  requiredQualification: string | null;
}

export const COURSE_CATEGORY_LABELS: Record<CourseCategory, string> = {
  kurz: 'Kurz',
  seminar: 'Seminář',
  zkouska: 'Zkouška',
};

export function freeSpots(course: Course): number {
  return course.capacityTotal - course.capacityRegistered;
}
