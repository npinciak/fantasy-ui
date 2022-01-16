import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlQueryParams } from '@app/@shared/url-builder';
import { DailyFantasyPlayersFacade } from '@app/dfs/facade/daily-fantasy-players.facade';
import { DfsFacade } from '@app/dfs/mlb/facade/dfs.facade';
import { SlateFacade } from '@app/dfs/mlb/facade/slate.facade';
import { DfsSlate } from '@app/dfs/mlb/models/slateMaster.interface';
import { NFLDfsFacade } from '../../facade/nfl-dfs.facade';
import { NFLPlayerFacade } from '../../facade/player.facade';
import { ScheduleFacade } from '../../facade/schedule.facade';
import { NFLTableFacade } from '../../facade/table.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly SITE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Site) ?? 'draftkings';
  readonly LEAGUE = this.activatedRoute.snapshot.queryParamMap.get(UrlQueryParams.Sport) ?? 'nfl';

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    readonly NFLDfsFacade: NFLDfsFacade,

    private activatedRoute: ActivatedRoute,
    readonly slateFacade: SlateFacade,
    readonly dfsFacade: DfsFacade,
    readonly playerFacade: NFLPlayerFacade,
    readonly tableFacade: NFLTableFacade,
    readonly scheduleFacade: ScheduleFacade,
    readonly dailyFantasyPlayersFacade: DailyFantasyPlayersFacade
  ) {}

  ngOnInit(): void {}

  select(event: DfsSlate) {
    this.dailyFantasyPlayersFacade.fetchPlayers(event.slate_path, this.LEAGUE);
  }
}
