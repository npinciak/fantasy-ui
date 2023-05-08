import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { UrlBuilder } from '@app/@core/store/router/url-builder';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  BATTER_STATS_LIST,
  BATTING_LINEUP_SLOTS,
  BaseballLineupSlot,
  BaseballStat,
  MLB_LINEUP_MAP,
  MLB_STATS_MAP,
  PITCHER_STATS_LIST,
  PITCHING_LINEUP_SLOTS,
  PLAYER_AVAILABILITY_STATUS,
} from 'sports-ui-sdk';
import { BATTER_STATS_HEADERS, BATTER_STATS_ROWS, PITCHER_STATS_HEADERS, PITCHER_STATS_ROWS } from '../../consts/tables.const';
import { FantasyBaseballFreeAgentsFilterFacade } from '../../facade/fantasy-baseball-free-agents-filter.facade';
import { FantasyBaseballFreeAgentsFacade } from '../../facade/fantasy-baseball-free-agents.facade';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { FantasyBaseballScoringPeriod } from '../../fantasy-baseball-scoring-period';

enum PositionTabGroup {
  Batters,
  Pitchers,
}

@Component({
  selector: `app-baseball-free-agents`,
  templateUrl: './baseball-free-agents.component.html',
})
export class BaseballFreeAgentsComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;
  readonly BASEBALL_STAT_PERIOD_FILTER_OPTIONS = [];

  readonly BATTER_STATS_LIST = BATTER_STATS_LIST.map(s => ({ label: s.description, value: s.id }));
  readonly PITCHER_STATS_LIST = PITCHER_STATS_LIST.map(s => ({ label: s.description, value: s.id }));

  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  readonly BATTER_STATS_ROWS = BATTER_STATS_ROWS;
  readonly BATTER_STATS_HEADERS = BATTER_STATS_HEADERS;
  readonly PITCHER_STATS_ROWS = PITCHER_STATS_ROWS;
  readonly PITCHER_STATS_HEADERS = PITCHER_STATS_HEADERS;

  readonly BATTING_LINEUP_SLOTS = BATTING_LINEUP_SLOTS.map(s => ({ label: MLB_LINEUP_MAP[s].name, value: s }));
  readonly PITCHING_LINEUP_SLOTS = PITCHING_LINEUP_SLOTS.map(s => ({ label: MLB_LINEUP_MAP[s].name, value: s }));

  readonly MLB_LINEUP_MAP = MLB_LINEUP_MAP;

  readonly PLAYER_AVAILABILITY_FILTER: FilterOptions<string>[] = [
    { value: PLAYER_AVAILABILITY_STATUS.FreeAgent, label: 'Free Agents' },
    { value: PLAYER_AVAILABILITY_STATUS.Waivers, label: 'Waivers' },
    { value: PLAYER_AVAILABILITY_STATUS.OnTeam, label: 'On Team' },
  ];

  scoringPeriodId$ = new BehaviorSubject<string>(FantasyBaseballScoringPeriod.season('2023'));
  selectedPlayerAvailability$ = new BehaviorSubject<string>(PLAYER_AVAILABILITY_STATUS.FreeAgent);
  selectedBattingSlots$ = new BehaviorSubject<BaseballLineupSlot | null>(null);
  selectedPitchingSlots$ = new BehaviorSubject<BaseballLineupSlot | null>(null);

  scoringPeriodFilters$ = this.fantasyBaseballLeagueFacade.scoringPeriodFilters$;

  selectedPitcherStat$ = new BehaviorSubject<BaseballStat>(BaseballStat.ERA);
  selectedBatterStat$ = new BehaviorSubject<BaseballStat>(BaseballStat.AVG);
  selectedLeagueTeam$ = new BehaviorSubject<string | null>(null);

  tableConfig$ = of({
    rows: BATTER_STATS_ROWS,
    headers: BATTER_STATS_HEADERS,
  });

  compareTeamAndFreeAgentBatterList$ = combineLatest([
    this.fantasyBaseballFreeAgentsFacade.compareTeamAndFreeAgentBatterList$,
    this.selectedLeagueTeam$,
    this.scoringPeriodId$,
  ]).pipe(
    map(([compareTeamAndFreeAgentBatterList, selectedTeam, scoringPeriodId]) =>
      compareTeamAndFreeAgentBatterList(selectedTeam, scoringPeriodId)
    )
  );

  compareTeamAndFreeAgentPitcherList$ = combineLatest([
    this.fantasyBaseballFreeAgentsFacade.compareTeamAndFreeAgentPitcherList$,
    this.selectedLeagueTeam$,
    this.scoringPeriodId$,
  ]).pipe(
    map(([compareTeamAndFreeAgentPitcherList, selectedTeam, scoringPeriodId]) =>
      compareTeamAndFreeAgentPitcherList(selectedTeam, scoringPeriodId)
    )
  );

  pitcherTableConfig$ = of({
    rows: PITCHER_STATS_ROWS,
    headers: PITCHER_STATS_HEADERS,
  });

  batterBarData$ = combineLatest([
    this.fantasyBaseballFreeAgentsFacade.freeAgentBatterChartData$,
    this.scoringPeriodId$,
    this.selectedBatterStat$,
  ]).pipe(map(([chartData, statPeriod, xAxis]) => chartData(statPeriod, '2023', xAxis)));

  // (fantasyBaseballFreeAgentsFacade.compareTeamAndFreeAgentBatterList$ | async)!(selectedLeagueTeam, scoringPeriodId, '2022')"

  selectedPlayerAvailabilityStatus: SelectionModel<string>;
  tabGroup = PositionTabGroup.Batters;

  sortedStatId: any;
  sortDirection: any;
  pageSize: any;
  pageIndex: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    readonly fantasyBaseballFreeAgentsFilterFacade: FantasyBaseballFreeAgentsFilterFacade,
    readonly fantasyBaseballFreeAgentsFacade: FantasyBaseballFreeAgentsFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade
  ) {
    this.selectedPlayerAvailabilityStatus = new SelectionModel(true);
  }

  ngOnInit(): void {}

  async onRefreshClick(): Promise<void> {
    try {
      await this.fantasyBaseballLeagueFacade.refreshCurrentLeague().toPromise();
    } catch (e) {}
  }

  onSelectedLeagueTeamChange(val: string): void {
    this.selectedLeagueTeam$.next(val);
  }

  scoringPeriodIdChange(change: string): void {
    this.scoringPeriodId$.next(change);
  }

  onBatterStatChange(val: BaseballStat): void {
    this.selectedBatterStat$.next(val);
  }

  onPitcherStatChange(val: BaseballStat): void {
    this.selectedPitcherStat$.next(val);
  }

  onPlayerAvailabilityChange(val: string): void {
    this.selectedPlayerAvailability$.next(val);
  }

  onTabChange(val: number): void {
    this.tabGroup = val;
  }

  onPlayerAvailabilityStatusChange(event: MatSelectChange): void {}

  onBattingSlotIdChange(val: number): void {
    this.selectedBattingSlots$.next(val);
  }

  onPitchingSlotIdChange(val: number): void {
    this.selectedPitchingSlots$.next(val);
  }

  onSortChanged(event: Sort): void {
    this.sortDirection = event.direction;
    this.sortedStatId = event.active;

    this.fantasyBaseballFreeAgentsFilterFacade.setPagination(this.paginationMeta);
  }

  onPaginatorChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fantasyBaseballFreeAgentsFilterFacade.setPagination(this.paginationMeta);
  }

  get viewingBatters(): boolean {
    return this.tabGroup === PositionTabGroup.Batters;
  }

  get homeRoute(): string[] {
    return [UrlBuilder.espnMlbBase, `${this.leagueId}`];
  }

  private get paginationMeta() {
    return {
      sortStatId: this.sortedStatId,
      sortDirection: this.sortDirection,
      currentPageSize: this.pageSize,
      currentPageIndex: this.pageIndex,
    };
  }
}
