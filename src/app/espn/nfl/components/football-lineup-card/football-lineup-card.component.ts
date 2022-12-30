import { Component, ViewEncapsulation } from '@angular/core';
import { EspnLineupCardComponent } from '@app/espn/components/espn-lineup-card/espn-lineup-card.component';
import { FootballPlayer } from '../../models/football-player.model';

@Component({
  selector: 'app-football-lineup-card',
  templateUrl: './football-lineup-card.component.html',
  styleUrls: ['./football-lineup-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FootballLineupCardComponent extends EspnLineupCardComponent<FootballPlayer> {}
