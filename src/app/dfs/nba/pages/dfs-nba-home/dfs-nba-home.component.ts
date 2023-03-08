import { Component, OnInit } from '@angular/core';
import { DfsMatchupFacade } from '@app/dfs/facade/dfs-matchup.facade';
import { DfsPlayersFacade } from '@app/dfs/facade/dfs-players.facade';
import { DailyFantasySlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { ClientSlateTypes, SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { BehaviorSubject } from 'rxjs';
import { NBA_RG_TEAM_ID_MAP } from 'sports-ui-sdk';
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
  selectedSlateType$ = new BehaviorSubject<ClientSlateTypes | null>(null);

  slatesEmpty$ = this.dailyFantasySlateFacade.slatesEmpty$;
  selectSlateByType$ = this.dailyFantasySlateFacade.selectSlateByType$;

  tableConfig = {
    headers: HEADERS_BY_POS,
    rows: ROWS_BY_POS,
  };

  constructor(
    readonly nbaPlayerFacade: DfsNbaSlatePlayerFacade,
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
