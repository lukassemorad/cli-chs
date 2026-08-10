import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmDateTimePicker } from '@spartan-ng/helm/date-time-picker';
import { HlmDialog, HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTextarea } from '@spartan-ng/helm/textarea';
import { DEMO_CATEGORIES, type DemoCategory } from '../demo-categories';

@Component({
  selector: 'app-reactive-form-demo',
  imports: [
    ReactiveFormsModule,
    HlmButton,
    HlmInput,
    HlmTextarea,
    HlmLabel,
    HlmDateTimePicker,
    ...HlmSelectImports,
    ...HlmDialogImports,
    ...HlmCardImports,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reactive-form-demo.html',
})
export class ReactiveFormDemo {
  protected readonly categories = DEMO_CATEGORIES;

  private readonly fb = inject(FormBuilder);

  protected readonly demoForm = this.fb.group({
    category: this.fb.control<DemoCategory | null>(null, Validators.required),
    name: this.fb.control('', [Validators.required, Validators.minLength(2)]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/\d/),
    ]),
    message: this.fb.control('', [Validators.required, Validators.maxLength(500)]),
    scheduledAt: this.fb.control<Date | undefined>(undefined, Validators.required),
  });

  private readonly dialog = viewChild.required(HlmDialog);
  protected readonly submittedJson = signal('');

  protected onSubmit(): void {
    if (this.demoForm.invalid) {
      this.demoForm.markAllAsTouched();
      return;
    }

    this.submittedJson.set(JSON.stringify(this.demoForm.getRawValue(), null, 2));
    this.dialog().open();
  }
}
