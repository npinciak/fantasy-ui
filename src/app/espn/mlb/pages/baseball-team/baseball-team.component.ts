import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { Store } from '@ngxs/store';
import { BATTER_STATS_LIST, BaseballStat, MLB_STATS_MAP, PITCHER_STATS_LIST } from '@sports-ui/ui-sdk/espn';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  BATTER_STATS_HEADERS,
  BATTER_STATS_LIVE_HEADERS,
  BATTER_STATS_LIVE_ROWS,
  BATTER_STATS_ROWS,
  PITCHER_STATS_HEADERS,
  PITCHER_STATS_ROWS,
} from '../../consts/tables.const';
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
  teamLineup: BaseballPlayer[];

  readonly teamId$ = this.routerFacade.teamId$;
  readonly leagueId$ = this.routerFacade.leagueId$;

  readonly BATTER_STATS_LIST = BATTER_STATS_LIST.map(p => ({
    label: p.description,
    value: p.id,
  }));

  readonly PITCHER_STATS_LIST = PITCHER_STATS_LIST;

  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  readonly BATTER_STATS_ROWS = BATTER_STATS_ROWS;
  readonly BATTER_STATS_HEADERS = BATTER_STATS_HEADERS;
  readonly PITCHER_STATS_ROWS = PITCHER_STATS_ROWS;
  readonly PITCHER_STATS_HEADERS = PITCHER_STATS_HEADERS;
  readonly BATTER_STATS_LIVE_ROWS = BATTER_STATS_LIVE_ROWS;
  readonly BATTER_STATS_LIVE_HEADERS = BATTER_STATS_LIVE_HEADERS;

  selectedPitcherStat = BaseballStat.fip;

  selectedPitcherStatXAxis$ = new BehaviorSubject<BaseballStat>(BaseballStat.SO);
  selectedPitcherStatYAxis$ = new BehaviorSubject<BaseballStat>(BaseballStat.APP);

  statPeriod$ = new BehaviorSubject<string>(FantasyBaseballScoringPeriod.season('2023'));
  selectedBatterStatXAxis$ = new BehaviorSubject<BaseballStat>(BaseballStat.wRAA);
  selectedBatterStatYAxis$ = new BehaviorSubject<BaseballStat>(BaseballStat.AB);

  isLiveScore$ = new BehaviorSubject<boolean>(false);
  isBatterScatterChart$ = new BehaviorSubject<boolean>(false);
  isPitcherScatterChart$ = new BehaviorSubject<boolean>(false);

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

  batterBarData$ = combineLatest([this.fantasyBaseballTeamFacade.batterChartData$, this.statPeriod$, this.selectedBatterStatXAxis$]).pipe(
    map(([chartData, statPeriod, xAxis]) => chartData(statPeriod, xAxis))
  );

  battingStats$ = of([]);

  pitcherStatsScatterChartData$ = of([]);
  pitcherStatsChartData$ = of([]);

  tableDataBatters$ = combineLatest([
    this.fantasyBaseballTeamFacade.battingStats$,
    this.statPeriod$,
    this.isLiveScore$,
    this.fantasyBaseballTeamLiveFacade.liveTeamBatterStatsTableRows$,
  ]).pipe(
    map(([batterStats, statPeriod, isLiveScore, liveTeamBatterStats]) => (isLiveScore ? liveTeamBatterStats : batterStats(statPeriod)))
  );

  tableDataPitchers$ = combineLatest([this.fantasyBaseballTeamFacade.pitcherStats$, this.statPeriod$]).pipe(
    map(([pitcherStats, statPeriod]) => pitcherStats(statPeriod))
  );

  pitcherTableConfig$ = of({
    rows: PITCHER_STATS_ROWS,
    headers: PITCHER_STATS_HEADERS,
  });

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

  onLiveScoringSelectChange(isChecked: boolean): void {
    this.isLiveScore$.next(isChecked);
  }

  onBatterGraphSelectChange(isChecked: boolean): void {
    this.isBatterScatterChart$.next(isChecked);
  }

  onPitcherGraphSelectChange(isChecked: boolean): void {
    this.isPitcherScatterChart$.next(isChecked);
  }

  onScoringPeriodIdChange(val: string): void {
    this.statPeriod$.next(val);
  }

  onBatterStatXAxisChange(val: any): void {
    this.selectedBatterStatXAxis$.next(val);
  }

  onBatterStatYAxisChange(val: any): void {
    this.selectedBatterStatYAxis$.next(val);
  }

  onPitcherStatXAxisChange(val: any): void {
    this.selectedPitcherStatXAxis$.next(val);
  }

  onPitcherStatYAxisChange(val: any): void {
    this.selectedPitcherStatYAxis$.next(val);
  }

  get batterScatterChartTitle(): string {
    return '';

    // `${this.MLB_STAT_MAP[this.selectedBatterStatXAxis].description} vs ${
    //   this.MLB_STAT_MAP[this.selectedBatterStatYAxis].description
    // }`;
  }

  get pitcherScatterChartTitle(): string {
    return '';
    //  `${this.MLB_STAT_MAP[this.selectedPitcherStatXAxis$].description} vs ${
    //   this.MLB_STAT_MAP[this.selectedPitcherStatYAxis$].description
    // }`;
  }

  get barChartTitle(): string {
    return '';
    //  this.MLB_STAT_MAP[this.selectedBatterStatXAxis].description;
  }

  onPlayerClick(player: BaseballPlayer) {
    this.routerFacade.navigateToFantasyPlayer(player.id);
  }
}
