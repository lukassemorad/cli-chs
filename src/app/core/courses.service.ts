import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { COURSES_MOCK } from './courses.mock';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  public readonly courses: readonly Course[] = COURSES_MOCK;

  public findById(id: string | null): Course | null {
    if (!id) return null;
    return this.courses.find((course) => course.id === id) ?? null;
  }
}
