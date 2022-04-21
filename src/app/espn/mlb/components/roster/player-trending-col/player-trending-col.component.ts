import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-trending-col',
  templateUrl: './player-trending-col.component.html',
})
export class PlayerTrendingColComponent implements OnInit {
  @Input() data: number;
  @Input() key: string;

  constructor() {}

  ngOnInit(): void {}

  get trendingPositive() {
    return this.data > 10;
  }

  get trendingNegative() {
    return this.data < 0;
  }
}
