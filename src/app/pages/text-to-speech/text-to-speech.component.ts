import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css'],
})
export class TextToSpeechComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const s = this.getVoices();
    s.then((voices: any) => {
      this.voices = voices;
    }) ;
  }

  //* Inicializacion del speechSynthesis
  synth = window.speechSynthesis;

  text: string =
    'Fired when the utterance has begun to be spoken. Also available via the onstart property.';

  textSplitted: string[] = this.text.split(' ');

  voices: any[] = [];

  getVoices() {
    return new Promise(function (resolve, reject) {
      let synth = window.speechSynthesis;
      let id: any;

      id = setInterval(() => {
        if (synth.getVoices().length !== 0) {
          resolve(synth.getVoices());
          clearInterval(id);
        }
      }, 10);
    });
  }

  speechText(text: string) {
    const utterThis = new SpeechSynthesisUtterance(text);

    const voiceSelect: HTMLSelectElement  | null = document.querySelector("select");
    let voiceindex: number = Number(voiceSelect?.value || 3);

    utterThis.voice = this.voices[voiceindex];

    this.synth.speak(utterThis);
  }
}
