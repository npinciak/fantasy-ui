import { Component, OnInit } from '@angular/core';
import { DfsFilterFacade } from '@app/dfs/facade/dfs-filter.facade';
import { DfsSelectedSlateConfigurationFacade } from '@app/dfs/facade/dfs-selected-slate-configuration.facade';
import { DfsSlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatePlayersFacade } from '@app/dfs/facade/dfs-slate-players.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { DfsHomeComponent } from '@app/dfs/pages/dfs-home/dfs-home.component';
import { MLB_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/baseball';
import { ClientSlateType } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
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

  selectedSlateType$ = new BehaviorSubject<ClientSlateType | null>(null);

  tableConfig = {
    headers: HEADERS_BY_POS.B,
    rows: ROWS_BY_POS.B,
  };

  constructor(
    readonly dfsFilterFacade: DfsFilterFacade,
    readonly dfsPlayersFacade: DfsSlatePlayersFacade,
    readonly dfsSlateFacade: DfsSlatesFacade,
    readonly dfsSlateAttrFacade: DfsSlateAttrFacade,
    readonly dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade,
    readonly mlbPlayerFacade: DfsMlbSlatePlayerFacade
  ) {
    super(dfsPlayersFacade, dfsSlateFacade, dfsSlateAttrFacade, dfsSelectedSlateConfigurationFacade, dfsFilterFacade);
  }

  ngOnInit(): void {}
}
