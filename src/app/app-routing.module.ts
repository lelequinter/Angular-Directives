import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home',
    component: HomeComponent,
  },
  {
    path: 'expandible-view',
   loadChildren: () => import('./pages/expandible-view/expandible-view.module').then(m=> m.ExpandibleViewModule)
  },
  {
    path: 'text-to-speech',
   loadChildren: () => import('./pages/text-to-speech/text-to-speech.module').then(m=> m.TextToSpeechModule)
  },
  {
    path: 'wompi',
   loadChildren: () => import('./pages/wompi/wompi.module').then(m=> m.WompiModule)
  },
  {
    path: 'aim-lab',
   loadChildren: () => import('./pages/learn/learn.module').then(m=> m.LearnModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
