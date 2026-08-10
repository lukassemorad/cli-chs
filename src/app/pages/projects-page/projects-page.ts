import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-projects-page',
  imports: [...HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects-page.html',
})
export class ProjectsPage {}
