import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leader-line',
  templateUrl: './leader-line.component.html',
  styleUrls: ['./leader-line.component.css']
})
export class LeaderLineComponent implements OnInit {
  ngOnInit(): void {
    const win = (window as any);

    console.log('@win', win);
  }
}
