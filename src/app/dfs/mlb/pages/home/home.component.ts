import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { currentDate } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { UrlQueryParams } from '@app/@shared/url-builder';
import { DfsSite, DfsSport, DFS_MLB_TEAM_MAP } from '@app/dfs/dfs.const';
import { DfsFacade } from '@app/dfs/mlb/facade/dfs.facade';
import { SlateFacade } from '@app/dfs/mlb/facade/slate.facade';
import { TableFacade } from '@app/dfs/mlb/facade/table.facade';
import { DfsService } from '@app/dfs/service/dfs.service';
import { FetchSlateConfigs, FetchSlates } from '@app/dfs/mlb/state/mlb-dfs.actions';
import { Store, Actions, ofActionCompleted } from '@ngxs/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly SPORT = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Sport) ?? 'mlb';
  readonly SITE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Site) ?? 'draftkings';

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    readonly slateFacade: SlateFacade,
    readonly dfsFacade: DfsFacade,
    readonly tableFacade: TableFacade
  ) {}

  ngOnInit(): void {
    // this.slateFacade.fetchSlateConfigs();
    // this.store.dispatch(new FetchSlates(DfsSite.DraftKings, DfsSport.mlb));
  }
}
