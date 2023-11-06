import { Component, OnInit } from '@angular/core';
import { LoadingExecutorFacade } from '@app/@core/loading-executor/loading-executor.facade';
import { DfsFilterFacade } from '@app/dfs/facade/dfs-filter.facade';
import { DfsSelectedLineupFacade } from '@app/dfs/facade/dfs-selected-lineup.facade';
import { DfsSelectedSlateConfigurationFacade } from '@app/dfs/facade/dfs-selected-slate-configuration.facade';
import { DfsSlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatePlayersFacade } from '@app/dfs/facade/dfs-slate-players.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { DfsHomeComponent } from '@app/dfs/pages/dfs-home/dfs-home.component';
import { SiteSlateEntity, SlateType } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { NFL_RG_TEAM_ID_MAP, NFL_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/football';
import { BehaviorSubject, combineLatest, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { GRIDIRON_PROJECTION_FILTER_OPTIONS } from '../../consts/nfl-gridiron-projection.const';
import { HEADERS_BY_POS, ROWS_BY_POS } from '../../consts/table.const';
import { DfsNflPlayerFacade } from '../../facade/daily-fantasy-nfl-players.facade';
import { DfsNflChartFacade } from '../../facade/dfs-nfl-chart.facade';
import { DfsNflGridIronFacade } from '../../facade/dfs-nfl-gridiron.facade';
import { DfsNflMatchupsFacade } from '../../facade/dfs-nfl-matchups.facade';
import { DfsNflSlateDetailsFacade } from '../../facade/dfs-nfl-slate-details.facade';
import { DfsNflSlateTeamDetailsFacade } from '../../facade/dfs-nfl-slate-team-details.facade';
import { GridIronProjectionType } from '../../models/nfl-gridIron.model';
import { NflDfsPlayerTableData } from '../../models/nfl-player.model';
import { FilterType } from '../../models/nfl-table.model';

@Component({
  selector: 'app-dfs-nfl-home',
  templateUrl: './dfs-nfl-home.component.html',
})
export class DfsNflHomeComponent extends DfsHomeComponent implements OnInit {
  isDfsNflSlateDetailsActionsFetchExecuting$ = this.loadingExecutorFacade.isDfsNflSlateDetailsActionsFetchExecuting$;

  readonly TABLE_HEADERS_BY_POS = HEADERS_BY_POS;
  readonly TABLE_ROWS_BY_POS = ROWS_BY_POS;

  readonly NFL_RG_TEAM_ID_MAP = NFL_RG_TEAM_ID_MAP;
  readonly NFL_TEAM_ID_MAP = NFL_TEAM_ID_MAP;

  readonly GRIDIRON_PROJECTION_FILTER_OPTIONS = GRIDIRON_PROJECTION_FILTER_OPTIONS;

  selectedTeamFilter$ = this.dfsFilterFacade.team$;
  selectedPositionFilter$ = this.dfsFilterFacade.position$;
  selectedNameFilter$ = this.dfsFilterFacade.name$;
  selectedXChartAxis$ = this.dfsFilterFacade.xChartAxis$;
  selectedYChartAxis$ = this.dfsFilterFacade.yChartAxis$;

  selectedProjectionFilter$ = this.dfsSelectedSlateConfigurationFacade.projectionType$;

  nflPositionList$ = this.nflPlayerFacade.positionList$;
  nflPlayerList$ = this.nflPlayerFacade.playerList$;
  nflTeamList$ = this.nflPlayerFacade.teamList$;

  playerScatterAxisOptions$ = this.nflPlayerFacade.playerScatterAxisOptions$;
  playerTeamsFilterOptions$ = this.nflPlayerFacade.playerTeamsFilterOptions$;
  playerPositionFilterOptions$ = this.nflPlayerFacade.playerPositionFilterOptions$;
  teamOwnPercent$ = this.nflPlayerFacade.teamOwnPercent$;

  nflMatchupGraphData$ = this.nflTeamSlateAttrFacade.matchupGraphData$;

  matchups$ = this.nflMatchupsFacade.nflMatchupTableData$;
  nflTopFiveMatchups$ = this.nflMatchupsFacade.nflTopFiveMatchupsByOverUnder$;
  nflTopFiveTeamTotals$ = this.nflMatchupsFacade.nflTopFiveTeamTotals$;

  teamsWithHighestPown$ = this.nflPlayerFacade.teamsWithHighestPown$;
  teamsWithHighestValue$ = this.nflPlayerFacade.teamsWithHighestValue$;

  statGroup: string;

  tableFilter$ = new BehaviorSubject<string | null>(null);

  selectedSlateType$ = new BehaviorSubject<SlateType | null>(null);

  playerScatterData$ = this.dfsGraphingFacade.playerScatterData$;
  playerBarChartData$ = this.dfsGraphingFacade.playerBarChartData$;
  playerScatterChartDataByStat$ = this.dfsGraphingFacade.playerScatterChartDataByStat$;

  slateWeather$ = combineLatest([this.selectedSlateType$, this.dfsSlateFacade.slateWeather$]).pipe(
    map(([slate, weather]) => {
      return slate != null ? weather(slate as SlateType) : [];
    })
  );

  tableConfig$ = combineLatest([this.positionFilter$]).pipe(
    map(([position]) => {
      const headers = position != null ? HEADERS_BY_POS[position] : HEADERS_BY_POS.All;
      const rows = position != null ? ROWS_BY_POS[position] : ROWS_BY_POS.All;
      return {
        headers,
        rows,
      };
    })
  );

  constructor(
    readonly loadingExecutorFacade: LoadingExecutorFacade,
    readonly dfsLineupSelectorFacade: DfsSelectedLineupFacade,
    readonly dfsPlayersFacade: DfsSlatePlayersFacade,
    readonly dfsSlateFacade: DfsSlatesFacade,
    readonly dfsSlateAttrFacade: DfsSlateAttrFacade,
    readonly dfsNflGridIronFacade: DfsNflGridIronFacade,
    readonly dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade,
    readonly nflPlayerFacade: DfsNflPlayerFacade,
    readonly nflTeamSlateAttrFacade: DfsNflSlateTeamDetailsFacade,
    readonly nflMatchupsFacade: DfsNflMatchupsFacade,
    readonly dfsNflSlateDetailsFacade: DfsNflSlateDetailsFacade,
    readonly dfsFilterFacade: DfsFilterFacade,
    readonly dfsGraphingFacade: DfsNflChartFacade

  ) {
    super(dfsPlayersFacade, dfsSlateFacade, dfsSlateAttrFacade, dfsSelectedSlateConfigurationFacade, dfsFilterFacade);
  }

  ngOnInit(): void {}

  onAxisXChange(val: string) {
    this.dfsFilterFacade.setXChartAxis(val);
  }

  onAxisYChange(val: string) {
    this.dfsFilterFacade.setYChartAxis(val);
  }

  statGroupFilter(value: string) {
    this.tableFilter$.next(JSON.stringify({ filterType: FilterType.statGroup, value }));
  }

  positionFilterChange(value: string) {
    this.dfsFilterFacade.setPosition(value);
    this.tableFilter$.next(JSON.stringify({ filterType: FilterType.pos, value }));
  }

  teamFilterChange(value: number) {
    this.dfsFilterFacade.setTeam(value.toString());
    this.tableFilter$.next(JSON.stringify({ filterType: FilterType.team, value: value.toString() }));
  }

  nameInputChange(value: string) {
    this.dfsFilterFacade.setName(value);
    this.tableFilter$.next(JSON.stringify({ filterType: FilterType.name, value }));
  }

  onSelectNflSlate(event: SiteSlateEntity) {
    const { slate_path, importId } = event;

    this.dfsLineupSelectorFacade.clear();
    this.dfsPlayersFacade.fetchPlayers(slate_path);
    this.dfsSelectedSlateConfigurationFacade.setSlateId(importId);
    this.dfsNflSlateDetailsFacade.fetch();
  }

  onPlayerSelectionChange(player: NflDfsPlayerTableData) {
    if (!player.playerSiteId) return;
    this.dfsLineupSelectorFacade.toggle([player.playerSiteId]);
  }

  async projectionTypeChange(value: GridIronProjectionType): Promise<void> {
    await firstValueFrom(this.dfsSelectedSlateConfigurationFacade.setProjectionType(value));
    await firstValueFrom(this.dfsNflGridIronFacade.fetch());
  }
}
