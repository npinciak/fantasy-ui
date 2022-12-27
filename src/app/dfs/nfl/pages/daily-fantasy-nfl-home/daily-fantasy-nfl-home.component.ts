import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlQueryParams } from '@app/@core/store/router/url-builder';
import { DailyFantasyPlayersFacade } from '@app/dfs/facade/daily-fantasy-players.facade';
import { DailyFantasySlateAttrFacade } from '@app/dfs/facade/daily-fantasy-slate-attr.facade';
import { DailyFantasySlateFacade } from '@app/dfs/facade/daily-fantasy-slate.facade';
import { SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NFL_RG_TEAM_ID_MAP, NFL_TEAM_ID_MAP } from '../../consts/nfl.const';
import { STATS_HEADERS, STATS_ROWS } from '../../consts/table.const';
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

  readonly STATS_ROWS = STATS_ROWS;
  readonly STATS_HEADERS = STATS_HEADERS;

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
  position: string | null = null;
  tableFilter$ = new BehaviorSubject<string | null>(null);
  xAxisStat$ = new BehaviorSubject<string | null>(null);
  yAxisStat$ = new BehaviorSubject<string | null>(null);

  selectedSlate$ = new BehaviorSubject<string | null>(null);

  playerScatterData$ = combineLatest([this.nflPlayerFacade.playerScatterData$, this.xAxisStat$, this.yAxisStat$]).pipe(
    map(([playerScatterData, xAxis, yAxis]) => {
      return playerScatterData(xAxis, yAxis);
    })
  );

  constructor(
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

  statGroupFilter(value: string) {
    this.tableFilter$.next(JSON.stringify({ filterType: FilterType.statGroup, value }));
  }

  positionFilterChange(value: string) {
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
