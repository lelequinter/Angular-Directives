import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, fromEvent, map, observable } from 'rxjs';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnDestroy {
  line: any = null;

  points: number = 0;

  @HostListener('click', ['$event'])
  onclick(res: any) {
    const {x,y} = res;

    const wrapper: HTMLElement | null = document.getElementById("wrapper");

    if(this.clickInside(res, wrapper)){
      const target: HTMLElement | null = document.getElementById("target");
      const clickRes: boolean = this.clickInside(res, target);
      this.pointsCounter(clickRes);
      this.scoreAnimation(clickRes);
      this.randomizePosition();
      //! se resta el alto de la navBar y dasboard de aimLab
      this.createTrackLine((x - 8 ),(y - ( 21 + (16*2)) - 41));
    }
  }

  randomizePosition() {
    const wrapper: HTMLElement | null = document.getElementById("wrapper");
    const X = Number(wrapper?.clientWidth) - 100;
    const Y = Number(wrapper?.clientHeight) - 100;
    const randomX = Math.floor(Math.random() * (X));
    const randomY = Math.floor(Math.random() * (Y));

    const target: HTMLElement | null = document.getElementById("target");
    target?.style.setProperty('left', `${randomX}px`);
    target?.style.setProperty('top', `${randomY}px`);
  }

  pointsCounter(click: boolean) {
    click ? this.points += 1 : this.points !== 0 ? this.points -= 1 : this.points = 0;
  }

  scoreAnimation(clickRes:boolean){
    const score: HTMLElement | null = document.getElementById("score");

    if(clickRes){
      score?.classList.add('succeed');
      setTimeout(() => {
        score?.classList.remove('succeed');
      }, 300);
    }else{
      score?.classList.add('fail');
      setTimeout(() => {
        score?.classList.remove('fail');
      }, 1000);
    }
  }

  clickInside(event: PointerEvent, element: any) {
    return event?.target == element || element?.contains(event.target);
  }

  createTrackLine(x: number, y:number){
    Boolean(this.line) && this.line?.remove();

    document.getElementById('prevClick')?.remove();

    const prevClick: HTMLDivElement = document.createElement('div');
    prevClick?.setAttribute('id','prevClick')
    prevClick?.style.setProperty('position', `absolute`);
    prevClick?.style.setProperty('top', `${y}px`);
    prevClick?.style.setProperty('left', `${x}px`);

    const wrapper: HTMLElement | null = document.getElementById("wrapper");
    wrapper?.appendChild(prevClick);

    const leaderLine = (window as any).LeaderLine;
    this.line = new leaderLine(
      document.getElementById('prevClick'),
      document.getElementById('target'),
      {
        hide: true,
        dash: {animation: true},
        startPlug: 'disc',
        endPlug: 'triangle'
      }
    );
    this.line.show('draw',{duration: 300, timing: 'ease-in-out'});
  }

  restart(){
    this.points = 0;
    const target: HTMLElement | null = document.getElementById("target");
    target?.style.setProperty('left', `calc(50% - 100px/2)`);
    target?.style.setProperty('top', `calc(50% - 100px/2)`);

    this.line.hide('fade',{duration: 200});
    document.getElementById('prevClick')?.remove();
  }

  ngOnDestroy(): void {
    // this.line?.remove();
    const lineas = document.getElementsByClassName('leader-line');
    Array.from(lineas).forEach( (linea: any) => {
      linea.remove();
    });
  }
}
