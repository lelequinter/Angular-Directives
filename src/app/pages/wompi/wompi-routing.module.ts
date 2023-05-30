import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WompiComponent } from './wompi.component';

const routes: Routes = [
  {
    path: '',
    component: WompiComponent
  },
  {
    path: 'transaction',
    loadChildren: () => import('../transaction/transaction.module').then(m => m.TransactionModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WompiRoutingModule { }
