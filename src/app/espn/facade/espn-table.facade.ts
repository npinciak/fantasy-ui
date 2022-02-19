import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EspnTableSelectors } from '../selectors/espn-table.selector';

@Injectable({
  providedIn: 'root',
})
export class EspnTableFacade {
  @Select(EspnTableSelectors.standingsTableRow) standingsTableRow$;
  @Select(EspnTableSelectors.tableTableHeaders) tableTableHeaders$: Observable<string[]>;

  @Select(EspnTableSelectors.rosterTableRow) rosterTableRow$;
  @Select(EspnTableSelectors.rosterTableHeaders) rosterTableHeaders$: Observable<string[]>;

  @Select(EspnTableSelectors.freeAgentsTableRow) freeAgentsTableRow$;
  @Select(EspnTableSelectors.freeAgentsTableHeaders) freeAgentsTableHeaders$: Observable<string[]>;
}
