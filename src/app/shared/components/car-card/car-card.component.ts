import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {
  @Input() data!: any;
  @Input() index!: number;
  @Output() deleteItem: EventEmitter<number> = new EventEmitter<number>();

  deleteMethod(index: number){
    this.deleteItem.emit(index);
  }
}
