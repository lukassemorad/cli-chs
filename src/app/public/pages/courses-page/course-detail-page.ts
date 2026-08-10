import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { COURSE_CATEGORY_LABELS } from './course.model';
import { COURSES_MOCK } from './courses.mock';

@Component({
  selector: 'app-course-detail-page',
  imports: [RouterLink, DatePipe, NgIcon, HlmBadge, HlmButton, ...HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-detail-page.html',
})
export class CourseDetailPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly categoryLabels = COURSE_CATEGORY_LABELS;

  protected readonly course = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return COURSES_MOCK.find((course) => course.id === id) ?? null;
  });

  protected readonly freeSpots = computed(() => {
    const course = this.course();
    return course ? course.capacityTotal - course.capacityRegistered : 0;
  });
}
