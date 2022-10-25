import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-espn-player-trending-col',
  templateUrl: './espn-player-trending-col.component.html',
})
export class EspnPlayerTrendingColComponent implements OnInit {
  @Input() data: number;

  constructor() {}

  ngOnInit(): void {}

  get trendingPositive() {
    return this.data >= 10;
  }

  get trendingNegative() {
    return this.data < 0;
  }
}
