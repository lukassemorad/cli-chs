import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { COURSE_CATEGORY_LABELS, COURSE_STATUS_LABELS, freeSpots, statusFor } from '../../../core/course.model';
import { CoursesService } from '../../../core/courses.service';
import { EnrolledUser } from '../../../core/enrolled-user.model';
import { CourseNotFound } from '../../../shared/course-not-found/course-not-found';
import { CourseRequirementsCard } from '../../../shared/course-requirements-card/course-requirements-card';
import { AppWindow } from '../../../shared/window/app-window';

@Component({
  selector: 'app-course-admin-detail-page',
  imports: [
    RouterLink,
    DatePipe,
    HlmBadge,
    HlmButton,
    ...HlmCardImports,
    CourseNotFound,
    CourseRequirementsCard,
    AppWindow,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-admin-detail-page.html',
})
export class CourseAdminDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly coursesService = inject(CoursesService);

  private readonly paramMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  protected readonly categoryLabels = COURSE_CATEGORY_LABELS;
  protected readonly statusLabels = COURSE_STATUS_LABELS;

  protected readonly course = computed(() =>
    this.coursesService.findById(this.paramMap().get('id')),
  );

  protected readonly freeSpots = computed(() => {
    const course = this.course();
    return course ? freeSpots(course) : 0;
  });

  protected readonly status = computed(() => {
    const course = this.course();
    return course ? statusFor(course) : null;
  });

  protected readonly enrolledUsers = computed(() => {
    const course = this.course();
    return course ? this.coursesService.getEnrolledUsers(course) : [];
  });

  protected readonly selectedUser = signal<EnrolledUser | null>(null);

  protected openUserDetail(user: EnrolledUser): void {
    this.selectedUser.set(user);
  }

  protected closeUserDetail(): void {
    this.selectedUser.set(null);
  }
}
