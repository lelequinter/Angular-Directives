import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WompiRoutingModule } from './wompi-routing.module';
import { WompiComponent } from './wompi.component';


@NgModule({
  declarations: [
    WompiComponent
  ],
  imports: [
    CommonModule,
    WompiRoutingModule
  ]
})
export class WompiModule { }
