import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlQueryParams } from '@app/@core/store/router/url-builder';
import { exists } from '@app/@shared/helpers/utils';
import { LayoutService } from '@app/@shared/services/layout.service';
import { DailyFantasyPlayersFacade } from '@app/dfs/facade/daily-fantasy-players.facade';
import { DailyFantasySlateAttrFacade } from '@app/dfs/facade/daily-fantasy-slate-attr.facade';
import { DailyFantasySlateFacade } from '@app/dfs/facade/daily-fantasy-slate.facade';
import { DailyFantasyMlbPlayerSlateAttrFacade } from '@app/dfs/mlb/facade/daily-fantasy-mlb-player-slate-attr.facade.';
import { DailyFantasyMlbTeamSlateAttrFacade } from '@app/dfs/mlb/facade/daily-fantasy-mlb-team-slate-attr.facade';
import { NFL_RG_TEAM_ID_MAP, NFL_TEAM_ID_MAP } from '@app/dfs/nfl/consts/nfl.const';
import { STATS_HEADERS, STATS_ROWS } from '@app/dfs/nfl/consts/table.const';
import { DailyFantasyNflPlayerFacade } from '@app/dfs/nfl/facade/daily-fantasy-nfl-players.facade';
import { DailyFantasyNflTeamSlateAttrFacade } from '@app/dfs/nfl/facade/daily-fantasy-nfl-team-slate-attr.facade';
import { NFL_STAT_GROUP_MAP } from '@app/dfs/nfl/models/stat-group.model';
import { SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
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
  nflMatchupGraphData$ = this.nflTeamSlateAttrFacade.matchupGraphData$;

  slatesEmpty$ = this.dailyFantasySlateFacade.slatesEmpty$;
  selectSlateByType$ = this.dailyFantasySlateFacade.selectSlateByType$;

  playersEmpty$ = this.dailyFantasyPlayersFacade.playersEmpty$;

  playerScatterAxisOptions$ = this.nflPlayerFacade.playerScatterAxisOptions$;
  playerTeamsFilterOptions$ = this.nflPlayerFacade.playerTeamsFilterOptions$;
  playerPositionFilterOptions$ = this.nflPlayerFacade.playerPositionFilterOptions$;

  statGroup: string;
  teamId: number | null = null;
  position: string | null = null;
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

  isMobile$ = this.layoutService.isMobile$;

  constructor(
    private router: Router,
    private layoutService: LayoutService,
    private activatedRoute: ActivatedRoute,
    readonly nflPlayerFacade: DailyFantasyNflPlayerFacade,

    readonly nflTeamSlateAttrFacade: DailyFantasyNflTeamSlateAttrFacade,

    readonly mlbDailyFantasySlateAttrFacade: DailyFantasyMlbPlayerSlateAttrFacade,
    readonly dailyFantasyPlayersFacade: DailyFantasyPlayersFacade,
    readonly dailyFantasySlateFacade: DailyFantasySlateFacade,
    readonly dailyFantasySlateAttrFacade: DailyFantasySlateAttrFacade,
    readonly mlbTeamSlateAttrFacade: DailyFantasyMlbTeamSlateAttrFacade
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onAxisXChange(val: string) {
    this.xAxisStat$.next(val);
  }

  onAxisYChange(val: string) {
    this.yAxisStat$.next(val);
  }

  statGroupFilter(val: string) {
    this.statGroupFilter$.next(val);
  }

  positionFilterChange(val: string) {
    this.positionFilter$.next(val);
  }

  teamFilterChange(val: number) {
    this.teamFilter$.next(val.toString());
  }

  onSelectSlate(event: SiteSlateEntity) {
    this.dailyFantasyPlayersFacade.fetchPlayers(event.slate_path);

    this.selectedSlate$.next(event.name);

    if (exists(this.LEAGUE) && exists(this.SITE)) {
      switch (this.LEAGUE) {
        case 'mlb':
          this.mlbDailyFantasySlateAttrFacade.fetchSlateAttr(event.importId);
          break;

        default:
          this.dailyFantasySlateAttrFacade.fetchSlateAttr(event.importId);

          break;
      }
    }
  }
}
