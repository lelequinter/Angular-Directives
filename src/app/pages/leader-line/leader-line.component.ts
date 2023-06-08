import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-leader-line',
  templateUrl: './leader-line.component.html',
  styleUrls: ['./leader-line.component.css'],
})
export class LeaderLineComponent implements OnInit, OnDestroy {
  line: any = false;

  ngOnInit(): void {
    const leaderLine = (window as any).LeaderLine;

    this.line = new leaderLine(
      document.getElementById('start'),
      document.getElementById('end')
    );
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.line.remove();
  }
}
