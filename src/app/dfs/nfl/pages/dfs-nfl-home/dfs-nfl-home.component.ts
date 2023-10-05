import { Component } from '@angular/core';
import { DfsMatchupsFacade } from '@app/dfs/facade/dfs-matchups.facade';
import { DfsSlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatePlayersFacade } from '@app/dfs/facade/dfs-slate-players.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { ClientSlateTypes, SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { NFL_RG_TEAM_ID_MAP, NFL_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/football';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DfsNflThresholds } from '../../consts/stats-threshold.m';
import { HEADERS_BY_POS, ROWS_BY_POS } from '../../consts/table.const';
import { DfsNflPlayerFacade } from '../../facade/daily-fantasy-nfl-players.facade';
import { DfsNflSlateTeamDetailsFacade } from '../../facade/dfs-nfl-slate-team.facade';
import { FilterType } from '../../models/nfl-table.model';
import { NFL_STAT_GROUP_MAP } from '../../models/stat-group.model';

@Component({
  selector: 'app-dfs-nfl-home',
  templateUrl: './dfs-nfl-home.component.html',
})
export class DfsNflHomeComponent {
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

  slatesEmpty$ = this.dailyFantasySlateFacade.slatesEmpty$;
  selectSlateByType$ = this.dailyFantasySlateFacade.selectSlateByType$;

  matchups$ = this.dailyFantasyMatchupFacade.nflMatchupTableData$;

  playersEmpty$ = this.dailyFantasyPlayersFacade.playersEmpty$;

  statGroup: string;
  teamId: number | null = null;
  position$ = new BehaviorSubject<string | null>('All');
  tableFilter$ = new BehaviorSubject<string | null>(null);
  xAxisStat$ = new BehaviorSubject<string | null>(null);
  yAxisStat$ = new BehaviorSubject<string | null>(null);

  selectedSlate$ = new BehaviorSubject<string | null>(null);
  selectedSlateType$ = new BehaviorSubject<ClientSlateTypes | null>(null);

  playerScatterData$ = combineLatest([this.nflPlayerFacade.playerScatterData$, this.xAxisStat$, this.yAxisStat$]).pipe(
    map(([playerScatterData, xAxis, yAxis]) => {
      return playerScatterData(xAxis, yAxis);
    })
  );

  slateWeather$ = combineLatest([this.selectedSlateType$, this.dailyFantasySlateFacade.slateWeather$]).pipe(
    map(([slate, weather]) => {
      return slate != null ? weather(slate as ClientSlateTypes) : [];
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

  constructor(
    readonly nflPlayerFacade: DfsNflPlayerFacade,
    readonly nflTeamSlateAttrFacade: DfsNflSlateTeamDetailsFacade,
    readonly dailyFantasyPlayersFacade: DfsSlatePlayersFacade,
    readonly dailyFantasySlateFacade: DfsSlatesFacade,
    readonly dailyFantasySlateAttrFacade: DfsSlateAttrFacade,
    readonly dailyFantasyMatchupFacade: DfsMatchupsFacade
  ) {}

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

  onSelectSlate(event: SiteSlateEntity) {
    this.dailyFantasyPlayersFacade.fetchPlayers(event.slate_path);
    this.selectedSlate$.next(event.name);
    this.selectedSlateType$.next(event.type);
    this.dailyFantasySlateAttrFacade.fetchSlateAttributesBySlateId(event.importId);
  }
}

//  Green
//  Yellow
//  Orange
//  Red
//   Orange/Yellow
//    Yellow/Orange
