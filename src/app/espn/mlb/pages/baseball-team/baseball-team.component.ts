import { Component } from '@angular/core';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { BATTER_STATS_LIST_OPTIONS, BaseballStat, MLB_STATS_MAP } from '@sports-ui/ui-sdk/espn';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  BATTER_STATS_HEADERS,
  BATTER_STATS_LIVE_HEADERS,
  BATTER_STATS_LIVE_ROWS,
  BATTER_STATS_ROWS,
} from '../../consts/fantasy-baseball-table.const';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballPlayerNewsFacade } from '../../facade/fantasy-baseball-player-news.facade';
import { FantasyBaseballTeamLiveFacade } from '../../facade/fantasy-baseball-team-live.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { FantasyBaseballScoringPeriod } from '../../fantasy-baseball-scoring-period';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-baseball-team',
  templateUrl: './baseball-team.component.html',
})
export class BaseballTeamComponent {
  readonly BATTER_STATS_LIST_OPTIONS = BATTER_STATS_LIST_OPTIONS;

  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  statPeriod$ = new BehaviorSubject<string>(FantasyBaseballScoringPeriod.season('2023'));
  selectedBatterStat$ = new BehaviorSubject<BaseballStat>(BaseballStat.wOBA);
  selectedBatterStatLabel$ = new BehaviorSubject<BaseballStat>(BaseballStat.wOBA);

  selectedBatterStatXAxis$ = new BehaviorSubject<BaseballStat>(BaseballStat.wRAA);
  selectedBatterStatXAxisLabel$ = new BehaviorSubject<BaseballStat | null>(null);
  selectedBatterStatYAxis$ = new BehaviorSubject<BaseballStat>(BaseballStat.AB);
  selectedBatterStatYAxisLabel$ = new BehaviorSubject<BaseballStat | null>(null);

  isLiveScore$ = new BehaviorSubject<boolean>(false);
  isLoading$ = new BehaviorSubject<boolean>(false);

  seasonConcluded$ = this.fantasyBaseballLeagueFacade.seasonConcluded$;
  scoringPeriodFilters$ = this.fantasyBaseballLeagueFacade.scoringPeriodFilters$;

  startingBatters$ = this.fantasyBaseballTeamFacade.startingBatters$;
  benchBatters$ = this.fantasyBaseballTeamFacade.benchBatters$;

  startingPitchers$ = this.fantasyBaseballTeamFacade.startingPitchers$;
  benchPitchers$ = this.fantasyBaseballTeamFacade.benchPitchers$;

  newRoster$ = this.fantasyBaseballTeamFacade.currentRoster$;

  batterScatterData$ = combineLatest([
    this.fantasyBaseballTeamFacade.batterStatsScatterChartData$,
    this.statPeriod$,
    this.selectedBatterStatXAxis$,
    this.selectedBatterStatYAxis$,
  ]).pipe(map(([chartData, statPeriod, xAxis, yAxis]) => chartData(statPeriod, xAxis, yAxis)));

  batterBarData$ = combineLatest([this.fantasyBaseballTeamFacade.batterChartData$, this.statPeriod$, this.selectedBatterStat$]).pipe(
    map(([chartData, statPeriod, xAxis]) => chartData(statPeriod, xAxis))
  );

  defaultTableConfig$ = of({
    rows: BATTER_STATS_ROWS,
    headers: BATTER_STATS_HEADERS,
  });

  liveTableConfig$ = of({
    rows: BATTER_STATS_LIVE_ROWS,
    headers: BATTER_STATS_LIVE_HEADERS,
  });

  tableConfig$ = combineLatest([this.defaultTableConfig$, this.liveTableConfig$, this.isLiveScore$]).pipe(
    map(([defaultTableConfig, liveTableConfig, isLive]) => (isLive ? liveTableConfig : defaultTableConfig))
  );

  constructor(
    readonly routerFacade: RouterFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    readonly fantasyBaseballTeamLiveFacade: FantasyBaseballTeamLiveFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballPlayerNewsFacade: FantasyBaseballPlayerNewsFacade
  ) {}

  async onRefreshClick(): Promise<void> {
    try {
      this.isLoading$.next(true);

      await this.fantasyBaseballLeagueFacade.refreshCurrentLeague().toPromise();
      setTimeout(async () => {
        this.isLoading$.next(false);
      }, 2000);
    } catch (e) {
      this.isLoading$.next(false);
    }
  }

  onScoringPeriodIdChange(val: string): void {
    this.statPeriod$.next(val);
  }

  onBatterStatChange(val: any): void {
    this.selectedBatterStat$.next(val);
    this.selectedBatterStatLabel$.next(MLB_STATS_MAP[val].description);
  }

  onBatterStatXAxisChange(val: any): void {
    this.selectedBatterStatXAxis$.next(val);
    this.selectedBatterStatXAxisLabel$.next(MLB_STATS_MAP[val].description);
  }

  onBatterStatYAxisChange(val: any): void {
    this.selectedBatterStatYAxis$.next(val);
    this.selectedBatterStatYAxisLabel$.next(MLB_STATS_MAP[val].description);
  }

  onPlayerClick(player: BaseballPlayer) {
    this.routerFacade.navigateToFantasyPlayer(player.id);
  }
}
