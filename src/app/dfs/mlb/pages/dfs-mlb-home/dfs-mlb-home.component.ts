import { Component, OnInit } from '@angular/core';
import { DfsMatchupFacade } from '@app/dfs/facade/dfs-matchup.facade';
import { DfsPlayersFacade } from '@app/dfs/facade/dfs-players.facade';
import { DailyFantasySlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { ClientSlateTypes, SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { BehaviorSubject } from 'rxjs';
import { NBA_RG_TEAM_ID_MAP } from 'sports-ui-sdk';
import { HEADERS_BY_POS, ROWS_BY_POS } from '../../consts/mlb-dfs-table.const';
import { DfsMlbSlatePlayerFacade } from '../../facade/dfs-mlb-slate-players.facade';

@Component({
  selector: 'app-dfs-mlb-home',
  templateUrl: './dfs-mlb-home.component.html',
})
export class DfsMlbHomeComponent implements OnInit {
  readonly MLB_TEAM_ID_MAP = NBA_RG_TEAM_ID_MAP;

  playerList$ = this.mlbPlayerFacade.getPlayerTableData$;
  selectedSlate$ = new BehaviorSubject<string | null>(null);
  selectedSlateType$ = new BehaviorSubject<ClientSlateTypes | null>(null);

  slatesEmpty$ = this.dailyFantasySlateFacade.slatesEmpty$;
  selectSlateByType$ = this.dailyFantasySlateFacade.selectSlateByType$;

  tableConfig = {
    headers: HEADERS_BY_POS.B,
    rows: ROWS_BY_POS.B,
  };

  constructor(
    readonly mlbPlayerFacade: DfsMlbSlatePlayerFacade,
    readonly dailyFantasyPlayersFacade: DfsPlayersFacade,
    readonly dailyFantasySlateFacade: DfsSlatesFacade,
    readonly dailyFantasySlateAttrFacade: DailyFantasySlateAttrFacade,
    readonly dailyFantasyMatchupFacade: DfsMatchupFacade
  ) {}

  ngOnInit(): void {}

  onSelectSlate(event: SiteSlateEntity) {
    this.dailyFantasyPlayersFacade.fetchPlayers(event.slate_path);
    this.selectedSlate$.next(event.name);
    this.selectedSlateType$.next(event.type);
    this.dailyFantasySlateAttrFacade.fetchSlateAttr(event.importId);
  }
}
