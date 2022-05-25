import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { exists } from '@app/@shared/helpers/utils';
import { UrlQueryParams } from '@app/@shared/url-builder';
import { DailyFantasyPlayersFacade } from '@app/dfs/facade/daily-fantasy-players.facade';
import { DailyFantasySlateAttrFacade } from '@app/dfs/facade/daily-fantasy-slate-attr.facade';
import { DailyFantasySlateFacade } from '@app/dfs/facade/daily-fantasy-slate.facade';
import { DailyFantasyMlbPlayerSlateAttrFacade } from '@app/dfs/mlb/facade/daily-fantasy-mlb-player-slate-attr.facade.';
import { DailyFantasyMlbTeamSlateAttrFacade } from '@app/dfs/mlb/facade/daily-fantasy-mlb-team-slate-attr.facade';
import { DailyFantasyMlbTableFacade } from '@app/dfs/mlb/facade/table.facade';
import { SiteSlateEntity } from '@app/dfs/models/daily-fantasy-client.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  readonly LEAGUE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Sport);
  readonly SITE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Site);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    readonly mlbTableFacade: DailyFantasyMlbTableFacade,
    readonly mlbDailyFantasySlateAttrFacade: DailyFantasyMlbPlayerSlateAttrFacade,
    readonly dailyFantasyPlayersFacade: DailyFantasyPlayersFacade,
    readonly dailyFantasySlateFacade: DailyFantasySlateFacade,
    readonly dailyFantasySlateAttrFacade: DailyFantasySlateAttrFacade,
    readonly mlbTeamSlateAttrFacade: DailyFantasyMlbTeamSlateAttrFacade
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (exists(this.LEAGUE) && exists(this.SITE)) this.dailyFantasySlateFacade.fetchSlates(this.LEAGUE, this.SITE);
  }

  onSelectSlate(event: SiteSlateEntity) {
    this.dailyFantasyPlayersFacade.fetchPlayers(event.slate_path);
    if (exists(this.LEAGUE) && exists(this.SITE)) {
      switch (this.LEAGUE) {
        case 'mlb':
          this.mlbDailyFantasySlateAttrFacade.fetchSlateAttr(this.LEAGUE, this.SITE, event.importId);
          break;

        default:
          this.dailyFantasySlateAttrFacade.fetchSlateAttr(this.LEAGUE, this.SITE, event.importId);

          break;
      }
    }
  }
}
