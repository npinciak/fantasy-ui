import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { EspnPlayerDialogComponent } from '@app/espn/components/espn-player-dialog/espn-player-dialog.component';
import { PlayerDialog } from '@app/espn/models/player-dialog-component.model';
import { Store } from '@ngxs/store';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseballStat, BATTER_STATS_LIST, MLB_STATS_MAP, PITCHER_STATS_LIST } from 'sports-ui-sdk';
import { FantasyBaseballPlayerNews } from '../../actions/fantasy-baseball-player-news.actions';
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
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-baseball-team',
  templateUrl: './baseball-team.component.html',
})
export class BaseballTeamComponent {
  teamLineup: BaseballPlayer[];

  readonly teamId$ = this.routerFacade.teamId$;
  readonly leagueId$ = this.routerFacade.leagueId$;

  readonly BATTER_STATS_LIST = BATTER_STATS_LIST;
  readonly PITCHER_STATS_LIST = PITCHER_STATS_LIST;

  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  readonly BATTER_STATS_ROWS = BATTER_STATS_ROWS;
  readonly BATTER_STATS_HEADERS = BATTER_STATS_HEADERS;
  readonly PITCHER_STATS_ROWS = PITCHER_STATS_ROWS;
  readonly PITCHER_STATS_HEADERS = PITCHER_STATS_HEADERS;
  readonly BATTER_STATS_LIVE_ROWS = BATTER_STATS_LIVE_ROWS;
  readonly BATTER_STATS_LIVE_HEADERS = BATTER_STATS_LIVE_HEADERS;

  selectedPitcherStat = BaseballStat.fip;
  selectedBatterStatXAxis = BaseballStat.wOBA;
  selectedBatterStatYAxis = BaseballStat.AB;

  selectedPitcherStatXAxis = BaseballStat.SO;
  selectedPitcherStatYAxis = BaseballStat.APP;

  scoringPeriodId = '002022';

  statPeriod$ = new BehaviorSubject<string>('002022');
  selectedBatterStatXAxis$ = new BehaviorSubject<BaseballStat>(BaseballStat.wOBA);
  selectedBatterStatYAxis$ = new BehaviorSubject<BaseballStat>(BaseballStat.AB);

  isLiveScore: boolean;
  isBatterScatterChart: boolean;
  isPitcherScatterChart: boolean;

  isLoading$ = this.fantasyBaseballLeagueFacade.isLoading$;
  seasonConcluded$ = this.fantasyBaseballLeagueFacade.seasonConcluded$;
  scoringPeriodFilters$ = this.fantasyBaseballLeagueFacade.scoringPeriodFilters$;

  startingBatters$ = this.fantasyBaseballTeamFacade.startingBatters$;
  benchBatters$ = this.fantasyBaseballTeamFacade.benchBatters$;

  startingPitchers$ = this.fantasyBaseballTeamFacade.startingPitchers$;

  newRoster$ = this.fantasyBaseballTeamFacade.currentRoster$;

  batterScatterData$ = combineLatest([
    this.fantasyBaseballTeamFacade.batterStatsScatterChartData$,
    this.statPeriod$,
    this.selectedBatterStatXAxis$,
    this.selectedBatterStatYAxis$,
  ]).pipe(map(([chartData, statPeriod, xAxis, yAxis]) => chartData(statPeriod, xAxis, yAxis)));

  batterBarData$ = of([]); //(fantasyBaseballTeamFacade.batterChartData$ | async)!(teamId, scoringPeriodId, selectedBatterStatXAxis)
  liveBattingStats$ = combineLatest([this.fantasyBaseballTeamFacade.liveBattingStats$, this.teamId$]).pipe(
    map(([liveStats, teamId]) => (teamId ? liveStats(teamId) : []))
  );
  battingStats$ = of([]);

  pitcherStatsScatterChartData$ = of([]);
  pitcherStatsChartData$ = of([]);
  pitcherStats$ = of([]);

  constructor(
    private store: Store,
    readonly routerFacade: RouterFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballPlayerNewsFacade: FantasyBaseballPlayerNewsFacade,
    private dialog: MatDialog
  ) {}

  onRefreshClick() {
    // this.fantasyBaseballLeagueFacade.getLeague(this.leagueId);
  }

  onLiveScoringSelectChange(event: MatSlideToggleChange) {
    this.isLiveScore = event.checked;
  }

  onBatterGraphSelectChange(event: MatSlideToggleChange) {
    this.isBatterScatterChart = event.checked;
  }

  onPitcherGraphSelectChange(event: MatSlideToggleChange) {
    this.isPitcherScatterChart = event.checked;
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
    this.selectedPitcherStatXAxis = val;
  }

  onPitcherStatYAxisChange(val: any): void {
    this.selectedPitcherStatYAxis = val;
  }

  get batterScatterChartTitle(): string {
    return `${this.MLB_STAT_MAP[this.selectedBatterStatXAxis].description} vs ${
      this.MLB_STAT_MAP[this.selectedBatterStatYAxis].description
    }`;
  }

  get pitcherScatterChartTitle(): string {
    return `${this.MLB_STAT_MAP[this.selectedPitcherStatXAxis].description} vs ${
      this.MLB_STAT_MAP[this.selectedPitcherStatYAxis].description
    }`;
  }

  get barChartTitle(): string {
    return this.MLB_STAT_MAP[this.selectedBatterStatXAxis].description;
  }

  async onPlayerClick(player: BaseballPlayer) {
      await this.store.dispatch([new FantasyBaseballPlayerNews.Fetch({ playerId: player.id })]).toPromise();
    const news = this.fantasyBaseballPlayerNewsFacade.getById(player.id)?.news ?? [];

    const data = { player, news, sport: 'mlb' } as PlayerDialog<BaseballPlayer>;

    this.dialog.open(EspnPlayerDialogComponent, { data, height: '500px', width: '800px' });
  }
}
