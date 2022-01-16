import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlQueryParams } from '@app/@shared/url-builder';
import { DailyFantasyPlayersFacade } from '@app/dfs/facade/daily-fantasy-players.facade';
import { DailyFantasySlateFacade } from '@app/dfs/facade/daily-fantasy-slate.facade';
import { SlateFacade } from '@app/dfs/mlb/facade/slate.facade';
import { DfsSlate } from '@app/dfs/models/daily-fantasy-client.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly LEAGUE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Sport);
  readonly SITE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Site);

  constructor(
    private activatedRoute: ActivatedRoute,
    readonly slateFacade: SlateFacade,
    readonly dailyFantasyPlayersFacade: DailyFantasyPlayersFacade,
    readonly dailyFantasySlateFacade: DailyFantasySlateFacade
  ) {}

  ngOnInit(): void {}

  select(event: DfsSlate) {
    this.dailyFantasyPlayersFacade.fetchPlayers(event.slate_path, this.LEAGUE);
    this.dailyFantasySlateFacade.fetchSlateAttr(this.LEAGUE, this.SITE, event.importId);
  }
}
