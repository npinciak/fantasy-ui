import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlQueryParams } from '@app/@core/store/router/url-builder';
import { LayoutService } from '@app/@shared/services/layout.service';
import { DailyFantasyPlayersFacade } from '@app/dfs/facade/daily-fantasy-players.facade';
import { DailyFantasySlateAttrFacade } from '@app/dfs/facade/daily-fantasy-slate-attr.facade';
import { DailyFantasySlateFacade } from '@app/dfs/facade/daily-fantasy-slate.facade';
import { SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NFL_RG_TEAM_ID_MAP, NFL_TEAM_ID_MAP } from '../../consts/nfl.const';
import { DfsNflTableColumns } from '../../consts/table.const';
import { DailyFantasyNflPlayerFacade } from '../../facade/daily-fantasy-nfl-players.facade';
import { DailyFantasyNflTeamSlateAttrFacade } from '../../facade/daily-fantasy-nfl-team-slate-attr.facade';
import { FilterType } from '../../models/nfl-table.model';
import { NFL_STAT_GROUP_MAP } from '../../models/stat-group.model';

@Component({
  selector: 'app-daily-fantasy-nfl-home',
  templateUrl: './daily-fantasy-nfl-home.component.html',
})
export class DailyFantasyNflHomeComponent implements OnInit {
  readonly LEAGUE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Sport);
  readonly SITE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Site);

  readonly TABLE_HEADERS_BY_POS = DfsNflTableColumns.HEADERS_BY_POS;
  readonly TABLE_ROWS_BY_POS = DfsNflTableColumns.ROWS_BY_POS;

  readonly NFL_STAT_GROUP_MAP = NFL_STAT_GROUP_MAP;
  readonly NFL_RG_TEAM_ID_MAP = NFL_RG_TEAM_ID_MAP;
  readonly NFL_TEAM_ID_MAP = NFL_TEAM_ID_MAP;

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

  playersEmpty$ = this.dailyFantasyPlayersFacade.playersEmpty$;

  statGroup: string;
  teamId: number | null = null;
  position$ = new BehaviorSubject<string | null>('All');
  tableFilter$ = new BehaviorSubject<string | null>(null);
  teamFilter$ = new BehaviorSubject<string | null>(null);
  statGroupFilter$ = new BehaviorSubject<string | null>(null);
  positionFilter$ = new BehaviorSubject<string | null>(null);
  xAxisStat$ = new BehaviorSubject<string | null>(null);
  yAxisStat$ = new BehaviorSubject<string | null>(null);

  selectedSlate$ = new BehaviorSubject<string | null>(null);

  playerScatterData$ = combineLatest([this.nflPlayerFacade.playerScatterData$, this.xAxisStat$, this.yAxisStat$]).pipe(
    map(([playerScatterData, xAxis, yAxis]) => {
      return playerScatterData(xAxis, yAxis);
    })
  );

  tableConfig$ = combineLatest([this.position$]).pipe(
    map(([position]) => {
      const headers = position != null ? DfsNflTableColumns.HEADERS_BY_POS[position] : DfsNflTableColumns.HEADERS_BY_POS['All'];
      const rows = position != null ? DfsNflTableColumns.ROWS_BY_POS[position] : DfsNflTableColumns.ROWS_BY_POS['All'];
      return {
        headers,
        rows,
      };
    })
  );

  constructor(
    private layoutService: LayoutService,
    private activatedRoute: ActivatedRoute,
    readonly nflPlayerFacade: DailyFantasyNflPlayerFacade,
    readonly nflTeamSlateAttrFacade: DailyFantasyNflTeamSlateAttrFacade,
    readonly dailyFantasyPlayersFacade: DailyFantasyPlayersFacade,
    readonly dailyFantasySlateFacade: DailyFantasySlateFacade,
    readonly dailyFantasySlateAttrFacade: DailyFantasySlateAttrFacade
  ) {}

  ngOnInit(): void {}

  onAxisXChange(val: string) {
    this.xAxisStat$.next(val);
  }

  onAxisYChange(val: string) {
    this.yAxisStat$.next(val);
  }

  statGroupFilter(val: string) {
    this.statGroupFilter$.next(val);
  }

  positionFilterChange(value: string) {
    this.position$.next(value);
    this.tableFilter$.next(JSON.stringify({ filterType: FilterType.pos, value }));
  }

  teamFilterChange(value: number) {
    this.tableFilter$.next(JSON.stringify({ filterType: FilterType.team, value: value.toString() }));
  }

  onSelectSlate(event: SiteSlateEntity) {
    this.dailyFantasyPlayersFacade.fetchPlayers(event.slate_path);
    this.selectedSlate$.next(event.name);
    this.dailyFantasySlateAttrFacade.fetchSlateAttr(event.importId);
  }
}
