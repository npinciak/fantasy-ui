import { Component, OnInit } from '@angular/core';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { LEAGUE_STANDINGS_HEADERS, LEAGUE_STANDINGS_ROWS } from '../../consts/tables.const';
import { FantasyBaseballFreeAgentsFacade } from '../../facade/fantasy-baseball-free-agents.facade';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';

@Component({
  selector: 'app-baseball-home',
  templateUrl: './baseball-home.component.html',
})
export class BaseballHomeComponent implements OnInit {
  readonly LEAGUE_STANDINGS_ROWS = LEAGUE_STANDINGS_ROWS;
  readonly LEAGUE_STANDINGS_HEADERS = LEAGUE_STANDINGS_HEADERS;

  readonly leagueId = this.routerFacade.leagueId;

  standings$ = this.fantasyBaseballTeamFacade.standings$;

  constructor(
    readonly routerFacade: RouterFacade,
    readonly fantasyBaseballFreeAgentsFacade: FantasyBaseballFreeAgentsFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade
  ) {}

  ngOnInit(): void {}
}
