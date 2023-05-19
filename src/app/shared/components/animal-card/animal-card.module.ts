import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalCardComponent } from './animal-card.component';

@NgModule({
  declarations: [
    AnimalCardComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AnimalCardComponent
  ]
})
export class AnimalCardModule { }
