import { Component, OnInit } from '@angular/core';
import { DfsMatchupsFacade } from '@app/dfs/facade/dfs-matchups.facade';
import { DfsSlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatePlayersFacade } from '@app/dfs/facade/dfs-slate-players.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { ClientSlateTypes, SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { MLB_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/baseball';
import { BehaviorSubject } from 'rxjs';
import { HEADERS_BY_POS, ROWS_BY_POS } from '../../consts/mlb-dfs-table.const';
import { DfsMlbSlatePlayerFacade } from '../../facade/dfs-mlb-slate-players.facade';

@Component({
  selector: 'app-dfs-mlb-home',
  templateUrl: './dfs-mlb-home.component.html',
})
export class DfsMlbHomeComponent implements OnInit {
  readonly MLB_TEAM_ID_MAP = MLB_TEAM_ID_MAP;

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
    readonly dailyFantasyPlayersFacade: DfsSlatePlayersFacade,
    readonly dailyFantasySlateFacade: DfsSlatesFacade,
    readonly dailyFantasySlateAttrFacade: DfsSlateAttrFacade,
    readonly dailyFantasyMatchupFacade: DfsMatchupsFacade
  ) {}

  ngOnInit(): void {}

  onSelectSlate(event: SiteSlateEntity) {
    this.dailyFantasyPlayersFacade.fetchPlayers(event.slate_path);
    this.selectedSlate$.next(event.name);
    this.selectedSlateType$.next(event.type);
    this.dailyFantasySlateAttrFacade.fetchSlateAttributesBySlateId(event.importId);
  }
}
