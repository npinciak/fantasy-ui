import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TableColumn } from '../models/table.model';
import { DailyFantasyTableSelectors } from '../selectors/daily-fantasy-table.selector';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyTableFacade {
  // @Select(DailyFantasyTableSelectors.playerTableList) public playerTableList$: Observable<TableColumn[]>;
  // @Select(DailyFantasyTableSelectors.playerDisplayColumns) public playerDisplayColumns$: Observable<string[]>;
}
