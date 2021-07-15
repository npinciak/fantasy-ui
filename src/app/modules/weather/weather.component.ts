import { Component, Input, OnInit } from '@angular/core';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { take, takeLast } from 'rxjs/operators';
import { Game } from '../espn/models/mlb/class/game.class';
import { FetchWeather } from './store/weather.actions';
import { WeatherFacade } from './store/weather.facade';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
