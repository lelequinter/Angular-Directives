import { Component, OnInit } from '@angular/core';
import { Subscriber, fromEvent, map, observable } from 'rxjs';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  click$ = fromEvent<PointerEvent>(document, 'click');

  points: number = 0;

  ngOnInit(): void {
    this.click$
      .subscribe({
        next: (res) => {
          const wrapper: HTMLElement | null = document.getElementById("wrapper");
          
          if(this.clickInside(res, wrapper)){
            const target: HTMLElement | null = document.getElementById("target");
            const clickRes: boolean = this.clickInside(res, target);
            this.pointsCounter(clickRes);
            this.scoreAnimation(clickRes);
            this.randomizePosition();
          }
        }
      })
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
    return event.target == element || element.contains(event.target);
  }

  restart(){
    this.points = 0;
    const target: HTMLElement | null = document.getElementById("target");
    target?.style.setProperty('left', `calc(50% - 100px/2)`);
    target?.style.setProperty('top', `calc(50% - 100px/2)`);
  }
}
