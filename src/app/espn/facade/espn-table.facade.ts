import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EspnTableSelectors } from '../selectors/espn-table.selector';

@Injectable({
  providedIn: 'root',
})
export class EspnTableFacade {
  @Select(EspnTableSelectors.selectStandingsTableRow) standingsTableRow$;
  @Select(EspnTableSelectors.selectStandingsTableHeaders) standingsTableHeaders$: Observable<string[]>;

  @Select(EspnTableSelectors.selectBatterTableRow) batterTableRow$: Observable<string[]>;
  @Select(EspnTableSelectors.selectBatterTableHeaders) batterTableHeaders$: Observable<string[]>;

  @Select(EspnTableSelectors.selectPitcherTableRow) pitcherTableRow$: Observable<string[]>;
  @Select(EspnTableSelectors.selectPitcherTableHeaders) pitcherTableHeaders$: Observable<string[]>;
}
