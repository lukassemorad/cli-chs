import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { FormField, form, maxLength, minLength, pattern, required, submit } from '@angular/forms/signals';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmDateTimePicker } from '@spartan-ng/helm/date-time-picker';
import { HlmDialog, HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTextarea } from '@spartan-ng/helm/textarea';
import { DEMO_CATEGORIES, type DemoCategory } from '../demo-categories';

interface DemoFormModel {
  category: DemoCategory | null;
  name: string;
  password: string;
  message: string;
  scheduledAt: Date | null;
}

@Component({
  selector: 'app-signal-form-demo',
  imports: [
    HlmButton,
    HlmInput,
    HlmTextarea,
    HlmLabel,
    HlmDateTimePicker,
    FormField,
    ...HlmSelectImports,
    ...HlmDialogImports,
    ...HlmCardImports,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signal-form-demo.html',
})
export class SignalFormDemo {
  protected readonly categories = DEMO_CATEGORIES;

  private readonly model = signal<DemoFormModel>({
    category: null,
    name: '',
    password: '',
    message: '',
    scheduledAt: null,
  });

  protected readonly demoForm = form(this.model, (path) => {
    required(path.category, { message: 'Vyber kategorii' });
    required(path.name, { message: 'Zadej jméno' });
    minLength(path.name, 2, { message: 'Jméno musí mít alespoň 2 znaky' });
    required(path.password, { message: 'Zadej heslo' });
    minLength(path.password, 8, { message: 'Heslo musí mít alespoň 8 znaků' });
    pattern(path.password, /\d/, { message: 'Heslo musí obsahovat alespoň jednu číslici' });
    required(path.message, { message: 'Zadej zprávu' });
    maxLength(path.message, 500, { message: 'Zpráva může mít nejvýše 500 znaků' });
    required(path.scheduledAt, { message: 'Vyber datum a čas' });
  });

  private readonly dialog = viewChild.required(HlmDialog);
  protected readonly submittedJson = signal('');

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const success = await submit(this.demoForm, async () => {
      this.submittedJson.set(JSON.stringify(this.model(), null, 2));
      return undefined;
    });

    if (success) {
      this.dialog().open();
    }
  }
}
