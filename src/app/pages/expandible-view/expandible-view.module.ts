import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpandibleViewRoutingModule } from './expandible-view-routing.module';
import { ExpandibleViewComponent } from './expandible-view.component';



@NgModule({
  declarations: [
    ExpandibleViewComponent
  ],
  imports: [
    CommonModule,
    ExpandibleViewRoutingModule
  ],
})
export class ExpandibleViewModule { }
