import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { CoursesService } from '../../../core/courses.service';
import { EnrollmentService } from '../../../core/enrollment.service';
import { CourseNotFound } from '../../../shared/course-not-found/course-not-found';

@Component({
  selector: 'app-enroll-payment-page',
  imports: [HlmButton, ...HlmCardImports, CourseNotFound],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './enroll-payment-page.html',
})
export class EnrollPaymentPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly enrollmentService = inject(EnrollmentService);
  private readonly coursesService = inject(CoursesService);

  private readonly paramMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  protected readonly course = computed(() =>
    this.coursesService.findById(this.paramMap().get('id')),
  );

  protected onPay(): void {
    const course = this.course();
    if (!course) return;
    this.enrollmentService.enroll(course.id);
    this.router.navigate(['/kurzy', course.id, 'prihlaseni', 'hotovo']);
  }
}
