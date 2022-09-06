import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlBuilder } from '@app/@shared/url-builder';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { FOOTBALL_LEAGUE_STANDINGS_HEADERS, FOOTBALL_LEAGUE_STANDINGS_ROWS } from '../../consts/fantasy-football-table.const';
import { FantasyFootballLeagueFacade } from '../../facade/fantasy-football-league.facade';
import { FantasyFootballScheduleFacade } from '../../facade/fantasy-football-schedule.facade';

@Component({
  selector: 'app-football-home',
  templateUrl: './football-home.component.html',
  styleUrls: ['./football-home.component.scss'],
})
export class FootballHomeComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  readonly LEAGUE_STANDINGS_ROWS = FOOTBALL_LEAGUE_STANDINGS_ROWS;
  readonly LEAGUE_STANDINGS_HEADERS = FOOTBALL_LEAGUE_STANDINGS_HEADERS;
  matchupPeriodIdFilterOptions$ = this.fantasyFootballScheduleFacade.matchupPeriodIdFilterOptions$;
  matchupListByMatchupPeriodId$ = this.fantasyFootballScheduleFacade.matchupListWithFantasyTeamsByMatchupPeriodId$;
  currentScoringPeriod$ = this.fantasyFootballLeagueFacade.currentScoringPeriodId$;
  standings$ = this.fantasyFootballLeagueFacade.standings$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    readonly fantasyFootballLeagueFacade: FantasyFootballLeagueFacade,
    readonly fantasyFootballScheduleFacade: FantasyFootballScheduleFacade
  ) {}

  ngOnInit(): void {}

  onNavigateToTeamClick(id: string) {
    this.store.dispatch(new Navigate(UrlBuilder.espnNflLeagueTeam(this.leagueId, id)));
  }
}
