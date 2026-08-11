import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { AuthService } from '../../../core/auth.service';
import { COURSE_CATEGORY_LABELS, freeSpots } from '../../../core/course.model';
import { CoursesService } from '../../../core/courses.service';
import { EnrollmentService } from '../../../core/enrollment.service';
import { CourseNotFound } from '../../../shared/course-not-found/course-not-found';
import { CourseRequirementsCard } from '../../../shared/course-requirements-card/course-requirements-card';

@Component({
  selector: 'app-course-detail-page',
  imports: [
    RouterLink,
    DatePipe,
    NgIcon,
    HlmBadge,
    HlmButton,
    ...HlmCardImports,
    CourseNotFound,
    CourseRequirementsCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-detail-page.html',
})
export class CourseDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly coursesService = inject(CoursesService);
  private readonly enrollmentService = inject(EnrollmentService);

  private readonly paramMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  protected readonly categoryLabels = COURSE_CATEGORY_LABELS;

  protected readonly course = computed(() =>
    this.coursesService.findById(this.paramMap().get('id')),
  );

  protected readonly freeSpots = computed(() => {
    const course = this.course();
    return course ? freeSpots(course) : 0;
  });

  protected readonly isEnrolled = computed(() => {
    const course = this.course();
    return course ? this.enrollmentService.isEnrolled(course.id) : false;
  });

  protected onEnroll(): void {
    const course = this.course();
    if (!course) return;

    if (!this.auth.user()) {
      this.router.navigate(['/prihlaseni'], {
        queryParams: { redirectTo: `/kurzy/${course.id}/prihlaseni` },
      });
      return;
    }

    this.router.navigate(['/kurzy', course.id, 'prihlaseni']);
  }
}
