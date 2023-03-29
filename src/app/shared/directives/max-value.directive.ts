import { Directive, HostListener, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

interface IValues {
  max: number;
  min: number;
}

@Directive({
  selector: '[redMinMaxValues]'
})
export class MaxValueDirective {
  @Input() redMinMaxValues!: IValues;

  constructor(@Optional() private model: NgControl){}
  @HostListener('input', ['$event'])

  change($event: any) {
    let value: number | null = $event.target.value;

    let newVal: number | null;
    if (!value) {
      newVal = null;
    } else if (value > this.redMinMaxValues.max) {
      value = this.redMinMaxValues.max;
    }else if (value < this.redMinMaxValues.min){
      value = this.redMinMaxValues.min
    }

    newVal = value;
    this.model?.control?.setValue(String(newVal));
  }

}
