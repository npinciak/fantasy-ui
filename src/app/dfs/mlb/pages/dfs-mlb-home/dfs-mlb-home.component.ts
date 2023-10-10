import { Component, OnInit } from '@angular/core';
import { DfsMatchupsFacade } from '@app/dfs/facade/dfs-matchups.facade';
import { DfsSelectedSlateConfigurationFacade } from '@app/dfs/facade/dfs-selected-slate-configuration.facade';
import { DfsSlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatePlayersFacade } from '@app/dfs/facade/dfs-slate-players.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { DfsHomeComponent } from '@app/dfs/pages/dfs-home/dfs-home.component';
import { MLB_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/baseball';
import { SlateType } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { BehaviorSubject } from 'rxjs';
import { HEADERS_BY_POS, ROWS_BY_POS } from '../../consts/mlb-dfs-table.const';
import { DfsMlbSlatePlayerFacade } from '../../facade/dfs-mlb-slate-players.facade';

@Component({
  selector: 'app-dfs-mlb-home',
  templateUrl: './dfs-mlb-home.component.html',
})
export class DfsMlbHomeComponent extends DfsHomeComponent implements OnInit {
  readonly MLB_TEAM_ID_MAP = MLB_TEAM_ID_MAP;

  playerList$ = this.mlbPlayerFacade.getPlayerTableData$;

  selectedSlateType$ = new BehaviorSubject<SlateType | null>(null);

  tableConfig = {
    headers: HEADERS_BY_POS.B,
    rows: ROWS_BY_POS.B,
  };

  constructor(
    readonly dfsPlayersFacade: DfsSlatePlayersFacade,
    readonly dfsSlateFacade: DfsSlatesFacade,
    readonly dfsSlateAttrFacade: DfsSlateAttrFacade,
    readonly dfsMatchupFacade: DfsMatchupsFacade,
    readonly dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade,
    readonly mlbPlayerFacade: DfsMlbSlatePlayerFacade
  ) {
    super(dfsPlayersFacade, dfsSlateFacade, dfsSlateAttrFacade, dfsMatchupFacade, dfsSelectedSlateConfigurationFacade);
  }

  ngOnInit(): void {}
}
