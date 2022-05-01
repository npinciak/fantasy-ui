import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseballTeamTableRow } from '../mlb/models/baseball-team.model';
import { EspnTableSelectors } from '../selectors/espn-table.selector';

@Injectable({
  providedIn: 'root',
})
export class EspnTableFacade {
  @Select(EspnTableSelectors.selectStandingsTableRow) standingsTableRow$;
  @Select(EspnTableSelectors.selectStandingsTableHeaders) standingsTableHeaders$: Observable<string[]>;

  @Select(EspnTableSelectors.selectBatterTableRow) batterTableRow$: Observable<BaseballTeamTableRow[]>;
  @Select(EspnTableSelectors.selectBatterTableHeaders) batterTableHeaders$: Observable<string[]>;

  @Select(EspnTableSelectors.getLiveBatterTableRow) liveBatterTableRow$: Observable<BaseballTeamTableRow[]>;
  @Select(EspnTableSelectors.getLiveBatterTableHeaders) liveBatterTableHeaders$: Observable<string[]>;

  @Select(EspnTableSelectors.selectPitcherTableRow) pitcherTableRow$: Observable<BaseballTeamTableRow[]>;
  @Select(EspnTableSelectors.selectPitcherTableHeaders) pitcherTableHeaders$: Observable<string[]>;
}
