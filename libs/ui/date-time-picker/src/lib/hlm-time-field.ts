import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideChevronUp } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';

@Component({
  selector: 'hlm-time-field',
  imports: [HlmButtonImports, HlmInput, NgIcon],
  providers: [provideIcons({ lucideChevronUp, lucideChevronDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col items-center gap-1', 'data-slot': 'time-field' },
  template: `
    <button type="button" hlmBtn variant="ghost" size="icon-sm" (click)="step(1)">
      <ng-icon name="lucideChevronUp" />
      <span class="sr-only">Zvýšit {{ label() }}</span>
    </button>

    <input
      hlmInput
      type="number"
      inputmode="numeric"
      class="h-9 w-14 text-center tabular-nums [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      [attr.aria-label]="label()"
      [min]="min()"
      [max]="max()"
      [value]="paddedValue()"
      (change)="onInput($event)"
    />

    <button type="button" hlmBtn variant="ghost" size="icon-sm" (click)="step(-1)">
      <ng-icon name="lucideChevronDown" />
      <span class="sr-only">Snížit {{ label() }}</span>
    </button>
  `,
})
export class HlmTimeField {
  public readonly value = model.required<number>();
  public readonly min = input(0);
  public readonly max = input(59);
  public readonly label = input('');

  protected readonly paddedValue = computed(() => this.value().toString().padStart(2, '0'));

  protected step(delta: number): void {
    this.value.set(this.wrap(this.value() + delta));
  }

  protected onInput(event: Event): void {
    const raw = Number((event.target as HTMLInputElement).value);
    if (Number.isNaN(raw)) return;
    this.value.set(this.wrap(raw));
  }

  private wrap(raw: number): number {
    const span = this.max() - this.min() + 1;
    return this.min() + (((raw - this.min()) % span) + span) % span;
  }
}
