import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderLineRoutingModule } from './leader-line-routing.module';
import { LeaderLineComponent } from './leader-line.component';

import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    LeaderLineComponent
  ],
  imports: [
    CommonModule,
    LeaderLineRoutingModule,
    DragDropModule
  ]
})
export class LeaderLineModule { }
