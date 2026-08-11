import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-settings-page',
  imports: [...HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings-page.html',
})
export class SettingsPage {}
