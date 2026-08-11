import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { Course } from '../../core/course.model';

@Component({
  selector: 'app-course-requirements-card',
  imports: [HlmBadge, ...HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Podmínky přihlášení</h3>
      </div>
      <div hlmCardContent>
        <ul class="flex flex-col gap-2 text-sm">
          <li class="flex items-center gap-2">
            Členství / registrace
            <span hlmBadge [variant]="course().requiresMembership ? 'default' : 'secondary'">
              {{ course().requiresMembership ? 'Vyžadováno' : 'Nevyžadováno' }}
            </span>
          </li>
          <li class="flex items-center gap-2">
            Minimální věk
            <span hlmBadge variant="secondary">{{ course().minAge }}+</span>
          </li>
          <li class="flex items-center gap-2">
            Požadovaná kvalifikace
            <span hlmBadge [variant]="course().requiredQualification ? 'default' : 'secondary'">
              {{ course().requiredQualification ?? 'Není vyžadována' }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class CourseRequirementsCard {
  public readonly course = input.required<Course>();
}
