import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormDemo } from '../../forms/reactive-form-demo/reactive-form-demo';
import { SignalFormDemo } from '../../forms/signal-form-demo/signal-form-demo';

@Component({
  selector: 'app-forms-page',
  imports: [SignalFormDemo, ReactiveFormDemo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './forms-page.html',
})
export class FormsPage {}
