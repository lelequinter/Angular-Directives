import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-leader-line',
  templateUrl: './leader-line.component.html',
  styleUrls: ['./leader-line.component.css'],
})
export class LeaderLineComponent implements OnInit, OnDestroy {
  line: any = false;

  dblClick$ = fromEvent<PointerEvent>(document, 'dblclick');

  elementsToMatch: any[] = [];

  ngOnInit(): void {
    this.dblClick$.subscribe({
      next: (res) => {
        //* Identificador para que solo se guarden solo
        //* los elementos que queremos manipular
        const identifier = (res.target as any).id.includes('box');

        //* Si el elemento es diferente al anterior
        //* y el identificador es valido se guarda el elemento
        if (this.elementsToMatch[0] != res.target && identifier) {
          this.elementsToMatch.push(res.target);

          //* Cuando la existan dos elementos dibuja la linea
          if (this.elementsToMatch.length == 2) {
            this.drawLeaderLine();
          }
        }

        //* Si la persona no hace doble click en otro elemento
        //* en los sigiuentes 10s se borra el arreglo
        // setTimeout(() => {
        //   if (this.elementsToMatch.length == 1) {
        //     this.elementsToMatch = [];
        //   }
        // }, 10000);
      },
    });
  }

  drawLeaderLine() {
    const leaderLine = (window as any).LeaderLine;
    this.line = new leaderLine(
      this.elementsToMatch[0],
      this.elementsToMatch[1],
      {
        hide: true,
        dash: {animation: true},
        startPlug: 'disc',
        endPlug: 'triangle'
      }
    );
    this.line.show('draw',{duration: 300, timing: 'ease-in-out'});

    this.elementsToMatch = [];
  }

  ngOnDestroy(): void {
    const lineas = document.getElementsByClassName('leader-line');
    Array.from(lineas).forEach( (linea: any) => {
      linea.remove();
    });
  }
}
