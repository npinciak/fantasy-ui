import { Component, OnInit } from '@angular/core';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { UrlFragments } from '@app/@shared/url-builder';
import { MLB_STADIUM_LIST } from '../../consts/stadium.const';
import { LEAGUE_STANDINGS_HEADERS, LEAGUE_STANDINGS_ROWS } from '../../consts/tables.const';
import { FantasyBaseballFreeAgentsFacade } from '../../facade/fantasy-baseball-free-agents.facade';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';

@Component({
  selector: 'app-baseball-home',
  templateUrl: './baseball-home.component.html',
  styleUrls: ['./baseball-home.component.scss'],
})
export class BaseballHomeComponent implements OnInit {
  readonly LEAGUE_STANDINGS_ROWS = LEAGUE_STANDINGS_ROWS;
  readonly LEAGUE_STANDINGS_HEADERS = LEAGUE_STANDINGS_HEADERS;

  readonly MLB_STADIUM_LIST = MLB_STADIUM_LIST;
  readonly leagueId = this.routerFacade.leagueId;

  constructor(
    readonly routerFacade: RouterFacade,
    readonly fantasyBaseballFreeAgentsFacade: FantasyBaseballFreeAgentsFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade
  ) {}

  ngOnInit(): void {}

  get freeAgentsRoute(): string {
    return `./${UrlFragments.FreeAgents}`;
  }
}