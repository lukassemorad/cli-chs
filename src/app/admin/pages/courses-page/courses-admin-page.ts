import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmDialog, HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTextarea } from '@spartan-ng/helm/textarea';
import {
  COURSE_CATEGORY_LABELS,
  COURSE_STATUS_LABELS,
  Course,
  CourseCategory,
  statusFor,
} from '../../../core/course.model';
import { CoursesService } from '../../../core/courses.service';

type SortKey = 'title' | 'dateStart' | 'capacity' | 'price';
type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-courses-admin-page',
  imports: [
    RouterLink,
    DatePipe,
    ReactiveFormsModule,
    HlmBadge,
    HlmButton,
    HlmInput,
    HlmLabel,
    HlmTextarea,
    ...HlmCardImports,
    ...HlmSelectImports,
    ...HlmDialogImports,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses-admin-page.html',
})
export class CoursesAdminPage {
  private readonly coursesService = inject(CoursesService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly categoryLabels = COURSE_CATEGORY_LABELS;
  protected readonly statusLabels = COURSE_STATUS_LABELS;
  protected readonly statusFor = statusFor;
  protected readonly categoryOptions: { value: CourseCategory; label: string }[] = [
    { value: 'kurz', label: 'Kurz' },
    { value: 'seminar', label: 'Seminář' },
    { value: 'zkouska', label: 'Zkouška' },
  ];

  protected readonly search = signal('');
  protected readonly sortKey = signal<SortKey>('title');
  protected readonly sortDir = signal<SortDir>('asc');

  protected readonly courses = computed(() => {
    const search = this.search().trim().toLowerCase();
    const key = this.sortKey();
    const dir = this.sortDir() === 'asc' ? 1 : -1;

    const filtered = this.coursesService.courses.filter(
      (course) =>
        !search ||
        course.title.toLowerCase().includes(search) ||
        course.location.toLowerCase().includes(search) ||
        course.instructor.toLowerCase().includes(search),
    );

    return [...filtered].sort((a, b) => {
      switch (key) {
        case 'dateStart':
          return a.dateStart.localeCompare(b.dateStart) * dir;
        case 'capacity':
          return (a.capacityRegistered - b.capacityRegistered) * dir;
        case 'price':
          return (a.price - b.price) * dir;
        default:
          return a.title.localeCompare(b.title) * dir;
      }
    });
  });

  protected onSort(key: SortKey): void {
    if (this.sortKey() === key) {
      this.sortDir.update((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
  }

  private readonly createDialog = viewChild.required(HlmDialog);

  protected readonly createForm = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control('', Validators.required),
    category: this.fb.control<CourseCategory | null>(null, Validators.required),
    description: this.fb.nonNullable.control('', Validators.required),
    dateStart: this.fb.nonNullable.control('', Validators.required),
    registrationDeadline: this.fb.nonNullable.control('', Validators.required),
    location: this.fb.nonNullable.control('', Validators.required),
    instructor: this.fb.nonNullable.control('', Validators.required),
    price: this.fb.nonNullable.control('', [Validators.required, Validators.min(0)]),
    capacityTotal: this.fb.nonNullable.control('', [Validators.required, Validators.min(1)]),
    requiresMembership: this.fb.nonNullable.control(false),
    requiresAdult: this.fb.nonNullable.control(false),
    requiresQualification: this.fb.nonNullable.control(false),
  });

  protected onCreateCourse(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const raw = this.createForm.getRawValue();

    const course: Course = {
      id: crypto.randomUUID(),
      title: raw.title,
      category: raw.category as CourseCategory,
      description: raw.description,
      dateStart: raw.dateStart,
      location: raw.location,
      instructor: raw.instructor,
      price: Number(raw.price),
      capacityTotal: Number(raw.capacityTotal),
      capacityRegistered: 0,
      registrationDeadline: raw.registrationDeadline,
      requiresMembership: raw.requiresMembership,
      requiresAdult: raw.requiresAdult,
      requiresQualification: raw.requiresQualification,
    };

    this.coursesService.addCourse(course);
    this.createDialog().close();
    this.createForm.reset({ requiresMembership: false });
    this.router.navigate(['/admin/kurzy', course.id]);
  }
}
