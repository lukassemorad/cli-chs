import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { AuthService } from '../../../core/auth.service';
import { evaluateCourseRules } from '../../../core/course-rules';
import { CoursesService } from '../../../core/courses.service';
import { CourseNotFound } from '../../../shared/course-not-found/course-not-found';

@Component({
  selector: 'app-enroll-confirm-page',
  imports: [RouterLink, HlmButton, CourseNotFound, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './enroll-confirm-page.html',
})
export class EnrollConfirmPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly coursesService = inject(CoursesService);

  private readonly paramMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  protected readonly course = computed(() =>
    this.coursesService.findById(this.paramMap().get('id')),
  );

  protected readonly results = computed(() => {
    const course = this.course();
    const user = this.auth.user();
    return course && user ? evaluateCourseRules(course, user) : [];
  });

  protected readonly allPassed = computed(
    () => this.results().length > 0 && this.results().every((rule) => rule.passed),
  );

  protected onContinue(): void {
    const course = this.course();
    if (!course || !this.allPassed()) return;
    this.router.navigate(['/kurzy', course.id, 'prihlaseni', 'platba']);
  }
}
