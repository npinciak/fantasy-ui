import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-espn-player-trending-col',
  template: `
    <span class="text-sm" [class.text-green-600]="!trendingNegative" [class.text-red-600]="trendingNegative">
      <ng-container *ngIf="!trendingNegative">+</ng-container>{{ data | statFormat: 'number' | number: '1.2' }}
    </span>
  `,
})
export class EspnPlayerTrendingColComponent {
  @Input() data: number;

  get trendingNegative() {
    return this.data <= 0;
  }
}
