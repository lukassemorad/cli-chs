import { Injectable, signal } from '@angular/core';
import { Course } from './course.model';
import { COURSES_MOCK } from './courses.mock';
import { EnrolledUser } from './enrolled-user.model';
import { getEnrolledUsersForCourse } from './enrolled-users.mock';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private readonly _courses = signal<Course[]>(COURSES_MOCK);

  public get courses(): readonly Course[] {
    return this._courses();
  }

  public findById(id: string | null): Course | null {
    if (!id) return null;
    return this.courses.find((course) => course.id === id) ?? null;
  }

  public getEnrolledUsers(course: Course): EnrolledUser[] {
    return getEnrolledUsersForCourse(course);
  }

  public addCourse(course: Course): void {
    this._courses.update((courses) => [...courses, course]);
  }
}
