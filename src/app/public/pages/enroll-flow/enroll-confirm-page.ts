import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { CoursesService } from '../../../core/courses.service';
import { CourseNotFound } from '../../../shared/course-not-found/course-not-found';
import { CourseRequirementsCard } from '../../../shared/course-requirements-card/course-requirements-card';

@Component({
  selector: 'app-enroll-confirm-page',
  imports: [RouterLink, HlmButton, CourseNotFound, CourseRequirementsCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './enroll-confirm-page.html',
})
export class EnrollConfirmPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly coursesService = inject(CoursesService);

  private readonly paramMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  protected readonly course = computed(() =>
    this.coursesService.findById(this.paramMap().get('id')),
  );

  protected readonly accepted = signal(false);

  protected onContinue(): void {
    const course = this.course();
    if (!course || !this.accepted()) return;
    this.router.navigate(['/kurzy', course.id, 'prihlaseni', 'platba']);
  }
}
