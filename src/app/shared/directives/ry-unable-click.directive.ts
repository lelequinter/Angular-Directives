import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[RyUnableClick]'
})
export class RyUnableClickDirective {
   @Input() RyUnableClick!: boolean;

  constructor() {}

  @HostListener('click', ['$event'])
  clickEvent(event: PointerEvent) {
    if(this.RyUnableClick){
      event.stopImmediatePropagation();
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
