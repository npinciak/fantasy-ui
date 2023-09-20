import { Component } from '@angular/core';
import { RouterFacade } from '@app/@core/router/router.facade';
import { LayoutService } from '@app/@shared/services/layout.service';
import { BATTER_STATS_LIST_OPTIONS, BaseballStat, MLB_STATS_MAP } from '@sports-ui/ui-sdk';
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
  selector: 'app-baseball-batters',
  templateUrl: './baseball-batters.component.html',
})
export class BaseballBattersComponent {
  readonly MLB_STAT_MAP = MLB_STATS_MAP;
  readonly BATTER_STATS_LIST_OPTIONS = BATTER_STATS_LIST_OPTIONS;

  readonly BATTER_STATS_ROWS = BATTER_STATS_ROWS;
  readonly BATTER_STATS_HEADERS = BATTER_STATS_HEADERS;

  readonly BATTER_STATS_LIVE_ROWS = BATTER_STATS_LIVE_ROWS;
  readonly BATTER_STATS_LIVE_HEADERS = BATTER_STATS_LIVE_HEADERS;

  readonly BaseballStat = BaseballStat;

  isMobile$ = this.layoutService.isMobile$;

  scoringPeriodFilters$ = this.fantasyBaseballLeagueFacade.scoringPeriodFilters$;
  startingBatters$ = this.fantasyBaseballTeamFacade.startingBatters$;
  benchBatters$ = this.fantasyBaseballTeamFacade.benchBatters$;

  isLiveScore$ = new BehaviorSubject<boolean>(false);
  statPeriod$ = new BehaviorSubject<string>(FantasyBaseballScoringPeriod.season('2023'));
  isLoading$ = new BehaviorSubject<boolean>(false);

  selectedBatterStat$ = new BehaviorSubject<BaseballStat>(BaseballStat.wRAA);
  selectedBatterStatLabel$ = new BehaviorSubject<BaseballStat | null>(null);
  tableDataLiveBenchBatters$ = this.fantasyBaseballTeamLiveFacade.liveTeamBenchBatterStatsTableRows$;

  tableDataBatters$ = combineLatest([
    this.fantasyBaseballTeamFacade.battingStats$,
    this.statPeriod$,
    this.isLiveScore$,
    this.fantasyBaseballTeamLiveFacade.liveTeamBatterStatsTableRows$,
  ]).pipe(
    map(([batterStats, statPeriod, isLiveScore, liveTeamBatterStats]) => (isLiveScore ? liveTeamBatterStats : batterStats(statPeriod)))
  );

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
    private layoutService: LayoutService,
    readonly routerFacade: RouterFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    readonly fantasyBaseballTeamLiveFacade: FantasyBaseballTeamLiveFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballPlayerNewsFacade: FantasyBaseballPlayerNewsFacade
  ) {}

  async onRefreshClick(): Promise<void> {
    const leagueId = this.routerFacade.leagueId;
    const year = this.routerFacade.season;
    if (!leagueId || !year) return;

    try {
      this.isLoading$.next(true);

      await this.fantasyBaseballLeagueFacade.getLeague(leagueId, year).toPromise();
      setTimeout(async () => {
        this.isLoading$.next(false);
      }, 2000);
    } catch (e) {
      this.isLoading$.next(false);
    }
  }

  onLiveScoringSelectChange(isChecked: boolean): void {
    this.isLiveScore$.next(isChecked);
  }

  onScoringPeriodIdChange(val: string): void {
    this.statPeriod$.next(val);
  }

  onBatterStatChange(val: any): void {
    this.selectedBatterStat$.next(val);
  }

  onPlayerClicked(player: BaseballPlayer) {
    this.routerFacade.navigateToFantasyPlayer(player.id);
  }
}
