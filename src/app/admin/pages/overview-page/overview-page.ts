import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { CoursesService } from '../../../core/courses.service';

interface KpiCard {
  label: string;
  value: string;
  icon: string;
}

@Component({
  selector: 'app-overview-page',
  imports: [RouterLink, DatePipe, NgIcon, ...HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './overview-page.html',
})
export class OverviewPage {
  private readonly coursesService = inject(CoursesService);

  private readonly courses = this.coursesService.courses;

  private readonly totalCapacity = this.courses.reduce((sum, c) => sum + c.capacityTotal, 0);
  private readonly totalRegistered = this.courses.reduce((sum, c) => sum + c.capacityRegistered, 0);

  protected readonly kpiCards: KpiCard[] = [
    { label: 'Celkem kurzů', value: `${this.courses.length}`, icon: 'lucideGraduationCap' },
    { label: 'Celková kapacita', value: `${this.totalCapacity}`, icon: 'lucideUsers' },
    {
      label: 'Obsazenost',
      value: `${Math.round((this.totalRegistered / this.totalCapacity) * 100)} %`,
      icon: 'lucideTarget',
    },
    { label: 'Volná místa celkem', value: `${this.totalCapacity - this.totalRegistered}`, icon: 'lucideClock' },
  ];

  protected readonly upcomingCourses = [...this.courses]
    .sort((a, b) => a.dateStart.localeCompare(b.dateStart))
    .slice(0, 3);
}
