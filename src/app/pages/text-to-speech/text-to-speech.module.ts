import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextToSpeechRoutingModule } from './text-to-speech-routing.module';
import { TextToSpeechComponent } from './text-to-speech.component';


@NgModule({
  declarations: [
    TextToSpeechComponent
  ],
  imports: [
    CommonModule,
    TextToSpeechRoutingModule
  ],
  exports: [
    TextToSpeechComponent
  ],
})
export class TextToSpeechModule { }
