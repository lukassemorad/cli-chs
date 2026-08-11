import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { COURSE_CATEGORY_LABELS, CourseCategory, freeSpots } from '../../../core/course.model';
import { CoursesService } from '../../../core/courses.service';
import { EnrollmentService } from '../../../core/enrollment.service';

type CategoryFilter = CourseCategory | 'all';

@Component({
  selector: 'app-courses-page',
  imports: [
    RouterLink,
    DatePipe,
    NgIcon,
    HlmBadge,
    HlmButton,
    HlmInput,
    ...HlmCardImports,
    ...HlmSelectImports,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses-page.html',
})
export class CoursesPage {
  protected readonly enrollmentService = inject(EnrollmentService);
  private readonly coursesService = inject(CoursesService);

  protected readonly categoryLabels = COURSE_CATEGORY_LABELS;
  protected readonly categoryOptions: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'Všechny kategorie' },
    { value: 'kurz', label: 'Kurz' },
    { value: 'seminar', label: 'Seminář' },
    { value: 'zkouska', label: 'Zkouška' },
  ];

  protected readonly search = signal('');
  protected readonly categoryFilter = signal<CategoryFilter>('all');

  protected readonly categoryItemToString = (value: CategoryFilter): string =>
    this.categoryOptions.find((option) => option.value === value)?.label ?? String(value);

  protected readonly filteredCourses = computed(() => {
    const search = this.search().trim().toLowerCase();
    const category = this.categoryFilter();

    return this.coursesService.courses.filter((course) => {
      const matchesSearch = !search || course.title.toLowerCase().includes(search);
      const matchesCategory = category === 'all' || course.category === category;
      return matchesSearch && matchesCategory;
    });
  });

  protected readonly freeSpots = freeSpots;
}
