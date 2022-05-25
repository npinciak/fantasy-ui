import { Component } from '@angular/core';
import { UrlFragments } from '@app/@shared/url-builder';
import { LEAGUE_STANDINGS_HEADERS, LEAGUE_STANDINGS_ROWS } from '../../consts/tables.const';
import { FantasyBaseballFreeAgentsFacade } from '../../facade/fantasy-baseball-free-agents.facade';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly LEAGUE_STANDINGS_ROWS = LEAGUE_STANDINGS_ROWS;
  readonly LEAGUE_STANDINGS_HEADERS = LEAGUE_STANDINGS_HEADERS;

  constructor(
    readonly fantasyBaseballFreeAgentsFacade: FantasyBaseballFreeAgentsFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade
  ) {}

  get freeAgentsRoute(): string {
    return `./${UrlFragments.FreeAgents}`;
  }
}
