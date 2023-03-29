import { Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[redMaxlength]'
})
export class MaxlengtDirective {
  @Input() redMaxlength!: number;

  constructor(@Optional() private model: NgControl){}
  @HostListener('input', ['$event'])

  change($event: any) {
    let value: string | null = $event.target.value;

    let newVal: string | null;
    if (!value) {
      newVal = null;
    } else if (value.length > this.redMaxlength) {
      value = value.substring(0, this.redMaxlength);
    }
    newVal = value;
    this.model?.control?.setValue(newVal);
  }
}
