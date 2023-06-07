import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderLineComponent } from './leader-line.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderLineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderLineRoutingModule { }
