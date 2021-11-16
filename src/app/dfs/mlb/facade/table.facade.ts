import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TableSelectors, TableColumn } from '../selectors/table.selector';

@Injectable({
  providedIn: 'root',
})
export class TableFacade {
  @Select(TableSelectors.selectBatterColumns) public batterColumns$: Observable<TableColumn[]>;

  @Select(TableSelectors.matchupColumns) public matchupColumns$: Observable<string[]>;
  @Select(TableSelectors.mlbMatchupColumns) public mlbMatchupColumns$: Observable<string[]>;

  @Select(TableSelectors.batterColumnDisplay) public batterColumnDisplay$: Observable<string[]>;
  @Select(TableSelectors.selectPitcherColumns) public pitcherColumns$: Observable<TableColumn[]>;
  @Select(TableSelectors.pitcherColumnDisplay) public pitcherColumnDisplay$: Observable<TableColumn[]>;
}
