import { Component, OnInit } from '@angular/core';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { BATTER_STATS_LIST, BaseballStat } from '@sports-ui/ui-sdk/espn';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LEAGUE_STANDINGS_HEADERS, LEAGUE_STANDINGS_ROWS } from '../../consts/fantasy-baseball-table.const';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamLiveFacade } from '../../facade/fantasy-baseball-team-live.facade';

@Component({
  selector: 'app-baseball-home',
  templateUrl: './baseball-home.component.html',
})
export class BaseballHomeComponent implements OnInit {
  readonly LEAGUE_STANDINGS_ROWS = LEAGUE_STANDINGS_ROWS;
  readonly LEAGUE_STANDINGS_HEADERS = LEAGUE_STANDINGS_HEADERS;

  readonly BATTER_STATS_LIST = BATTER_STATS_LIST.map(p => ({
    label: p.description,
    value: p.id,
  }));

  selectedStat$ = new BehaviorSubject<BaseballStat>(BaseballStat.H);

  leagueStatsBarData$ = combineLatest([this.fantasyBaseballTeamLiveFacade.statsStandingsLineChartData$, this.selectedStat$]).pipe(
    map(([chartData, stat]) => chartData(stat))
  );

  leagueRotoBarData$ = combineLatest([this.fantasyBaseballTeamLiveFacade.rotoStandingsLineChartData$, this.selectedStat$]).pipe(
    map(([chartData, stat]) => chartData(stat))
  );

  constructor(
    readonly routerFacade: RouterFacade,
    readonly fantasyBaseballTeamLiveFacade: FantasyBaseballTeamLiveFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade
  ) {}

  ngOnInit(): void {}

  onNavigateToTeam(teamId: string) {
    this.routerFacade.navigateToFantasyTeam(teamId);
  }

  onStatChange(val: any): void {
    this.selectedStat$.next(val);
  }
}
