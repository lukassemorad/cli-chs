import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { AuthService } from '../../../core/auth.service';
import { Course } from '../../../core/course.model';
import { CoursesService } from '../../../core/courses.service';
import { Enrollment, EnrollmentService } from '../../../core/enrollment.service';

interface EnrollmentRow {
  enrollment: Enrollment;
  course: Course;
}

@Component({
  selector: 'app-my-courses-page',
  imports: [RouterLink, DatePipe, HlmBadge, HlmButton, ...HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-courses-page.html',
})
export class MyCoursesPage {
  protected readonly auth = inject(AuthService);
  private readonly coursesService = inject(CoursesService);
  private readonly enrollmentService = inject(EnrollmentService);

  protected readonly rows = computed<EnrollmentRow[]>(() => {
    const rows: EnrollmentRow[] = [];
    for (const enrollment of this.enrollmentService.enrollments()) {
      const course = this.coursesService.findById(enrollment.courseId);
      if (course) rows.push({ enrollment, course });
    }
    return rows;
  });
}
