import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, signal, viewChild } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendarClock } from '@ng-icons/lucide';
import { BrnPopover } from '@spartan-ng/brain/popover';
import { type BrnOverlayState } from '@spartan-ng/brain/overlay';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCalendar } from '@spartan-ng/helm/calendar';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { HlmTimeField } from './hlm-time-field';

const HLM_DATE_TIME_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HlmDateTimePicker),
  multi: true,
};

@Component({
  selector: 'hlm-date-time-picker',
  imports: [HlmPopoverImports, HlmCalendar, HlmButtonImports, HlmTimeField, NgIcon],
  providers: [provideIcons({ lucideCalendarClock }), HLM_DATE_TIME_PICKER_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-block', 'data-slot': 'date-time-picker' },
  template: `
    <hlm-popover [state]="_popoverState()" (stateChanged)="_onStateChange($event)">
      <button
        type="button"
        hlmBtn
        variant="outline"
        hlmPopoverTrigger
        [hlmPopoverTriggerFor]="popover()"
        class="w-64 justify-between font-normal"
      >
        <span class="truncate">{{ formattedValue() ?? placeholder() }}</span>
        <ng-icon name="lucideCalendarClock" class="text-muted-foreground" />
      </button>

      <hlm-popover-content class="w-auto p-0" *hlmPopoverPortal>
        <hlm-calendar
          class="border-0"
          [date]="value()"
          [defaultFocusedDate]="value()"
          [min]="minDate()"
          [max]="maxDate()"
          (dateChange)="_onDateChange($event)"
        />

        <div class="flex items-center justify-center gap-3 border-t border-border p-3">
          <hlm-time-field [value]="_hours()" (valueChange)="_onHoursChange($event)" [min]="0" [max]="23" label="hodiny" />
          <span class="pb-5 text-lg font-medium text-muted-foreground">:</span>
          <hlm-time-field [value]="_minutes()" (valueChange)="_onMinutesChange($event)" [min]="0" [max]="59" label="minuty" />
        </div>
      </hlm-popover-content>
    </hlm-popover>
  `,
})
export class HlmDateTimePicker implements ControlValueAccessor {
  public readonly popover = viewChild.required(BrnPopover);

  private _onChange?: (value: Date | null) => void;
  private _onTouched?: () => void;

  public readonly value = model<Date | undefined>(undefined);
  public readonly placeholder = input('Vyber datum a čas');
  public readonly minDate = input<Date>();
  public readonly maxDate = input<Date>();

  protected readonly _popoverState = signal<BrnOverlayState | null>(null);

  protected readonly _hours = computed(() => this.value()?.getHours() ?? 12);
  protected readonly _minutes = computed(() => this.value()?.getMinutes() ?? 0);

  protected readonly formattedValue = computed(() => {
    const date = this.value();
    if (!date) return undefined;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.toLocaleDateString('cs-CZ')} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  });

  protected _onDateChange(date: Date | undefined): void {
    this.applyChange(date, this._hours(), this._minutes());
  }

  protected _onHoursChange(hours: number): void {
    this.applyChange(this.value() ?? new Date(), hours, this._minutes());
  }

  protected _onMinutesChange(minutes: number): void {
    this.applyChange(this.value() ?? new Date(), this._hours(), minutes);
  }

  protected _onStateChange(state: BrnOverlayState): void {
    this._popoverState.set(state);
    if (state === 'closed') this._onTouched?.();
  }

  public writeValue(value: Date | null): void {
    this.value.set(value ?? undefined);
  }

  public registerOnChange(fn: (value: Date | null) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  private applyChange(date: Date | undefined, hours: number, minutes: number): void {
    if (!date) {
      this.value.set(undefined);
      this._onChange?.(null);
      return;
    }
    const merged = new Date(date);
    merged.setHours(hours, minutes, 0, 0);
    this.value.set(merged);
    this._onChange?.(merged);
  }
}
