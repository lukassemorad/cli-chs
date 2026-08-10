import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmDateTimePickerImports } from '@spartan-ng/helm/date-time-picker';

@Component({
  selector: 'app-settings-page',
  imports: [...HlmCardImports, ...HlmDateTimePickerImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings-page.html',
})
export class SettingsPage {
  protected readonly reminderAt = signal<Date | undefined>(undefined);
}
