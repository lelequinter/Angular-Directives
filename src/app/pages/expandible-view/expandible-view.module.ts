import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpandibleViewRoutingModule } from './expandible-view-routing.module';
import { ExpandibleViewComponent } from './expandible-view.component';
import { ExpandibleModule } from 'src/app/shared/components/expandible/expandible.module';
import { CarCardModule } from 'src/app/shared/components/car-card/car-card.module';
import { AnimalCardModule } from 'src/app/shared/components/animal-card/animal-card.module';

@NgModule({
  declarations: [
    ExpandibleViewComponent
  ],
  imports: [
    CommonModule,
    ExpandibleViewRoutingModule,
    ExpandibleModule,
    CarCardModule,
    AnimalCardModule
  ],
})
export class ExpandibleViewModule { }
