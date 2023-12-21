import { Component, OnInit } from '@angular/core';
import { DfsMatchupsFacade } from '@app/dfs/facade/dfs-matchups.facade';
import { DfsSlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatePlayersFacade } from '@app/dfs/facade/dfs-slate-players.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { NBA_RG_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/basketball';
import { ClientSiteSlateEntity, ClientSlateType } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { BehaviorSubject } from 'rxjs';
import { HEADERS_BY_POS, ROWS_BY_POS } from '../../consts/table.const';
import { DfsNbaSlatePlayerFacade } from '../../facade/dfs-nba-slate-players.facade';

@Component({
  selector: 'app-dfs-nba-home',
  templateUrl: './dfs-nba-home.component.html',
})
export class DfsNbaHomeComponent implements OnInit {
  readonly NBA_TEAM_ID_MAP = NBA_RG_TEAM_ID_MAP;

  playerList$ = this.nbaPlayerFacade.getPlayerTableData$;
  selectedSlate$ = new BehaviorSubject<string | null>(null);
  selectedSlateType$ = new BehaviorSubject<ClientSlateType | null>(null);

  slatesEmpty$ = this.dailyFantasySlateFacade.slatesEmpty$;
  selectSlateByType$ = this.dailyFantasySlateFacade.selectSlateByType$;

  tableConfig = {
    headers: HEADERS_BY_POS,
    rows: ROWS_BY_POS,
  };

  constructor(
    readonly nbaPlayerFacade: DfsNbaSlatePlayerFacade,
    readonly dailyFantasyPlayersFacade: DfsSlatePlayersFacade,
    readonly dailyFantasySlateFacade: DfsSlatesFacade,
    readonly dailyFantasySlateAttrFacade: DfsSlateAttrFacade,
    readonly dailyFantasyMatchupFacade: DfsMatchupsFacade
  ) {}

  ngOnInit(): void {}

  onSelectSlate(event: ClientSiteSlateEntity) {
    this.dailyFantasyPlayersFacade.fetchPlayers(event.slate_path);
    this.selectedSlate$.next(event.name);
    this.selectedSlateType$.next(event.type);
    this.dailyFantasySlateAttrFacade.fetchSlateAttributesBySlateId(event.importId);
  }
}
