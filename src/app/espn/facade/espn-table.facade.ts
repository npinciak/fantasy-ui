import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EspnTableSelectors } from '../selectors/espn-table.selector';

@Injectable({
  providedIn: 'root',
})
export class EspnTableFacade {
  @Select(EspnTableSelectors.standingsTableRow) standingsTableRow$;
  @Select(EspnTableSelectors.standingsTableHeaders) standingsTableHeaders$: Observable<string[]>;

  @Select(EspnTableSelectors.rosterBattingTableRow) rosterBattingTableRow$: Observable<string[]>;
  @Select(EspnTableSelectors.rosterBattingTableHeaders) rosterBattingTableHeaders$: Observable<string[]>;

  @Select(EspnTableSelectors.rosterPitchingTableRow) rosterPitchingTableRow$: Observable<string[]>;
  @Select(EspnTableSelectors.rosterPitchingTableHeaders) rosterPitchingTableHeaders$: Observable<string[]>;

  @Select(EspnTableSelectors.freeAgentsTableRow) freeAgentsTableRow$;
  @Select(EspnTableSelectors.freeAgentsTableHeaders) freeAgentsTableHeaders$: Observable<string[]>;
}
