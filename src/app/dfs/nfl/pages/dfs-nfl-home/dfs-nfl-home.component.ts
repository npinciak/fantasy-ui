import { Component, OnInit } from '@angular/core';
import { DfsMatchupsFacade } from '@app/dfs/facade/dfs-matchups.facade';
import { DfsSelectedSlateConfigurationFacade } from '@app/dfs/facade/dfs-selected-slate-configuration.facade';
import { DfsSlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatePlayersFacade } from '@app/dfs/facade/dfs-slate-players.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { DfsHomeComponent } from '@app/dfs/pages/dfs-home/dfs-home.component';
import { SlateType } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { NFL_RG_TEAM_ID_MAP, NFL_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/football';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DfsNflThresholds } from '../../consts/stats-threshold.m';
import { HEADERS_BY_POS, ROWS_BY_POS } from '../../consts/table.const';
import { DfsNflPlayerFacade } from '../../facade/daily-fantasy-nfl-players.facade';
import { DfsNflGridIronFacade } from '../../facade/dfs-nfl-gridiron.facade';
import { DfsNflSlateTeamDetailsFacade } from '../../facade/dfs-nfl-slate-team-details.facade';
import { GridIronProjectionType } from '../../models/nfl-gridIron.model';
import { FilterType } from '../../models/nfl-table.model';
import { NFL_STAT_GROUP_MAP } from '../../models/stat-group.model';

@Component({
  selector: 'app-dfs-nfl-home',
  templateUrl: './dfs-nfl-home.component.html',
})
export class DfsNflHomeComponent extends DfsHomeComponent implements OnInit {
  readonly TABLE_HEADERS_BY_POS = HEADERS_BY_POS;
  readonly TABLE_ROWS_BY_POS = ROWS_BY_POS;

  readonly NFL_STAT_GROUP_MAP = NFL_STAT_GROUP_MAP;
  readonly NFL_RG_TEAM_ID_MAP = NFL_RG_TEAM_ID_MAP;
  readonly NFL_TEAM_ID_MAP = NFL_TEAM_ID_MAP;

  readonly matchupThreshold = DfsNflThresholds.matchupThreshold;
  readonly matchupThresholdInverse = DfsNflThresholds.matchupThresholdInverse;

  nflPositionList$ = this.nflPlayerFacade.positionList$;
  nflPlayerList$ = this.nflPlayerFacade.playerList$;
  nflTeamList$ = this.nflPlayerFacade.teamList$;
  playerScatterAxisOptions$ = this.nflPlayerFacade.playerScatterAxisOptions$;
  playerTeamsFilterOptions$ = this.nflPlayerFacade.playerTeamsFilterOptions$;
  playerPositionFilterOptions$ = this.nflPlayerFacade.playerPositionFilterOptions$;
  teamOwnPercent$ = this.nflPlayerFacade.teamOwnPercent$;

  nflMatchupGraphData$ = this.nflTeamSlateAttrFacade.matchupGraphData$;

  matchups$ = this.dfsMatchupFacade.nflMatchupTableData$;
  nflTopFiveMatchups$ = this.dfsMatchupFacade.nflTopFiveMatchupsByOverUnder$;
  nflTopFiveTeamTotals$ = this.dfsMatchupFacade.nflTopFiveTeamTotals$;

  teamsWithHighestPown$ = this.nflPlayerFacade.teamsWithHighestPown$;
  teamsWithHighestValue$ = this.nflPlayerFacade.teamsWithHighestValue$;

  statGroup: string;
  teamId: number | null = null;
  position$ = new BehaviorSubject<string | null>('All');
  tableFilter$ = new BehaviorSubject<string | null>(null);
  xAxisStat$ = new BehaviorSubject<string | null>(null);
  yAxisStat$ = new BehaviorSubject<string | null>(null);

  selectedSlateType$ = new BehaviorSubject<SlateType | null>(null);

  playerScatterData$ = combineLatest([this.nflPlayerFacade.playerScatterData$, this.xAxisStat$, this.yAxisStat$]).pipe(
    map(([playerScatterData, xAxis, yAxis]) => {
      return playerScatterData(xAxis, yAxis);
    })
  );

  slateWeather$ = combineLatest([this.selectedSlateType$, this.dfsSlateFacade.slateWeather$]).pipe(
    map(([slate, weather]) => {
      return slate != null ? weather(slate as SlateType) : [];
    })
  );

  tableConfig$ = combineLatest([this.position$]).pipe(
    map(([position]) => {
      const headers = position != null ? HEADERS_BY_POS[position] : HEADERS_BY_POS.All;
      const rows = position != null ? ROWS_BY_POS[position] : ROWS_BY_POS.All;
      return {
        headers,
        rows,
      };
    })
  );

  projectionTypeOptions = [
    { value: GridIronProjectionType.BlitzDefault, label: 'Blitz Default' },
    { value: GridIronProjectionType.BlitzDefenseAgnostic, label: 'Blitz Defense Agnostic' },
    { value: GridIronProjectionType.BlitzDefenseDeflated, label: 'Blitz Defense Deflated' },
    { value: GridIronProjectionType.Default, label: 'Default' },
  ];

  constructor(
    readonly dfsPlayersFacade: DfsSlatePlayersFacade,
    readonly dfsSlateFacade: DfsSlatesFacade,
    readonly dfsSlateAttrFacade: DfsSlateAttrFacade,
    readonly dfsMatchupFacade: DfsMatchupsFacade,
    readonly dfsNflGridIronFacade: DfsNflGridIronFacade,
    readonly dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade,
    readonly nflPlayerFacade: DfsNflPlayerFacade,
    readonly nflTeamSlateAttrFacade: DfsNflSlateTeamDetailsFacade
  ) {
    super(dfsPlayersFacade, dfsSlateFacade, dfsSlateAttrFacade, dfsMatchupFacade, dfsSelectedSlateConfigurationFacade);
  }

  ngOnInit(): void {
    // this.loadingBudget$.next(true);
    // this.routerFacade.getResolverPromise(LineItemListBudgetsResolver).finally(() => this.loadingBudget$.next(false));
  }

  onAxisXChange(val: string) {
    this.xAxisStat$.next(val);
  }

  onAxisYChange(val: string) {
    this.yAxisStat$.next(val);
  }

  statGroupFilter(value: string) {
    this.tableFilter$.next(JSON.stringify({ filterType: FilterType.statGroup, value }));
  }

  positionFilterChange(value: string) {
    this.position$.next(value);
    this.tableFilter$.next(JSON.stringify({ filterType: FilterType.pos, value }));
  }

  teamFilterChange(value: number) {
    this.tableFilter$.next(JSON.stringify({ filterType: FilterType.team, value: value.toString() }));
  }

  nameInputChange(value: string) {
    this.tableFilter$.next(JSON.stringify({ filterType: FilterType.name, value }));
  }

  async projectionTypeChange(value: GridIronProjectionType): Promise<void> {
    await this.dfsSelectedSlateConfigurationFacade.setProjectionType(value).toPromise();
    await this.dfsNflGridIronFacade.fetch().toPromise();
  }
}
