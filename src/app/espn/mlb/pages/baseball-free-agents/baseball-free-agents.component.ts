import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { FreeAgentAvailabilityStatusSelectedFacade } from '@app/espn/state/free-agent-availability-selected.facade';
import { Store } from '@ngxs/store';
import {
  BASEBALL_LINEUP_MAP,
  BATTER_STATS_LIST,
  BaseballLineupSlot,
  BaseballStat,
  INJURY_STATUS_FILTER,
  MLB_STATS_MAP,
  PITCHER_STATS_LIST,
} from '@sports-ui/ui-sdk/espn';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { RouterFacade } from '@app/@core/store/router/router.facade';
import { PLAYER_AVAILABILITY_FILTER, PLAYER_AVAILABILITY_STATUS, PlayerAvailabilityStatus } from '@sports-ui/ui-sdk/espn-client';
import { BATTER_STATS_HEADERS, BATTER_STATS_ROWS, PITCHER_STATS_HEADERS, PITCHER_STATS_ROWS } from '../../consts/tables.const';
import { FantasyBaseballFreeAgentsFilterFacade } from '../../facade/fantasy-baseball-free-agents-filter.facade';
import { FantasyBaseballFreeAgentsFacade } from '../../facade/fantasy-baseball-free-agents.facade';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballPlayerNewsFacade } from '../../facade/fantasy-baseball-player-news.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { FantasyBaseballScoringPeriod } from '../../fantasy-baseball-scoring-period';
import { BaseballPlayer } from '../../models/baseball-player.model';

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

  readonly BATTING_LINEUP_SLOTS = [
    BaseballLineupSlot.FirstBase,
    BaseballLineupSlot.SecondBase,
    BaseballLineupSlot.SS,
    BaseballLineupSlot.ThirdBase,
    BaseballLineupSlot.C,
    BaseballLineupSlot.OF,
    BaseballLineupSlot.DH,
  ].map(s => ({ label: BASEBALL_LINEUP_MAP[s].name, value: s }));

  readonly PITCHING_LINEUP_SLOTS = [BaseballLineupSlot.SP, BaseballLineupSlot.RP].map(s => ({
    label: BASEBALL_LINEUP_MAP[s].name,
    value: s,
  }));

  readonly BASEBALL_LINEUP_MAP = BASEBALL_LINEUP_MAP;

  readonly INJURY_STATUS_FILTER = INJURY_STATUS_FILTER;
  readonly PLAYER_AVAILABILITY_FILTER = PLAYER_AVAILABILITY_FILTER;

  isLoading$ = new BehaviorSubject<boolean>(false);
  isSelectedAvailabilityStatusToggled$ = this.freeAgentAvailabilityStatusSelectedFacade.isSelected$;
  isSelectedLineupSlotIdToggled$ = this.fantasyBaseballFreeAgentsFilterFacade.isSelectedLineupSlotIdToggled$;

  toggledAvailabilityStatusIds$ = this.freeAgentAvailabilityStatusSelectedFacade.isToggled$;
  toggledLineupSlotIds$ = this.fantasyBaseballFreeAgentsFilterFacade.toggledLineupSlotIds$;

  scoringPeriodId$ = new BehaviorSubject<string>(FantasyBaseballScoringPeriod.season('2023'));
  selectedPlayerAvailability$ = new BehaviorSubject<string>(PLAYER_AVAILABILITY_STATUS.FreeAgent);
  selectedBattingSlots$ = new BehaviorSubject<BaseballLineupSlot | null>(null);
  selectedPitchingSlots$ = new BehaviorSubject<BaseballLineupSlot | null>(null);

  scoringPeriodFilters$ = this.fantasyBaseballLeagueFacade.scoringPeriodFilters$;

  selectedPlayerHealth$ = new BehaviorSubject<boolean | null>(null);
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
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private routerFacade: RouterFacade,
    readonly freeAgentAvailabilityStatusSelectedFacade: FreeAgentAvailabilityStatusSelectedFacade,
    readonly fantasyBaseballPlayerNewsFacade: FantasyBaseballPlayerNewsFacade,
    readonly fantasyBaseballFreeAgentsFilterFacade: FantasyBaseballFreeAgentsFilterFacade,
    readonly fantasyBaseballFreeAgentsFacade: FantasyBaseballFreeAgentsFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade
  ) {
    this.selectedPlayerAvailabilityStatus = new SelectionModel(true);
  }

  ngOnInit(): void {}

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

  onSelectedLeagueTeamChange(val: string): void {
    this.selectedLeagueTeam$.next(val);
  }

  scoringPeriodIdChange(val: string): void {
    this.scoringPeriodId$.next(val);
    this.fantasyBaseballFreeAgentsFilterFacade.setScoringPeriodIds([val]);
  }

  onPlayerHealthChange(val: boolean | null) {
    this.selectedPlayerHealth$.next(val);
  }

  onBatterStatChange(val: BaseballStat): void {
    this.selectedBatterStat$.next(val);
  }

  onPitcherStatChange(val: BaseballStat): void {
    this.selectedPitcherStat$.next(val);
  }

  onPlayerAvailabilityChange(val: PlayerAvailabilityStatus): void {
    this.selectedPlayerAvailability$.next(val);
    this.freeAgentAvailabilityStatusSelectedFacade.toggle([val]);
  }

  onTabChange(val: number): void {
    this.tabGroup = val;
  }

  onBattingSlotIdChange(val: number): void {
    this.selectedBattingSlots$.next(val);
    this.fantasyBaseballFreeAgentsFilterFacade.toggleFilterSlotIds(val);
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

  onPlayerClick(player: BaseballPlayer): void {
    this.routerFacade.navigateToFantasyPlayer(player.id);
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
