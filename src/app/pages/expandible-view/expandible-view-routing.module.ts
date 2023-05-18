import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpandibleViewComponent } from './expandible-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExpandibleViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpandibleViewRoutingModule { }
