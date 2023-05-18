import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpandibleViewRoutingModule } from './expandible-view-routing.module';
import { ExpandibleViewComponent } from './expandible-view.component';
import { ExpandibleModule } from 'src/app/shared/components/expandible/expandible.module';



@NgModule({
  declarations: [
    ExpandibleViewComponent
  ],
  imports: [
    CommonModule,
    ExpandibleViewRoutingModule,
    ExpandibleModule
  ],
})
export class ExpandibleViewModule { }
