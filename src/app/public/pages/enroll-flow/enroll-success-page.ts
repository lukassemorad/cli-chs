import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { CoursesService } from '../../../core/courses.service';
import { CourseNotFound } from '../../../shared/course-not-found/course-not-found';

@Component({
  selector: 'app-enroll-success-page',
  imports: [RouterLink, DatePipe, NgIcon, HlmButton, ...HlmCardImports, CourseNotFound],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './enroll-success-page.html',
})
export class EnrollSuccessPage {
  private readonly route = inject(ActivatedRoute);
  private readonly coursesService = inject(CoursesService);

  private readonly paramMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  protected readonly course = computed(() =>
    this.coursesService.findById(this.paramMap().get('id')),
  );
}
