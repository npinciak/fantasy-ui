import { Component, OnInit } from '@angular/core';
import { LEAGUE_STANDINGS_HEADERS, LEAGUE_STANDINGS_ROWS } from '../../consts/tables.const';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamLiveFacade } from '../../facade/fantasy-baseball-team-live.facade';

@Component({
  selector: 'app-baseball-home',
  templateUrl: './baseball-home.component.html',
})
export class BaseballHomeComponent implements OnInit {
  readonly LEAGUE_STANDINGS_ROWS = LEAGUE_STANDINGS_ROWS;
  readonly LEAGUE_STANDINGS_HEADERS = LEAGUE_STANDINGS_HEADERS;

  constructor(
    readonly fantasyBaseballTeamLiveFacade: FantasyBaseballTeamLiveFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade
  ) {}

  ngOnInit(): void {}
}
