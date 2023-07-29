import { Component, Input } from '@angular/core';
import { PlayerNewsEntity } from '@app/espn/models/player-news.model';

@Component({
  selector: 'app-espn-player-news',
  templateUrl: './espn-player-news.component.html',
})
export class EspnPlayerNewsComponent {
  @Input() articles: PlayerNewsEntity[];
}
