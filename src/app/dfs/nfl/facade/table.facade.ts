import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NFLTableSelectors, TableColumn } from '../selectors/table.selector';

@Injectable({
  providedIn: 'root',
})
export class NFLTableFacade {
  @Select(NFLTableSelectors.playerTableList) public playerTableList$: Observable<TableColumn[]>;
  @Select(NFLTableSelectors.playerDisplayColumns) public playerDisplayColumns$: Observable<string[]>;

  @Select(NFLTableSelectors.matchupTableList) public matchupTableList$: Observable<TableColumn[]>;
  @Select(NFLTableSelectors.matchupDisplayColumns) public matchupDisplayColumns$: Observable<string[]>;
}
