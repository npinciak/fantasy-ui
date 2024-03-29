import { Component } from '@angular/core';
import { RouterFacade } from '@app/@core/router/router.facade';
import { BaseballStat, MLB_STATS_MAP, PITCHER_STATS_LIST } from '@sports-ui/ui-sdk';
import { BehaviorSubject, combineLatest, firstValueFrom, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  PITCHER_STATS_HEADERS,
  PITCHER_STATS_LIVE_HEADERS,
  PITCHER_STATS_LIVE_ROWS,
  PITCHER_STATS_ROWS,
} from '../../consts/fantasy-baseball-table.const';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballPlayerNewsFacade } from '../../facade/fantasy-baseball-player-news.facade';
import { FantasyBaseballTeamLiveFacade } from '../../facade/fantasy-baseball-team-live.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { FantasyBaseballScoringPeriod } from '../../fantasy-baseball-scoring-period';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-baseball-pitchers',
  templateUrl: './baseball-pitchers.component.html',
})
export class BaseballPitchersComponent {
  readonly PITCHER_STATS_ROWS = PITCHER_STATS_ROWS;
  readonly PITCHER_STATS_HEADERS = PITCHER_STATS_HEADERS;
  readonly PITCHER_STATS_LIST = PITCHER_STATS_LIST;
  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  selectedPitcherStat = BaseballStat.fip;
  isLoading$ = new BehaviorSubject<boolean>(false);
  isLiveScore$ = new BehaviorSubject<boolean>(false);

  selectedPitcherStatXAxis$ = new BehaviorSubject<BaseballStat>(BaseballStat.SO);
  selectedPitcherStatYAxis$ = new BehaviorSubject<BaseballStat>(BaseballStat.APP);
  statPeriod$ = new BehaviorSubject<string>(FantasyBaseballScoringPeriod.season('2023'));

  startingPitchers$ = this.fantasyBaseballTeamFacade.startingPitchers$;
  benchPitchers$ = this.fantasyBaseballTeamFacade.benchPitchers$;

  tableDataPitchers$ = combineLatest([
    this.fantasyBaseballTeamFacade.pitcherStats$,
    this.statPeriod$,
    this.isLiveScore$,
    this.fantasyBaseballTeamLiveFacade.liveTeamPitcherStatsTableRows$,
  ]).pipe(
    map(([pitcherStats, statPeriod, isLiveScore, liveTeamPitcherStats]) => (isLiveScore ? liveTeamPitcherStats : pitcherStats(statPeriod)))
  );

  pitcherTableConfig$ = of({
    rows: PITCHER_STATS_ROWS,
    headers: PITCHER_STATS_HEADERS,
  });

  defaultTableConfig$ = of({
    rows: PITCHER_STATS_ROWS,
    headers: PITCHER_STATS_HEADERS,
  });

  liveTableConfig$ = of({
    rows: PITCHER_STATS_LIVE_ROWS,
    headers: PITCHER_STATS_LIVE_HEADERS,
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
    const leagueId = this.routerFacade.leagueId;
    const year = this.routerFacade.season;
    if (!leagueId || !year) return;

    try {
      this.isLoading$.next(true);

      await firstValueFrom(this.fantasyBaseballLeagueFacade.getLeague(leagueId, year));
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

  onPitcherStatXAxisChange(val: any): void {
    this.selectedPitcherStatXAxis$.next(val);
  }

  onPitcherStatYAxisChange(val: any): void {
    this.selectedPitcherStatYAxis$.next(val);
  }

  onScoringPeriodIdChange(val: string): void {
    this.statPeriod$.next(val);
  }

  onPlayerClicked(player: BaseballPlayer) {
    this.routerFacade.navigateToFantasyPlayer(player.id);
  }
}
