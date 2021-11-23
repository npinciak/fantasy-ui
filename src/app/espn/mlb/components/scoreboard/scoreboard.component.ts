import { Component, Input } from '@angular/core';
import { WeatherFacade } from '@espn/weather/facade/weather.facade';
import { MlbEvent } from '../../models/mlb-event.model';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input() events: MlbEvent[];

  constructor(readonly weatherFacade: WeatherFacade) {}
}
