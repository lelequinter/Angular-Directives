import { Component, OnInit } from '@angular/core';
import { Subscriber, fromEvent, map, observable } from 'rxjs';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  click$ = fromEvent<PointerEvent>(document, 'click');

  ngOnInit(): void {
    this.click$
      .subscribe({
        next: (res) => {
          console.log(res);
          const modal = document.getElementById("target");
          const sita = this.clickInside(res, modal);
          console.log('@sita',sita);

        }
      })
  }

  clickInside(event: PointerEvent, notelem: any)	{
    return event.target == notelem || notelem.contains(event.target);
  }

}
