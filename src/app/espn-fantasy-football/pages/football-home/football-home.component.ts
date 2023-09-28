import { Component, OnInit } from '@angular/core';
import { RouterFacade } from '@app/@core/router/router.facade';
import { FOOTBALL_LEAGUE_STANDINGS_HEADERS, FOOTBALL_LEAGUE_STANDINGS_ROWS } from '../../consts/fantasy-football-table.const';
import { FantasyFootballLeagueFacade } from '../../facade/fantasy-football-league.facade';
import { FantasyFootballScheduleFacade } from '../../facade/fantasy-football-schedule.facade';
import { FantasyFootballTeamFacade } from '../../facade/fantasy-football-team.facade';

@Component({
  selector: 'app-football-home',
  templateUrl: './football-home.component.html',
})
export class FootballHomeComponent implements OnInit {
  readonly LEAGUE_STANDINGS_ROWS = FOOTBALL_LEAGUE_STANDINGS_ROWS;
  readonly LEAGUE_STANDINGS_HEADERS = FOOTBALL_LEAGUE_STANDINGS_HEADERS;

  matchupPeriodIdFilterOptions$ = this.fantasyFootballScheduleFacade.matchupPeriodIdFilterOptions$;
  matchupListByMatchupPeriodId$ = this.fantasyFootballScheduleFacade.matchupListWithFantasyTeamsByMatchupPeriodId$;
  currentScoringPeriod$ = this.fantasyFootballLeagueFacade.scoringPeriodId$;
  finalScoringPeriod$ = this.fantasyFootballLeagueFacade.finalScoringPeriod$;

  standings$ = this.fantasyFootballTeamsFacade.standings$;

  constructor(
    readonly routerFacade: RouterFacade,
    readonly fantasyFootballScheduleFacade: FantasyFootballScheduleFacade,
    readonly fantasyFootballLeagueFacade: FantasyFootballLeagueFacade,
    readonly fantasyFootballTeamsFacade: FantasyFootballTeamFacade
  ) {}

  ngOnInit(): void {}

  onNavigateToTeam(teamId: string) {
    this.routerFacade.navigateToFantasyTeam(teamId);
  }

  updateCurrentScoringPeriodId(scoringPeriodId: string) {
    throw new Error('Method not implemented.');
  }
}
