import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { exists } from '@app/@shared/helpers/utils';
import { UrlQueryParams } from '@app/@shared/url-builder';
import { DailyFantasyPlayersFacade } from '@app/dfs/facade/daily-fantasy-players.facade';
import { DailyFantasySlateAttrFacade } from '@app/dfs/facade/daily-fantasy-slate-attr.facade';
import { DailyFantasySlateFacade } from '@app/dfs/facade/daily-fantasy-slate.facade';
import { DailyFantasyMlbTableFacade } from '@app/dfs/mlb/facade/table.facade';
import { SiteSlateEntity } from '@app/dfs/models/daily-fantasy-client.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly LEAGUE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Sport);
  readonly SITE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Site);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    readonly mlbTableFacade: DailyFantasyMlbTableFacade,
    readonly dailyFantasyPlayersFacade: DailyFantasyPlayersFacade,
    readonly dailyFantasySlateFacade: DailyFantasySlateFacade,
    readonly dailyFantasySlateAttrFacade: DailyFantasySlateAttrFacade
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (exists(this.LEAGUE) && exists(this.SITE)) this.dailyFantasySlateFacade.fetchSlates(this.LEAGUE, this.SITE);
  }

  onSelectSlate(event: SiteSlateEntity) {
    this.dailyFantasyPlayersFacade.fetchPlayers(event.slate_path);
    if (exists(this.LEAGUE) && exists(this.SITE)) this.dailyFantasySlateAttrFacade.fetchSlateAttr(this.LEAGUE, this.SITE, event.importId);
  }
}
