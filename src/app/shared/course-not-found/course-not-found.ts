import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-course-not-found',
  imports: [RouterLink, HlmButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl font-semibold">Kurz nenalezen</h1>
      <p class="text-muted-foreground">Zvolený kurz neexistuje nebo byl odstraněn.</p>
      <a hlmBtn variant="outline" class="w-fit" routerLink="/kurzy">Zpět na kurzy</a>
    </div>
  `,
})
export class CourseNotFound {}
