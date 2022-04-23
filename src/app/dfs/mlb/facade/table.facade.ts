import { Injectable } from '@angular/core';
import { TableColumn } from '@app/espn/models/table.model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DailyFantasyMlbPlayerSelectors } from '../selectors/daily-fantasy-mlb-players.selectors';
import { TableSelectors } from '../selectors/table.selector';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyMlbTableFacade {
  @Select(TableSelectors.getMatchupColumns) public matchupColumns$: Observable<string[]>;
  @Select(TableSelectors.getMlbMatchupColumns) public mlbMatchupColumns$: Observable<string[]>;

  @Select(DailyFantasyMlbPlayerSelectors.getPlayerTableData) public getPlayerTableData$: Observable<any[]>;
  @Select(TableSelectors.getBatterTableColumns) public getBatterTableColumns$: Observable<any[]>;
  @Select(TableSelectors.getBatterColumns) public batterColumns$: Observable<TableColumn[]>;
  @Select(TableSelectors.getBatterTableHeaders) public batterTableHeaders$: Observable<string[]>;

  @Select(TableSelectors.getPitcherColumns) public pitcherColumns$: Observable<TableColumn[]>;
  @Select(TableSelectors.getPitcherTableHeaders) public pitcherTableHeaders$: Observable<TableColumn[]>;
}
