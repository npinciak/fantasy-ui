import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlQueryParams } from '@app/@shared/urlBuilder';
import { DfsSite } from '@app/dfs/dfs.const';
import { DfsFacade } from '@app/dfs/mlb/facade/dfs.facade';
import { SlateFacade } from '@app/dfs/mlb/facade/slate.facade';
import { NFLDfsFacade } from '../../facade/nfl-dfs.facade';
import { NFLPlayerFacade } from '../../facade/player.facade';
import { ScheduleFacade } from '../../facade/schedule.facade';
import { NFLTableFacade } from '../../facade/table.facade';
import { MOCK_NFL_SLATE_ATTR } from '../../models/nfl-slate-attr-model.mock';
import { MOCK_NFL_SLATE_PLAYER } from '../../models/nfl-slate-player.model.mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly SITE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Site) ?? 'draftkings';

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    readonly NFLDfsFacade: NFLDfsFacade,

    private activatedRoute: ActivatedRoute,
    readonly slateFacade: SlateFacade,
    readonly dfsFacade: DfsFacade,
    readonly playerFacade: NFLPlayerFacade,
    readonly tableFacade: NFLTableFacade,
    readonly scheduleFacade: ScheduleFacade
  ) {}

  ngOnInit(): void {}
}
