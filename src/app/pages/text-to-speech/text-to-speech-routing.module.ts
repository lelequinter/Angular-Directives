import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextToSpeechComponent } from './text-to-speech.component';

const routes: Routes = [
  {
    path: '',
    component: TextToSpeechComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextToSpeechRoutingModule { }
