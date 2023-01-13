import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { UrlBuilder } from '@app/@core/store/router/url-builder';
import { BASEBALL_STAT_PERIOD_FILTER_OPTIONS } from '@app/espn/const/stat-period.const';
import {
  BaseballStat,
  BATTER_STATS_LIST,
  BATTING_LINEUP_SLOTS,
  MLB_LINEUP_MAP,
  MLB_STATS_MAP,
  PITCHER_STATS_LIST,
  PITCHING_LINEUP_SLOTS,
} from 'sports-ui-sdk';
import { BATTER_STATS_HEADERS, BATTER_STATS_ROWS, PITCHER_STATS_HEADERS, PITCHER_STATS_ROWS } from '../../consts/tables.const';
import { FantasyBaseballFreeAgentsFilterFacade } from '../../facade/fantasy-baseball-free-agents-filter.facade';
import { FantasyBaseballFreeAgentsFacade } from '../../facade/fantasy-baseball-free-agents.facade';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';

enum PositionTabGroup {
  Batters,
  Pitchers,
}

@Component({
  selector: `app-baseball-free-agents`,
  templateUrl: './baseball-free-agents.component.html',
  styleUrls: ['./baseball-free-agents.component.scss'],
})
export class BaseballFreeAgentsComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;
  readonly BASEBALL_STAT_PERIOD_FILTER_OPTIONS = BASEBALL_STAT_PERIOD_FILTER_OPTIONS;

  readonly BATTER_STATS_LIST = BATTER_STATS_LIST;
  readonly PITCHER_STATS_LIST = PITCHER_STATS_LIST;

  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  readonly BATTER_STATS_ROWS = BATTER_STATS_ROWS;
  readonly BATTER_STATS_HEADERS = BATTER_STATS_HEADERS;
  readonly PITCHER_STATS_ROWS = PITCHER_STATS_ROWS;
  readonly PITCHER_STATS_HEADERS = PITCHER_STATS_HEADERS;

  readonly BATTING_LINEUP_SLOTS = BATTING_LINEUP_SLOTS;
  readonly PITCHING_LINEUP_SLOTS = PITCHING_LINEUP_SLOTS;

  readonly MLB_LINEUP_MAP = MLB_LINEUP_MAP;

  scoringPeriodId: string = '002022';

  selectedPitcherStat = BaseballStat.ERA;
  selectedBatterStat = BaseballStat.AVG;

  selectedLeagueTeam = '1';

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

  onSelectedLeagueTeamChange(val: string): void {
    this.selectedLeagueTeam = val;
  }

  scoringPeriodIdChange(change: string): void {
    this.scoringPeriodId = change;
  }

  onBatterStatChange(val: BaseballStat): void {
    this.selectedBatterStat = val;
  }

  onPitcherStatChange(val: BaseballStat): void {
    this.selectedPitcherStat = val;
  }

  onTabChange(val: number): void {
    this.tabGroup = val;
  }

  onPlayerAvailabilityStatusChange(event: MatSelectChange): void {}

  onLineupFilterSlotIdChange(val: number[]): void {
    this.fantasyBaseballFreeAgentsFilterFacade.toggleFilterSlotIds(val);
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
