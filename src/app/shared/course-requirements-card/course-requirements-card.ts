import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { getCourseRules } from '../../core/course-rules';
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
          @for (rule of rules(); track rule.key) {
            <li class="flex items-center gap-2">
              {{ rule.label }}
              <span hlmBadge [variant]="rule.passed ? 'default' : 'secondary'">{{ rule.detail }}</span>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
})
export class CourseRequirementsCard {
  public readonly course = input.required<Course>();

  protected readonly rules = computed(() => getCourseRules(this.course()));
}
