import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, OnInit, input, output, signal, viewChild } from '@angular/core';
import { CdkDrag, CdkDragEnd, CdkDragHandle } from '@angular/cdk/drag-drop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { ResizeDirection, WindowResizeEvent, WindowResizeHandle } from './window-resize-handle';

interface ResizeHandleSpec {
  direction: ResizeDirection;
  class: string;
}

interface WindowGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
}

const RESIZE_HANDLES: ResizeHandleSpec[] = [
  { direction: 'n', class: 'top-[-3px] left-2 right-2 h-[6px] cursor-ns-resize' },
  { direction: 's', class: 'bottom-[-3px] left-2 right-2 h-[6px] cursor-ns-resize' },
  { direction: 'e', class: 'right-[-3px] top-2 bottom-2 w-[6px] cursor-ew-resize' },
  { direction: 'w', class: 'left-[-3px] top-2 bottom-2 w-[6px] cursor-ew-resize' },
  { direction: 'ne', class: 'top-[-4px] right-[-4px] h-[10px] w-[10px] cursor-nesw-resize' },
  { direction: 'nw', class: 'top-[-4px] left-[-4px] h-[10px] w-[10px] cursor-nwse-resize' },
  { direction: 'se', class: 'bottom-[-4px] right-[-4px] h-[10px] w-[10px] cursor-nwse-resize' },
  { direction: 'sw', class: 'bottom-[-4px] left-[-4px] h-[10px] w-[10px] cursor-nesw-resize' },
];

@Component({
  selector: 'app-window',
  imports: [CdkDrag, CdkDragHandle, WindowResizeHandle, HlmButton, NgIcon],
  providers: [provideIcons({ lucideX })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      #panel
      cdkDrag
      cdkDragBoundary="body"
      (cdkDragEnded)="onDragEnded($event)"
      tabindex="-1"
      role="dialog"
      [attr.aria-label]="title()"
      (keydown.escape)="closed.emit()"
      class="fixed z-50 flex flex-col overflow-visible rounded-xl bg-popover text-popover-foreground shadow-2xl ring-1 ring-foreground/10 outline-none"
      [style.left.px]="x()"
      [style.top.px]="y()"
      [style.width.px]="width()"
      [style.height.px]="height()"
    >
      <div
        cdkDragHandle
        class="flex cursor-move select-none items-center justify-between gap-2 rounded-t-xl border-b border-border bg-muted/40 px-3 py-2"
      >
        <span class="truncate text-sm font-medium">{{ title() }}</span>
        <button hlmBtn variant="ghost" size="icon-sm" (click)="closed.emit()">
          <span class="sr-only">Zavřít</span>
          <ng-icon name="lucideX" />
        </button>
      </div>

      <div class="flex-1 overflow-auto p-4">
        <ng-content />
      </div>

      @for (handle of resizeHandles; track handle.direction) {
        <div
          class="absolute"
          [class]="handle.class"
          [appWindowResizeHandle]="handle.direction"
          (resize)="onResize($event)"
        ></div>
      }
    </div>
  `,
})
export class AppWindow implements OnInit {
  public readonly title = input.required<string>();
  public readonly minWidth = input(320);
  public readonly minHeight = input(200);
  /** Když je zadaný, pozice a velikost okna se ukládá do localStorage a obnoví se při dalším otevření. */
  public readonly storageKey = input<string>();
  public readonly closed = output<void>();

  protected readonly resizeHandles = RESIZE_HANDLES;

  protected readonly x = signal(120);
  protected readonly y = signal(100);
  protected readonly width = signal(420);
  protected readonly height = signal(320);

  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  constructor() {
    afterNextRender(() => this.panel()?.nativeElement.focus());
  }

  ngOnInit(): void {
    const key = this.storageKey();
    const raw = key ? localStorage.getItem(key) : null;
    if (!raw) {
      return;
    }

    try {
      const geometry = JSON.parse(raw) as Partial<WindowGeometry>;
      if (typeof geometry.x === 'number') this.x.set(geometry.x);
      if (typeof geometry.y === 'number') this.y.set(geometry.y);
      if (typeof geometry.width === 'number') this.width.set(Math.max(this.minWidth(), geometry.width));
      if (typeof geometry.height === 'number') this.height.set(Math.max(this.minHeight(), geometry.height));
    } catch {
      // poškozená data ve storage - ignorovat, použije se výchozí pozice/velikost
    }
  }

  protected onDragEnded(event: CdkDragEnd): void {
    const { x: dx, y: dy } = event.source.getFreeDragPosition();
    this.x.update((v) => v + dx);
    this.y.update((v) => v + dy);
    event.source.reset();
    this.persistGeometry();
  }

  protected onResize(event: WindowResizeEvent): void {
    const { direction, dx, dy } = event;

    if (direction.includes('e')) {
      this.width.update((w) => Math.max(this.minWidth(), w + dx));
    }
    if (direction.includes('w')) {
      const current = this.width();
      const next = Math.max(this.minWidth(), current - dx);
      this.width.set(next);
      this.x.update((x) => x + (current - next));
    }
    if (direction.includes('s')) {
      this.height.update((h) => Math.max(this.minHeight(), h + dy));
    }
    if (direction.includes('n')) {
      const current = this.height();
      const next = Math.max(this.minHeight(), current - dy);
      this.height.set(next);
      this.y.update((y) => y + (current - next));
    }

    this.persistGeometry();
  }

  private persistGeometry(): void {
    const key = this.storageKey();
    if (!key) {
      return;
    }

    const geometry: WindowGeometry = { x: this.x(), y: this.y(), width: this.width(), height: this.height() };
    localStorage.setItem(key, JSON.stringify(geometry));
  }
}
