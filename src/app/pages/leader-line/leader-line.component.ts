import { Component, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-leader-line',
  templateUrl: './leader-line.component.html',
  styleUrls: ['./leader-line.component.css'],
})
export class LeaderLineComponent implements OnDestroy {
  //* Arreglo para guardar el espacio en memoria
  //* de las lineas creadas
  leaderLineArray: any[] = [];

  //* Arreglo para almacenar los dos elementos a unir
  elementsToMatch: any[] = [];

  //* Flag para saber si estoy en modo drag
  drag: boolean = false;

  @HostListener('mousedown')
  onmousedown() {
    //* Entrando en modo drag
    this.drag = true;
  }

  @HostListener('mouseup')
  onmouseup() {
    //* Saliendo de modo drag
    this.drag = false;
  }

  @HostListener('mousemove')
  onmousemove() {
    //* Si me estoy moviendo y drag == true, es que estoy arrastrando algo
    //* Tambien valido que existan lineas para repintar
    if (this.drag && Boolean(this.leaderLineArray.length)) {
      this.leaderLineArray.forEach((line) => {
        line?.position();
      });
    }
  }

  @HostListener('dblclick', ['$event'])
  ondblclick(event: any) {
    //* Si la persona no hace doble click en otro elemento
    //* en los sigiuentes 10s se borra el arreglo
    //TODO: Hay que hcaer bien esta vaina
    // if (this.elementsToMatch.length == 0) {
    //   setTimeout(() => {
    //     if (this.elementsToMatch.length == 1){
    //       this.elementsToMatch = [];
    //       console.log('timeout');
    //     }
    //     }, 5000);
    // }

    //* Identificador para que solo se guarden solo
    //* los elementos que queremos manipular
    const identifier = (event.target as any).id.includes('box');

    //* Si el elemento es diferente al anterior
    //* y el identificador es valido se guarda el elemento
    if (this.elementsToMatch[0] != event.target && identifier) {
      this.elementsToMatch.push(event.target);

      //* Cuando la existan dos elementos dibuja la linea
      if (this.elementsToMatch.length == 2) {
        this.drawLeaderLine();
      }
    }
  }

  drawLeaderLine() {
    //* Obteniendo la librería
    const leaderLine = (window as any).LeaderLine;

    //* Creando la linea entre los nos elementos seleccionados
    const line = new leaderLine(
      this.elementsToMatch[0],
      this.elementsToMatch[1],
      {
        hide: true,
        dash: { animation: true },
        startPlug: 'disc',
        endPlug: 'triangle',
      }
    );

    //* Guardando el espacio en memoria de cada linea creada para
    //* luego acceder a ellas y llamar los metodos de cada una
    this.leaderLineArray.push(line);

    //* Metodo para dibujar la linea con aminacion de dibujo
    line.show('draw', { duration: 300, timing: 'ease-in-out' });

    //* Limpiando el array de elementos a unir
    this.elementsToMatch = [];
  }

  ngOnDestroy(): void {
    //* Removiendo las lineas cuando cambie de vista
    this.leaderLineArray.forEach((linea: any) => {
      linea.remove();
    });
  }
}
