import { Directive, HostListener, input, output } from '@angular/core';

export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export interface WindowResizeEvent {
  direction: ResizeDirection;
  dx: number;
  dy: number;
}

@Directive({
  selector: '[appWindowResizeHandle]',
})
export class WindowResizeHandle {
  public readonly direction = input.required<ResizeDirection>({ alias: 'appWindowResizeHandle' });
  public readonly resize = output<WindowResizeEvent>();

  private dragging = false;
  private lastX = 0;
  private lastY = 0;

  @HostListener('pointerdown', ['$event'])
  protected onPointerDown(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragging = true;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  @HostListener('pointermove', ['$event'])
  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    const dx = event.clientX - this.lastX;
    const dy = event.clientY - this.lastY;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    this.resize.emit({ direction: this.direction(), dx, dy });
  }

  @HostListener('pointerup', ['$event'])
  @HostListener('pointercancel', ['$event'])
  protected onPointerUp(event: PointerEvent): void {
    this.dragging = false;
    (event.target as HTMLElement).releasePointerCapture(event.pointerId);
  }
}
