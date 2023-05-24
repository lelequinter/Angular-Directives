import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css']
})
export class AnimalCardComponent {
  @Input() data!: any;
  @Input() index!: number;
  @Output() deleteItem: EventEmitter<number> = new EventEmitter<number>();

  deleteMethod(index: number){
    this.deleteItem.emit(index);
  }

}
