import { Component, OnDestroy, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { IElements } from './models/line-elements-model';

@Component({
  selector: 'app-leader-line',
  templateUrl: './leader-line.component.html',
  styleUrls: ['./leader-line.component.css'],
})
export class LeaderLineComponent implements AfterViewInit ,OnDestroy {
  //* Arreglo de elementos en pantalla
  elementsArray: IElements[] = [
    // {
    //   id: 1,
    //   value: 'lele',
    //   coords: {x: 150, y: 50},
    //   properties: {
    //     shape: 'circle',
    //     color: 'blue',
    //     role: 'player'
    //   },
    // }
  ];

  //* Arreglo para guardar el espacio en memoria
  //* de las lineas creadas
  leaderLineArray: any[] = [];

  //* Arreglo para almacenar los dos elementos a unir
  elementsToMatch: any[] = [];

  //* Flag para saber si estoy en modo drag
  drag: boolean = false;

  //* tiempo para el timeout de reset en segundos
  timeoutTimeInSeconds = 10000;

  //* Referencia global del setTimeout
  //* Si la persona no hace doble click en otro elemento
  //* dentro del tiempo de timeoutTimeInSeconds se borra el arreglo
  selectSecondElementTimeout = setTimeout(() => {
    this.elementsToMatch = [];
  }, this.timeoutTimeInSeconds);

  constructor( private changeDetector: ChangeDetectorRef ){}

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
      this.leaderLineArray.forEach((linea) => {
        linea.line?.position();
      });
    }
  }

  @HostListener('dblclick', ['$event'])
  ondblclick(event: any) {
    //* Si la persona no hace doble click en otro elemento
    //* en los sigiuentes 10s se borra el arreglo
    if (this.elementsToMatch.length == 0) {
    this.selectSecondElementTimeout;
    }

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
        //* Si la persona ha seleccionado un segundo arreglo se pinta la linea
        //* y se cancela el selectSecondElementTimeout
        clearTimeout(this.selectSecondElementTimeout);
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
    this.leaderLineArray.push({
    line,
    startElement: this.elementsToMatch[0].id,
    endElement: this.elementsToMatch[1].id,
    });

    //* Metodo para dibujar la linea con aminacion de dibujo
    line.show('draw', { duration: 300, timing: 'ease-in-out' });

    //* Limpiando el array de elementos a unir
    this.elementsToMatch = [];
  }

  setElementsArray(){
    const elementsArray = JSON.parse(localStorage.getItem('elementsArray')?? '[]');

    if(elementsArray.length){
      elementsArray.forEach(( element: IElements, index: number) => {
        //* Pusheando los los items al arreglo para mostrarlos en pantalla
        this.elementsArray.push(element);
      });
    }
  }

  setElementsTransiton(status: boolean){
    const draggableElements: HTMLCollectionOf<Element> = document.getElementsByClassName('box');

      Array.from(draggableElements).forEach((element: Element) => {
        (element as HTMLElement)?.style.setProperty('transition', status ? '500ms ease-in-out' : 'none');
      })
  }

  ngAfterViewInit(): void {
    //* Creando los elementos a mostrar en pantalla
    this.setElementsArray();

    //* Obteniendo el array de los elementos de incio y fin de cada linea
    const storageLeaderLineArray = JSON.parse(localStorage.getItem('leaderLineArray')?? '[]');

    //* Recorriendo el array del localStorage para dibujar nuevamente las lineas
    setTimeout(() => {
      storageLeaderLineArray.forEach((elements: any) => {
          this.elementsToMatch[0] = document.getElementById(`${elements.startElement}`);
          this.elementsToMatch[1] = document.getElementById(`${elements.endElement}`);

          this.drawLeaderLine();
      });
    }, 300);

    this.changeDetector.detectChanges();

    //* Dibujando las lineas hacia sus respectivos elementos
    if (Boolean(this.leaderLineArray.length)) {
      this.leaderLineArray.forEach((linea) => {
        linea.line?.position();
      });
    }
  }

  saveLines() {
    //* Guardar en localStorage el leaderLineArray, para luego en el ng on init crear todo
    const storageLeaderLineArray: any[] = this.leaderLineArray.map(({line, ...rest}) => rest)

    localStorage.setItem('leaderLineArray', JSON.stringify(storageLeaderLineArray));
  }

  saveElementsArray() {

    this.elementsArray.forEach((item: IElements) => {
      //* Obteniendo el elemento
      const element = document.getElementById(`box${item.id}`);
      //* Capturando las posiciones en X y Y
      const navbarHeight = 52;
      const dashboardHeight = 66;

      const x = Number(element?.getBoundingClientRect().left);
      const y = Number(element?.getBoundingClientRect().top) - navbarHeight - dashboardHeight;

      item.coords = { x, y };
    });

    localStorage.setItem('elementsArray', JSON.stringify(this.elementsArray));
  }

  droppedToCreate(event: any){
    const { x, y } = event.dropPoint;

    if(event.event.target.className == 'wrapper' ){
      const navbarHeight = 52;
      const dashboardHeight = 66;

      const boxHeight = 70;
      const boxWidth = 100;

      this.elementsArray.push({
          id: this.elementsArray.length + 1,
          value: `box${this.elementsArray.length + 1}`,
          coords: {
              x: Number(x) - ( boxWidth / 2 ),
              y: Number(y) - navbarHeight - dashboardHeight - ( boxHeight / 2 )
          },
          properties: {
            shape: 'circle',
            color: 'blue',
            role: 'player'
          },
      });
    }
  }

  editValue(value: any){
    console.log(value);

  }

  ngOnDestroy(): void {
    //* Removiendo las lineas cuando cambie de vista
    this.leaderLineArray.forEach((linea: any) => {
      linea?.line?.remove();
    });

    //* Guardando las lineas si se cambia de vista
    this.saveLines();
    this.saveElementsArray();
  }

  @HostListener('window:beforeunload', ['$event'])
  BeforeUnloadEvent(){
    //* Guardando las lineas si se refresca la pagina
    this.saveLines();
    this.saveElementsArray();
  }

}
