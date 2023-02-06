import { Component } from '@angular/core';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FOOTBALL_LEAGUE_STANDINGS_HEADERS, FOOTBALL_LEAGUE_STANDINGS_ROWS } from '../../consts/fantasy-football-table.const';
import { FantasyFootballLeagueFacade } from '../../facade/fantasy-football-league.facade';
import { FantasyFootballScheduleFacade } from '../../facade/fantasy-football-schedule.facade';

@Component({
  selector: 'app-football-home',
  templateUrl: './football-home.component.html',
  styleUrls: ['./football-home.component.scss'],
})
export class FootballHomeComponent {
  readonly LEAGUE_STANDINGS_ROWS = FOOTBALL_LEAGUE_STANDINGS_ROWS;
  readonly LEAGUE_STANDINGS_HEADERS = FOOTBALL_LEAGUE_STANDINGS_HEADERS;

  matchupPeriodIdFilterOptions$ = this.fantasyFootballScheduleFacade.matchupPeriodIdFilterOptions$;
  matchupListByMatchupPeriodId$ = this.fantasyFootballScheduleFacade.matchupListWithFantasyTeamsByMatchupPeriodId$;
  currentScoringPeriod$ = this.fantasyFootballLeagueFacade.currentScoringPeriodId$;
  standings$ = this.fantasyFootballLeagueFacade.standings$;
  leagueId$ = this.routerFacade.leagueId$;

  matchups$ = combineLatest([this.matchupListByMatchupPeriodId$, this.currentScoringPeriod$]).pipe(
    map(([matchupListByMatchupPeriodId, currentScoringPeriod]) => matchupListByMatchupPeriodId(currentScoringPeriod))
  );

  constructor(
    readonly routerFacade: RouterFacade,
    readonly fantasyFootballScheduleFacade: FantasyFootballScheduleFacade,
    readonly fantasyFootballLeagueFacade: FantasyFootballLeagueFacade
  ) {}

  onNavigateToTeam(teamId: string) {
    this.routerFacade.navigateToFantasyTeam(teamId);
  }
}
