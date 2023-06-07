import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderLineRoutingModule } from './leader-line-routing.module';
import { LeaderLineComponent } from './leader-line.component';


@NgModule({
  declarations: [
    LeaderLineComponent
  ],
  imports: [
    CommonModule,
    LeaderLineRoutingModule
  ]
})
export class LeaderLineModule { }
