import { Component, OnInit } from '@angular/core';
import { DfsMatchupFacade } from '@app/dfs/facade/dfs-matchup.facade';
import { DfsPlayersFacade } from '@app/dfs/facade/dfs-players.facade';
import { DailyFantasySlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { NBA_RG_TEAM_ID_MAP } from 'sports-ui-sdk';
import { DfsNBATableColumns } from '../../consts/table.const';
import { DfsNbaSlatePlayerFacade } from '../../facade/dfs-nba-slate-players.facade';

const NBA_DKTEAM_ID_MAP = {
  '18': 'NYK',
  '2': 'BOS',
} as const;

@Component({
  selector: 'app-dfs-nba-home',
  templateUrl: './dfs-nba-home.component.html',
})
export class DfsNbaHomeComponent implements OnInit {
  readonly NBA_TEAM_ID_MAP = NBA_RG_TEAM_ID_MAP;

  playerList$ = this.nbaPlayerFacade.getPlayerTableData$;

  tableConfig = {
    headers: DfsNBATableColumns.HEADERS_BY_POS,
    rows: DfsNBATableColumns.ROWS_BY_POS,
  };

  constructor(
    readonly nbaPlayerFacade: DfsNbaSlatePlayerFacade,
    readonly dailyFantasyPlayersFacade: DfsPlayersFacade,
    readonly dailyFantasySlateFacade: DfsSlatesFacade,
    readonly dailyFantasySlateAttrFacade: DailyFantasySlateAttrFacade,
    readonly dailyFantasyMatchupFacade: DfsMatchupFacade
  ) {}

  ngOnInit(): void {}
}
