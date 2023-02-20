import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-espn-player-trending-col',
  templateUrl: './espn-player-trending-col.component.html',
})
export class EspnPlayerTrendingColComponent {
  @Input() data: number;

  get trendingPositive() {
    return this.data >= 10;
  }

  get trendingNegative() {
    return this.data < 0;
  }
}
