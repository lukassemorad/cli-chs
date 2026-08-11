import { effect, Injectable, signal } from '@angular/core';

export type EnrollmentStatus = 'zaplaceno';

export interface Enrollment {
  courseId: string;
  registeredAt: string;
  status: EnrollmentStatus;
}

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private readonly _enrollments = signal<Enrollment[]>(this.readInitialValue());

  public readonly enrollments = this._enrollments.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem('enrollments', JSON.stringify(this._enrollments()));
    });
  }

  public enroll(courseId: string): void {
    if (this.isEnrolled(courseId)) return;
    this._enrollments.update((list) => [
      ...list,
      { courseId, registeredAt: new Date().toISOString(), status: 'zaplaceno' },
    ]);
  }

  public isEnrolled(courseId: string): boolean {
    return this._enrollments().some((enrollment) => enrollment.courseId === courseId);
  }

  public getEnrollment(courseId: string): Enrollment | undefined {
    return this._enrollments().find((enrollment) => enrollment.courseId === courseId);
  }

  private readInitialValue(): Enrollment[] {
    const stored = localStorage.getItem('enrollments');
    if (!stored) return [];
    try {
      return JSON.parse(stored) as Enrollment[];
    } catch {
      return [];
    }
  }
}
